var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');
function makeArray(data){
	let resultArray = [];
	for(var rs in data){
	  if(data.hasOwnProperty(rs)){
		resultArray.push(data[rs].dataValues);
	  }
	}
	return resultArray;
  }
  function makeSpreadArray(data){
	let resultArray = [];
	for(var rs in data){
	  if(data.hasOwnProperty(rs)){
		resultArray.push(data[rs]);
	  }
	}
	return resultArray;
  }
module.exports = (app,auth,logger)=>{

	/*

		Block Data Structure (=BDS);
		20180510 UPDATE
		@Issue Block Create
		@Reply Block Create
		@Block Hide
		@Block Show
		@Block Update
		
		@vote UP
		@vote CANCEL

	*/



	/*

	ISSUE BLOCK

	*/

	app.get("/API/SPREAD_BLOCK", async (req,res)=>{

		let blocks = [];
		console.log("[SPREAD BLOCK]");
		await db.BLOCK_ISSUES.findAll({where : {SHOW : 'SHOW'}}).then((result)=>{ blocks= makeArray(result); });
		console.log(blocks);

		res.send({success : 200, data : blocks})

	})

	app.post("/API/CREATE_ISSUEBLOCK",auth.authCheck(),async(req,res)=>{
		console.log("[CREATE ISSUE BLOCK]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
		//console.log(decoded.uid) // bar
		let newData = req.body;
		delete newData.TOKEN;
		newData.FLAG = 'root';
		newData.UID = decoded.uid;
		newData.PID = functions.randomString();
		newData.CREATE_DATE = functions.getNowTimeFormat();
		newData.UPDATE_DATE = functions.getNowTimeFormat();
		console.log(newData)
		
		await db.BLOCK_ISSUES.create(newData).then(async (err,result)=>{

			let save_logs =await functions.save_log(newData.UID, "[CREATE ISSUE BLOCK]");
			await responseHelper.success_send(200, {success : true}, res);

		}).catch(async (err)=>{
			console.log("[ISSUE BLOCK CREATE ERROR]")
			console.log(err);
			let save_logs =await functions.save_log(newData.UID, "[ISSUE BLOCK CREATE ERROR]");
			await responseHelper.err_send(400,'BLOCK CREATE ERROR(CHECK AGAIN)', res);
		})
	})

	app.post("/API/DISABLE_BLOCK", auth.authCheck(), async (req,res)=>{
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
		let save_logs =await functions.save_log(newData.UID, "[DISABLE ISSUE BLOCK]");
		responseHelper.success_send(200, {success : true}, res);

	});

	app.post("/API/ABLE_BLOCK", auth.authCheck(), async (req,res)=>{
		console.log("[ABLE ISSUE BLOCK]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
		let UID = decoded.uid;
		let PID = req.body.PID;
		await db.BLOCK_ISSUES.update({
			SHOW : 'SHOW'
		},{
			where : {
				UID : UID,
				PID : PID
			}
		})
		let save_logs =await functions.save_log(newData.UID, "[ABLE ISSUE BLOCK]");
		responseHelper.success_send(200, {success : true}, res);

	});

	app.post("/API/UPDATE_BLOCK", auth.authCheck(), async (req,res)=>{
		console.log("[UPDATE ISSUE BLOCK]");
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

		let save_logs =await functions.save_log(newData.UID, "[UPDATE ISSUE BLOCK]");
		responseHelper.success_send(200, {success : true}, res);

	})


	/*

	REPLY BLOCK
	PPID : 글쓴 곳에서 전달받아 다시 전달
	*/

	app.post("/API/CREATE_REPLYBLOCK",auth.authCheck(),async(req,res)=>{
		console.log("[CREATE REPLY BLOCK]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
		//console.log(decoded.uid)
		let newData = req.body;
		delete newData.TOKEN;
		newData.UID = decoded.uid;
		newData.PID = functions.randomString();
		newData.FLAG = 'reply';
		newData.CREATE_DATE = functions.getNowTimeFormat();
		newData.UPDATE_DATE = functions.getNowTimeFormat();
		console.log(newData)
		
		await db.BLOCK_ISSUES.create(newData).then(async (err,result)=>{
			let save_logs =await functions.save_log(newData.UID, "[CREATE REPLY BLOCK]");
			await responseHelper.success_send(200, {success : true}, res);
		}).catch((err)=>{
			console.log("[BLOCK CREATE ERROR]")
			console.log(err);
			responseHelper.err_send(400,'BLOCK CREATE ERROR(CHECK AGAIN)', res);
		})
	})


	/*

	VOTE UP
	VOTE CANCEL

	*/

	app.post("/API/VOTE_UP",auth.authCheck(),async (req,res)=>{
		console.log("[VOTE_UP]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
	})

	app.post("/API/VOTE_CANCEL",auth.authCheck(),async (req,res)=>{
		console.log("[VOTE_DOWN]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
	})


}

