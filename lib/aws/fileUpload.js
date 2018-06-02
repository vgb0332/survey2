const async = require('async');
const fs = require('fs');
const ejs = require('ejs');

const sharp = require('sharp'); // http://sharp.dimens.io/en/stable/api-output/#tobuffer

// Lib
const aws = require('./aws');

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
                        Bucket: 'maemi-image',
                        Key: 'images/original/' + fileName,
                        Body: readStream,
                        ACL: 'public-read',
                        ContentType: metadata,
                    };
                    console.log("[원본 이미지 저장]")
                    aws.s3_upload(params, (err, result) => {
                        callback(null);
                    });
                },
                (callback) => { // 640 x 470 (매물 실제 이미지)
                    const sharp = require('sharp'); 
                    sharp(readStream)
                        .resize(640, 470)
                        .crop()
                        .jpeg({
                            quality: 80, // Number quality, integer 1-100 (optional, default 80)
                            force: true, // Boolean force JPEG output, otherwise attempt to use input format (optional, default  true
                        })
                        .toBuffer()
                        .then((resizeStream) => {
                            const params = {
                                Bucket: 'maemi-image-resize',
                                Key: 'images/640x470/' + fileName,
                                Body: resizeStream,
                                ACL: 'public-read',
                                ContentType: metadata,
                            };
                            console.log("[640x470 이미지 저장]")
                            aws.s3_upload(params, (err, result) => {
                                callback(null);
                            });
                        })
                        .catch((err) => {
                            callback(null);
                        });
                },
                (callback) => { // 200 x 200
                    const sharp = require('sharp'); 
                    sharp(readStream)
                        .resize(200, 200)
                        .crop()
                        .jpeg({
                            quality: 80, // Number quality, integer 1-100 (optional, default 80)
                            force: true, // Boolean force JPEG output, otherwise attempt to use input format (optional, default  true
                        })
                        .toBuffer()
                        .then((resizeStream) => {
                            const params = {
                                Bucket: 'maemi-image-resize',
                                Key: 'images/200x200/' + fileName,
                                Body: resizeStream,
                                ACL: 'public-read',
                                ContentType: metadata,
                            };
                            console.log("[200x200 이미지 저장]")
                            aws.s3_upload(params, (err, result) => {
                                callback(null);
                            });
                        })
                        .catch((err) => {
                            callback(null);
                        });
                },
                (callback) => { // 80 x 80
                    const sharp = require('sharp'); 
                    sharp(readStream)
                        .resize(80, 80)
                        .crop()
                        .jpeg({
                            quality: 80, // Number quality, integer 1-100 (optional, default 80)
                            force: true, // Boolean force JPEG output, otherwise attempt to use input format (optional, default  true
                        })
                        .toBuffer()
                        .then((resizeStream) => {
                            const params = {
                                Bucket: 'maemi-image-resize',
                                Key: 'images/80x80/' + fileName,
                                Body: resizeStream,
                                ACL: 'public-read',
                                ContentType: metadata,
                            };
                            console.log("[80x80 이미지 저장]")
                            aws.s3_upload(params, (err, result) => {
                                callback(null);
                            });
                        })
                        .catch((err) => {
                            callback(null);
                        });
                },
            ], (err) => {
                callback(null, '	https://s3.ap-northeast-2.amazonaws.com/maemi-image/images/original/' + fileName);
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
