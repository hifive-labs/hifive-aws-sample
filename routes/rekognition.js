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
    // アップロード先S3バケット
    bucket: process.env.HIFIVE_AWS_SAMPLE_S3_BUCKET || 'hifive-aws-sample',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    // アップロード後のファイル名
    key: (req, file, cb) => {
      cb(null, `imgs/${Date.now().toString()}-${file.originalname}`);
    }
  })
});

AWS.config.update({ region: 'ap-northeast-1' });

if (process.env.HTTPS_PROXY) {
  AWS.config.update({
    httpOptions: { agent: proxy(process.env.HTTPS_PROXY) }
  });
}

const rekognition = new AWS.Rekognition();

// app.jsでapp.use('/rekognition', rekognitionRouter);として登録しているので、
// /rekognitionエンドポイントにリクエストが来るとこのメソッドが呼ばれる。
// multerS3を使っているので、POSTされたformのimageに格納されているデータは
// S3へ自動的アップロードされる。
router.post('/', upload.array('image', 1), (req, res, next) => {
  const image = req.files[0];
  console.log(`Image uploaded to ${image.bucket}/${image.key}`);
  const params = {
    Image: {
      S3Object: {
        Bucket: image.bucket,
        Name: image.key
      }
    }
  };
  rekognition.detectLabels(params, (err, data) => {
    if (err) {
      res.send(JSON.stringify({ error: err, stack: err.stack }));
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
