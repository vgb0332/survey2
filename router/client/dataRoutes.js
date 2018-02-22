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

	app.get("/client/getData/:id",(req,res)=>{

	    db.datas.findAll({where : {id : req.params.id}}).then((result)=>{
    		var resultArray = [];
    		for(var rs in result){
    			if(result.hasOwnProperty(rs)){
    				resultArray.push(result[rs].dataValues);
    			}
    		}
    		var node = {
                success : true,
                data : resultArray[0]
			}
			console.log(node)
            res.json(node)
    	})
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

	app.post("/client/getThemeData",(req,res)=>{
		console.log(req.body)
		db.sequelize.query('select * , count(*) count from datas where category="'+req.body.category+'" group by theme order by id DESC').spread((result)=>{
			
			var resultArray = [];
    		for(var rs in result){
    			if(result.hasOwnProperty(rs)){
    				resultArray.push(result[rs]);
    			}
			}
			console.log(resultArray)
    		var node = {
                success : true,
                data : resultArray
            }
            res.json(node)
		})
	})

	app.post("/client/getThemeDataSpecific",(req,res)=>{
		console.log(req.body)
		db.sequelize.query('select *  count from datas where theme="'+req.body.theme+'"').spread((result)=>{
			
			var resultArray = [];
    		for(var rs in result){
    			if(result.hasOwnProperty(rs)){
    				resultArray.push(result[rs]);
    			}
			}
			console.log(resultArray)
    		var node = {
                success : true,
                data : resultArray
            }
            res.json(node)
		})
	})

	app.post("/client/getThemeEachData",(req,res)=>{
		console.log(req.body)
		db.sequelize.query('select *  count from datas where theme="'+req.body.theme+'"').spread((result)=>{
			
			var resultArray = [];
    		for(var rs in result){
    			if(result.hasOwnProperty(rs)){
    				resultArray.push(result[rs]);
    			}
			}
			console.log(resultArray)
    		var node = {
                success : true,
                data : resultArray
            }
            res.json(node)
		})
	})

	app.post("/client/getCategoryData",(req,res)=>{
		console.log(req.body)
		db.sequelize.query('select * from datas where category="'+req.body.category+'"').spread((result)=>{
			
			var resultArray = [];
    		for(var rs in result){
    			if(result.hasOwnProperty(rs)){
    				resultArray.push(result[rs]);
    			}
			}
			console.log(resultArray)
    		var node = {
                success : true,
                data : resultArray
            }
            res.json(node)
		})
	})
	// select P.gtitle, P.gdesc 	from posts P
	// where match(gtitle, gdesc) against('로고') limit 10;
	app.post("/client/getTagData",(req,res)=>{
		db.sequelize.query('select * from datas where match(tag,title) against("'+req.body.tag+'") ').spread((result)=>{
			var resultArray = [];
    		for(var rs in result){
    			if(result.hasOwnProperty(rs)){
    				resultArray.push(result[rs]);
    			}
			}
			console.log(resultArray)
    		var node = {
                success : true,
                data : resultArray
            }
            res.json(node)
		})
	})

	app.post("/client/getHomePageData",(req,res)=>{
		db.sequelize.query('select category, count(*) count from datas group by category').spread((result)=>{
			var resultArray = [];
    		for(var rs in result){
    			if(result.hasOwnProperty(rs)){
    				resultArray.push(result[rs]);
    			}
			}
			console.log(resultArray)
    		var node = {
                success : true,
                data : resultArray
            }
            res.json(node)
		})
	})



}

