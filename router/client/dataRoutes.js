var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
var cert = "asldjkhf12409uaslkjllkn23lrn9f";


module.exports = function(app,logger){

	/*
		
		data structure

		tag
		title
		content
		category
		date


	*/

    app.get("/client/getData/all",(req,res)=>{
    	db.datas.findAll().then((result)=>{
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

    app.get("/client/getData/five",(req,res)=>{
    	
    })

    //middleware.authMiddleWare(),
    app.post("/client/pushContent",(req,res)=>{
    	console.log(req.body);
    	db.datas.create(req.body).then((err,result)=>{
    		var node = {
                success : true,
                message : "success",
                callbackData : req.body
            }
            res.json(node)
    	}).catch((err)=>{
    		console.log(err);
    		var node = {
                success : false,
                message : "data create fail"
            }
            res.json(node)
    	})
    })


}

