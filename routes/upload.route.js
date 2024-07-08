const express = require('express')
const router = express.Router()
const multer = require("multer")
const s3Multer = require("multer-s3")
const s3 = new AWS.S3()

const Controller = require('../controllers/upload.controller')

const uploadS3 = multer({
    storage: s3Multer({
        s3: s3,
        bucket: (req, file, cb) => {
            cb(null, "TemporaryBucket")
        },
        key: (req, file, cb) => {
            // To remove any special character in the filename, it may cause partition
            let filename = file.originalname.replace(/[^a-zA-Z0-9_.]/g, '')
            cb(null, `LargeFile/${filename}`)
        }
    })
})

router.post('/uploadToS3', uploadS3.array('file', 100), Controller.uploadToS3)

module.exports = router