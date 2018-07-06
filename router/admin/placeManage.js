var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');

module.exports = (app,logger)=>{


    app.get("/admin/place",async (req,res)=>{
        let date = new Date();
        logger.info("/admin/place ::: GET ::: Date ::: "+date);
        let places = await db.places.findAll({where : {id : req.params.id}}).then((result)=>{
            return functions.makeArray(result);
        })

        console.log("[places]")
        console.log(places);

        res.send({
            success : 200,
            places : places
        })
    })

    app.get("/admin/place/:id",async (req,res)=>{
        let date = new Date();
        logger.info("/admin/place ::: GET ::: Date ::: "+date);
        let places = await db.places.findAll({where : {id : req.params.id}}).then((result)=>{
            return functions.makeArray(result);
        })

        console.log("[place]")
        console.log(place);

        res.send({
            success : 200,
            place : places
        })
    })

    app.post("/admin/place", async (req,res)=>{
        let date = new Date();
        logger.info("/admin/place ::: POST ::: Date ::: "+date);
        db.places.create(req.body).then((err,result)=>{
            res.send({success: 200})
        }).catch((err)=>{
            console.log(err);
            res.send({sucess : 400, message : err})
        })
    })

    app.put("/admin/place",(req,res)=>{
        let date = new Date();
        logger.info("/admin/place ::: PUT ::: Date ::: "+date);

        db.places.update({
            where : {
                bodyType : req.body.bodyType,
                carType : req.body.carType,
                colorExterior : req.body.colorExterior,
                colorInterior : req.body.colorInterior,
                cylinder : req.body.cylinder,
                door : req.body.door,
                drivetrain : req.body.drivetrain,
                features : req.body.features,
                fuel : req.body.fuel,
                fuelEconomy : req.body.fuelEconomy,
                latitude : req.body.latitude,
                longitude : req.body.longitude,
                make : req.body.make,
                model : req.body.model,
                trim : req.body.trim,
                subscriptionStart : req.body.subscriptionStart
            }
        },{
            where : {
                id : req.params.id
            }
        })

        res.send({success: 200})

    })

    app.delete("/admin/place/:id",(req,res)=>{
        let date = new Date();
        logger.info("/admin/place ::: DELETE ::: Date ::: "+date);

        db.places.destroy({
            where : {
                id : req.params.id
            }
        })

        res.send({success: 200})
   
    })

}