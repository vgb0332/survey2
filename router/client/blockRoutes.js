var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
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


	app.post("/API/CREATE_ISSUEBLOCK",async(req,res)=>{
		console.log("[CREATE ISSUE BLOCK]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
		//console.log(decoded.uid) // bar
		let newData = req.body;
		delete newData.TOKEN;
		newData.UID = decoded.uid;
		newData.CREATED_DATE = functions.getNowTimeFormat();
		newData.PID = functions.randomString();
		console.log(newData)
		
		await db.BLOCK_ISSUES.create(newData).then((err,result)=>{
			responseHelper.success_send(200, {success : true}, res);
		}).catch((err)=>{
			console.log("[BLOCK CREATE ERROR]")
			console.log(err);
			responseHelper.err_send(400,'BLOCK CREATE ERROR(CHECK AGAIN)', res);
		})

		
		
	})


}

