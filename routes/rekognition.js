const express = require('express');
const router = express.Router();

const proxy = require('proxy-agent');
const AWS = require('aws-sdk');

AWS.config.update({region: 'ap-northeast-1'});
AWS.config.update({
    httpOptions: { agent: proxy(process.env.HTTPS_PROXY) }
});

const rekognition = new AWS.Rekognition();

/* GET users listing. */
router.get('/', (req, res, next) => {
    const params = {
        Image: {
            S3Object: {
                Bucket: "hifive-eb-sample",
                Name: "imgs/cat.jpg"
            }
        },
    };
    rekognition.detectLabels(params, (err, data) => {
        if (err) res.send(err, err.stack); // an error occurred
        else     res.send(data);           // successful response
    });
});

module.exports = router;
