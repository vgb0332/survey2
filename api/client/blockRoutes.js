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
		  //console.log(data[rs].dataValues)
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
	console.log(resultArray)
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

	app.get("/API/SPREAD_BLOCK", auth.authCheck('all'), async (req,res)=>{

		let ParentBlocks = [];
		let ChildBlocks = [];
		let resultBlocks = [];

		console.log("[SPREAD BLOCK]");
		await db.sequelize.query("select t1.*, t2.EMAIL,t2.USER_NAME,t2.USER_NICK,t2.LOGIN_DATE,t2.createdAt from BLOCK_ISSUEs t1 join USERs t2 on t1.UID = t2.UID where t1.SHOW = 'SHOW' and FLAG = 'issue'").spread((result)=>{ ParentBlocks= makeSpreadArray(result); });
		await db.sequelize.query("select t1.*, t2.EMAIL,t2.USER_NAME,t2.USER_NICK,t2.LOGIN_DATE,t2.createdAt from BLOCK_ISSUEs t1 join USERs t2 on t1.UID = t2.UID where t1.SHOW = 'SHOW' and FLAG = 'reply'").spread((result)=>{ ChildBlocks= makeSpreadArray(result); });

		for(var i=0; i<ParentBlocks.length; i++){
			// console.log("[Parent PID]")
			// console.log(ParentBlocks[i].PID)
			let tempBlocks = {
				ParentBlockPID : ParentBlocks[i].PID,
				ParentBlocks : ParentBlocks[i],
				ChildBlockCount : 0,
				ChildBlocks : []
			}
			for(var j=0; j<ChildBlocks.length; j++){
				console.log("=======================")
				console.log(tempBlocks.ParentBlockPID);
				console.log(ChildBlocks[j].PPID)
				if(tempBlocks.ParentBlockPID == ChildBlocks[j].PPID){
					tempBlocks.ChildBlocks.push(ChildBlocks[j]);
					tempBlocks.ChildBlockCount+=1;
				}
			}
			resultBlocks.push(tempBlocks);
		}

		console.log(resultBlocks)

		res.send({success : 200, data : resultBlocks})

	})

	app.post("/API/DETAIL_BLOCK", auth.authCheck('all'), async (req,res)=>{

		let ParentBlocks = [];
		let ChildBlocks = [];
		let resultBlocks = [];

		console.log("[SPREAD BLOCK]");
		await db.sequelize.query("select t1.*, t2.EMAIL,t2.USER_NAME,t2.USER_NICK,t2.LOGIN_DATE,t2.createdAt from BLOCK_ISSUEs t1 join USERs t2 on t1.UID = t2.UID where t1.SHOW = 'SHOW' and PID = '"+req.body.PID+"'").spread((result)=>{ ParentBlocks= makeSpreadArray(result); });
		await db.sequelize.query("select t1.*, t2.EMAIL,t2.USER_NAME,t2.USER_NICK,t2.LOGIN_DATE,t2.createdAt from BLOCK_ISSUEs t1 join USERs t2 on t1.UID = t2.UID where t1.SHOW = 'SHOW' and PPID = '"+req.body.PID+"'").spread((result)=>{ ChildBlocks= makeSpreadArray(result); });

		for(var i=0; i<ParentBlocks.length; i++){
			// console.log("[Parent PID]")
			// console.log(ParentBlocks[i].PID)
			let tempBlocks = {
				ParentBlockPID : ParentBlocks[i].PID,
				ParentBlocks : ParentBlocks[i],
				ChildBlocks : []
			}
			for(var j=0; j<ChildBlocks.length; j++){
				console.log("=======================")
				console.log(tempBlocks.ParentBlockPID);
				console.log(ChildBlocks[j].PPID)
				if(tempBlocks.ParentBlockPID == ChildBlocks[j].PPID){
					tempBlocks.ChildBlocks.push(ChildBlocks[j]);
				}
			}
			resultBlocks.push(tempBlocks);
		}

		console.log(resultBlocks)

		res.send({success : 200, data : resultBlocks})

	})

	app.post("/API/CREATE_ISSUEBLOCK",auth.authCheck('auth'),async(req,res)=>{
		console.log("[CREATE ISSUE BLOCK]");
		console.log(req.body);
		var decoded = jwt.verify(req.body.TOKEN,data.cert());
		//console.log(decoded.uid) // bar
		let newData = req.body;
		delete newData.TOKEN;
		newData.FLAG = 'issue';
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

	app.post("/API/DISABLE_BLOCK", auth.authCheck('auth'), async (req,res)=>{
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

	app.post("/API/ABLE_BLOCK", auth.authCheck('auth'), async (req,res)=>{
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

	app.post("/API/UPDATE_BLOCK", auth.authCheck('auth'), async (req,res)=>{
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

	app.post("/API/CREATE_REPLYBLOCK",auth.authCheck('auth'),async(req,res)=>{
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

	VOTE CHECK
	VOTE UP
	VOTE CANCEL

	*/

	app.post("/API/VOTE_CHECK",auth.authCheck('auth'),async (req,res)=>{
		
		console.log(req.body);
		let decoded = jwt.verify(req.body.TOKEN,data.cert());

		db.VOTE_HISTORIES.findOne({where : {PID : req.body.PID,UID : decoded.UID}}).then((result)=>{
			if(result){
				res.send({success : 400, message : '이미 투표를 한 블럭'});
			}else{
				res.send({success : 200, message : '투표 가능한 블럭'});
			}
		})
	})

	app.post("/API/VOTE_UP",auth.authCheck('auth'),async (req,res)=>{
		console.log("[VOTE_UP]");
		console.log(req.body);
		let decoded = jwt.verify(req.body.TOKEN,data.cert());
		let newVote = {
			UID : decoded.UID,
			PID : req.body.PID
		}

		db.VOTE_HISTORIES.create(newVote).then((err,result)=>{
			db.BLOCK_ISSUES.findOne({where : {PID : newVote.PID}}).then((result)=>{
				let nowVoteCount = Number(result.VOTED);
				console.log(nowVoteCount);
				let newVoteCount = nowVoteCount + 1;
				console.log(newVoteCount);
				db.BLOCK_ISSUES.update({
					VOTED : newVoteCount
				},{
					where : {
						PID : newVote.PID
					}
				})
				responseHelper.success_send(200, {success : true}, res);
			})
			
		}).catch((err)=>{
			console.log(err);
			responseHelper.err_send(400,'BLOCK CREATE ERROR(UID:token & PID check again)', res);
		})
		
	})

	app.post("/API/VOTE_DOWN",auth.authCheck('auth'),async (req,res)=>{
		console.log("[VOTE_DOWN]");
		console.log(req.body);
		let decoded = jwt.verify(req.body.TOKEN,data.cert());
		db.VOTE_HISTORIES.destroy({ where : {PID : req.body.PID, UID : decoded.uid}}).then((err,result)=>{
			db.BLOCK_ISSUES.findOne({where : {PID : req.body.PID}}).then((result)=>{
				let nowVoteCount = Number(result.VOTED);
				console.log(nowVoteCount);
				let newVoteCount = nowVoteCount - 1;
				console.log(newVoteCount);
				db.BLOCK_ISSUES.update({
					VOTED : newVoteCount
				},{
					where : {
						PID : req.body.PID
					}
				})
				responseHelper.success_send(200, {success : true}, res);
			})
		}).catch((err)=>{
			responseHelper.err_send(400,'BLOCK CREATE ERROR(UID:token & PID check again)', res);
		})
	})


}

