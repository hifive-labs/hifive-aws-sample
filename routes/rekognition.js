'use strict';

const express = require('express');
const router = express.Router();
const proxy = require('proxy-agent');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'hifive-eb-sample',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, `imgs/${Date.now().toString()}-${file.originalname}`)
        }
    })
});

AWS.config.update({region: 'ap-northeast-1'});
AWS.config.update({
    httpOptions: { agent: proxy(process.env.https_proxy) }
});

const rekognition = new AWS.Rekognition();

router.post('/', upload.array('image', 1), (req, res, next) => {
    const image = req.files[0];
    console.log(`Image uploaded to ${image.bucket}/${image.key}`);
    const params = {
        Image: {
            S3Object: {
                Bucket: image.bucket,
                Name: image.key,
            }
        },
    };
    rekognition.detectLabels(params, (err, data) => {
        if (err) res.send(err, err.stack); // an error occurred
        else     res.send(data);           // successful response
    });
});

module.exports = router;
