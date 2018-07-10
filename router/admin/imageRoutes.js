const db = require('../../db.js');
const _f = require('../../lib/functions.js');
const FileUpload = require('../../lib/aws/fileUpload.js');
const async = require('async');
const fs = require('fs');
const multiparty = require('multiparty');

module.exports = (app,logger) => {

    app.post("/ADMIN/IMAGE_UPLOAD", async (req,res)=>{
        console.log('(POST) controller/api/upload.js :: /upload/image called');
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
        
            if (err || !files || !files.file || files.length == 0) {
                console.log("err")
                console.log(err);
                console.log("files")
                console.log(files);
                console.log("files.file")
                console.log(files.file);
                console.log("fields")
                console.log(fields)
                console.log("files.length");
                console.log(files.length)
                // responseHelper.err_send('ResourceNotFound', res);
                res.send({success : 400, message : "리소스를 찾을 수 없습니다"})
                return;
            }
            let query = {
                file: JSON.parse(JSON.stringify(files.file[0])) || null,
            };
            FileUpload.image.upload(query, (err, url) => {
                if (url && !err) {
                    res.send({success : 200, message : "파일 업로드를 성공했습니다", url : url})
                } else {
                    res.send({success : 400, message : "파일 업로드에 실패하였습니다. 다시 시도해주세요"})
                }
            });
        });

    })

}