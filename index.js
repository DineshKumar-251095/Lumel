const express = require('express')
const app = express()

const uploadRouter = require('./routes/upload.route')

app.use('/upload', uploadRouter)

app.listen(8080, () => {
    console.log("Listening at port 8080")
})
