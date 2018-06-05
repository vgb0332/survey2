
var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
var cert = "asldjkhf12409uaslkjllkn23lrn9f";
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var FileUpload = require('../../lib/aws/fileUpload')
module.exports = (app,auth,logger)=>{

        app.post("/API/IMAGE_UPLOAD", async (req,res)=>{
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
                    responseHelper.err_send('ResourceNotFound', res);
                    return;
                }
                let query = {
                    file: JSON.parse(JSON.stringify(files.file[0])) || null,
                };
                FileUpload.image.upload(query, (err, url) => {
                    if (url && !err) {
                        responseHelper.success_send(200, url, res);
                    } else {
                        responseHelper.err_send(err, res);
                    }
                });
            });
    
        })
        
}
	
	

