Database used: 
    -NoSQL: AWS DynamoDB

Backend Technology Used:
    -NodeJS

Framework Used:
    -ExpressJS

Packages Used:
    -Nodemon: to run the server continuously
    -AWS-SDK: to run AWS services
    -CORS: to enable cross port transfer
    -Body Parser: to parse the requests
    -Multer: To upload a file to S3

Idea:
    1. First upload the large file to S3
    2. Then read it as a stream and insert into DynamoDb 
    3. Create unique identifiers as Parition Key and Sort Key
    4. To retrieve the data, we can create multiple Global Secondary Index
    5. By creating multiple GSIs, we can query effectively without scanning the entire DB


