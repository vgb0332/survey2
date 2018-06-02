var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
var cert = "asldjkhf12409uaslkjllkn23lrn9f";
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var FileUpload = require('../../lib/aws/fileUpload')
module.exports = (app,logger)=>{

	/*

		Block Data Structure (=BDS);
		20180510 UPDATE

		@Issue Block Create
		@Reply Block Create
		@Issue Block Delete
		@Reply Block Delete
		@Issue Block Update
		@Reply Block Update

	*/
	
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
	

























    app.get("/client/getData/all",(req,res)=>{
    	db.BLOCK_ISSUES.findAll().then((result)=>{
    		var resultArray = [];
    		for(var rs in result){
    			if(result.hasOwnProperty(rs)){
    				resultArray.push(result[rs].dataValues);
    			}
    		}
    		var node = {
                success : true,
                data : resultArray
            }
            res.json(node)
    	})
	})

}

