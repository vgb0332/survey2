var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');

module.exports = (app,auth,logger)=>{

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


	app.post("/API/CREATE_ISSUEBLOCK",auth.authCheck(),async(req,res)=>{
		console.log("[CREATE ISSUE BLOCK]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
		//console.log(decoded.uid) // bar
		let newData = req.body;
		delete newData.TOKEN;
		newData.UID = decoded.uid;
		newData.PID = functions.randomString();
		newData.CREATE_DATE = functions.getNowTimeFormat();
		newData.UPDATE_DATE = functions.getNowTimeFormat();
		console.log(newData)
		
		await db.BLOCK_ISSUES.create(newData).then((err,result)=>{
			responseHelper.success_send(200, {success : true}, res);
		}).catch((err)=>{
			console.log("[BLOCK CREATE ERROR]")
			console.log(err);
			responseHelper.err_send(400,'BLOCK CREATE ERROR(CHECK AGAIN)', res);
		})
	})

	app.post("/API/DISABLE_ISSUEBLOCK", auth.authCheck(), async (req,res)=>{
		console.log("[DISABLE ISSUE BLOCK]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
		let UID = decoded.uid;
		let PID = req.body.PID;
		await db.BLOCK_ISSUES.update({
			SHOW : 'HIDE'
		},{
			where : {
				UID : UID,
				PID : PID
			}
		})
		responseHelper.success_send(200, {success : true}, res);

	});

	app.post("/API/UPDATE_ISSUEBLOCK", auth.authCheck(), async (req,res)=>{
		console.log("[DISABLE ISSUE BLOCK]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
		let UID = decoded.uid;
		let PID = req.body.PID;

		await db.BLOCK_ISSUES.update({
			BLOCK_ISSUES_THEME: req.body.BLOCK_ISSUES_THEME,
			BLOCK_ISSUES_HASHTAG: req.body.BLOCK_ISSUES_HASHTAG,
			BLOCK_ISSUES_CONTENT: req.body.BLOCK_ISSUES_CONTENT,
			BLOCK_ISSUES_IMAGE: req.body.BLOCK_ISSUES_IMAGE,
			BLOCK_ISSUES_VIDEO: req.body.BLOCK_ISSUES_VIDEO,
			BLOCK_ISSUES_ISSUE_LOCATION: req.body.BLOCK_ISSUES_ISSUE_LOCATION,
			UPDATE_DATE : functions.getNowTimeFormat()

		},{
			where : {
				UID : UID,
				PID : PID
			}
		})
		responseHelper.success_send(200, {success : true}, res);

	})


}

