const AWS = require('aws-sdk')
const fs = require('fs');
require('dotenv').config();

// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint(process.env.ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const imgUri = 'arno.jpg';

let params = {
  Bucket: process.env.BUCKET,
  Key: imgUri,
  Body: fs.createReadStream(imgUri),
  ACL: 'public-read',
}
// upload the image onto bucket
s3.upload(params, function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return
  }
  console.log('Success!', data)
})
