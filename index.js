const express = require('express')
const app = express()

const uploadRouter = require('./routes/upload.route')

app.use('/upload', uploadRouter)

app.listen(50000, () => {
    console.log("Listening at port 5000")
})