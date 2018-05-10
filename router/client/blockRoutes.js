var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
var cert = "asldjkhf12409uaslkjllkn23lrn9f";


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

