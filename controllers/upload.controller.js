const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const dynamo = new AWS.DynamoDB()

exports.uploadToS3AndDynamoDB = async (req, res) => {

    // Once the file is uploaded to the S3, we can use Stream to handle the data graciously

    const s3GetObject = s3.getObject({
        Bucket: 'TemporaryBucket',
        Key: `LargeFile/${req.filename}`
    }).createReadStream() 

    const streamToBuffer = async (stream) => {
        return new Promise((resolve, reject) => {
            const chunks = []
            stream.on('data', (chunk) => chunks.push(chunk))
            stream.on('end', () => resolve(Buffer.concat(chunks)))
            stream.on('error', (error) => reject(error))
        })
    }

    const streamBuffer = await streamToBuffer(s3GetObject)

    // Function to Push the data to DynamoDB
    

    const params = {
        TableName: "SalesData",
        Item: {
            "OrderID": streamBuffer.OrderID, // This will be my partitionKey
            "ProductID": streamBuffer.ProductID, // This will be my SortKey
            "CustomerID": streamBuffer.CustomerID,
            "ProductName": streamBuffer.ProductName,
            "Category": streamBuffer.Category

            // Remaining data
        }
    }

    dynamo.putItem(params, (err, data) => {
        if(err){
            res.err("Oops something happened")
        } else {
            res.send("Data push completedd")
        }
    })
}

exports.retrieveData = async (req, res) => {
    // Retrieve Data from the DB

    // Will create a GSI (Global Secondary Index) with Date range in my Sort Key

    const dateRange = req.query.dateRange

    // Will write a function to retrieve all the values from a given date range

    function findAllTheDatesBetweenGivenRange(){
        return dates
    }

    const GSIParams = {
        TableName: "SalesData",
        IndexName: "CustomerID-DateRange",
        KeyConditionExpression: 'CustomerID = :pk AND DateRange = :sk',
        ExpressionAttributeValues: {
            ':pk': CustomerID,
            ':sk': dates
        }
    }

    // Write a loop  to run the above code and retrieve all the required values

    const result = await dynamo.getItem(GSIParams).promise()

    // Separate function to get Total Number of customers, Total Number of orders and average order value

    

    res.send(result)
}
