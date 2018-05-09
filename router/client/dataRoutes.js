var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
var cert = "asldjkhf12409uaslkjllkn23lrn9f";


module.exports = (app,logger)=>{

	/*
		
		data structure

		tag
		title
		content
		category
		date


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

