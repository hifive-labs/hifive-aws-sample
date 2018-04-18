class S3Service {
  static createS3BucketIfDoesNotExist(bucketName, cb) {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3();
    const params = {
      Bucket: bucketName
    };
    s3.headBucket(params, (err, data) => {
      if (err) {
        // bucketが存在しない場合
        const params = {
          Bucket: bucketName
        };
        s3.createBucket(params, function(err, data) {
          if (err) {
            cb(err, null);
          } else {
            // Nodejs6ではObjectへのSpread Operatorが使えない
            const newData = Object.assign({}, data);
            newData.created = true;
            cb(null, newData);
          }
        });
      } else {
        const newData = Object.assign({}, data);
        newData.created = false;
        cb(null, newData);
      }
    });
  }
}

module.exports = S3Service;
