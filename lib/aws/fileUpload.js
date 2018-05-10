const async = require('async');
const fs = require('fs');
const ejs = require('ejs');

// Lib
const aws = require('./aws');

// DB

const FileUpload = {
  ////////////////////////////////////
  //////////       Image      ////////
  ////////////////////////////////////
  image: {
    /**
     * @param {File} query.file **required
     */
    upload: (query, callback) => {
        const fileName = new Date().getTime() + Math.floor(Math.random() * 1000) + '.jpg';
        const metadata = aws.getContentTypeByFile(query.file.originalFilename);
        fs.readFile(query.file.path, (err, readStream) => {
            async.parallel([
                (callback) => { // 원본 이미지 저장
                    const params = {
                        Bucket: 'jivida.com',
                        Key: 'images/original/' + fileName,
                        Body: readStream,
                        ACL: 'public-read',
                        ContentType: metadata,
                    };
                    aws.s3_upload(params, (err, result) => {
                        callback(null);
                    });
                }
            ], (err) => {
                callback(null, 'https://s3.ap-northeast-2.amazonaws.com/jivida.com/images/original/' + fileName);
            });
        });
    },
    /**
     * @param {String} query.url **required
     */
    delete: (query, callback) => {
    },
  },
};
module.exports = FileUpload;