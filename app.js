const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const rekognitionRouter = require('./routes/rekognition');
const S3Service = require('./services/s3');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/rekognition', rekognitionRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// S3 initialize FIXME
const bucketName = process.env.HIFIVE_AWS_SAMPLE_S3_BUCKET || 'hifive-aws-sample';
S3Service.createS3BucketIfDoesNotExist(bucketName, (err, data) => {
  if (err) {
    console.error('S3 bucket creating is failed: ' + bucketName);
    process.exit(1);
  }
  if (data.created) {
    console.log(`S3 bucket is created to ${bucketName}`);
  } else {
    console.log(`S3 bucket(${bucketName}) already exist`);
  }
});
