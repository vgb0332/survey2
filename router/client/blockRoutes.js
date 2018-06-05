var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
var cert = "asldjkhf12409uaslkjllkn23lrn9f";
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
		
		
	})


}

