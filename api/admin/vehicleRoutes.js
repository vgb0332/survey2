var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');

module.exports = (app,logger)=>{

    /*

        Vehicle CRUD

        get: read vehicle
        post: create vehicle
        put: update vehicle
        delete: delete vehicle

    */

    app.post("/api/admin/vehicle", async (req,res)=>{
        let date = new Date();
        logger.info("/api/admin/vehicle ::: POST ::: Date ::: "+date);
        db.vehicles.create(req.body).then((err,result)=>{
            res.send({success: 200})
        }).catch((err)=>{
            console.log(err);
            res.send({sucess : 400, message : err})
        })
    })

    app.post("/api/admin/vehicle/image", async (req,res)=>{
        let date = new Date();
        logger.info("/api/admin/vehicle/Image ::: POST ::: Date ::: "+date);
        db.vehicle_images.create(req.body).then((err,result)=>{
            res.send({success: 200})
        }).catch((err)=>{
            console.log(err);
            res.send({sucess : 400, message : err})
        })
    })

    app.post("/api/admin/vehicle", async (req,res)=>{
        let date = new Date();
        logger.info("/api/admin/vehicle ::: POST ::: Date ::: "+date);
        db.vehicles.create(req.body).then((err,result)=>{
            res.send({success: 200})
        }).catch((err)=>{
            console.log(err);
            res.send({sucess : 400, message : err})
        })
    })

    app.get("/api/admin/vehicle",async (req,res)=>{
        let date = new Date();
        logger.info("/api/admin/vehicle ::: GET ::: Date ::: "+date);
        let vehicles = await db.vehicles.findAll().then((result)=>{
            return functions.makeArray(result);
        })
        console.log(vehicles)
        let vehicle_images = await db.vehicle_images.findAll().then((result)=>{
            return functions.makeArray(result);
        })

        for(var i=0; i<vehicles.length; i++){
            let tempArray = [];
            for(var j=0; j<vehicle_images.length; j++){
                if(vehicles[i].id == vehicle_images[j].vid){
                    tempArray.push(vehicle_images[j]);
                }
            }
            vehicles[i].images = tempArray;
        }

        console.log("[vehicles]")
        console.log(vehicles);

        res.send({
            success : 200,
            vehicles : vehicles
        })
    })

    app.get("/api/admin/vehicle/:id",async (req,res)=>{
        let date = new Date();
        logger.info("/api/admin/vehicle ::: GET ::: Date ::: "+date);
        let vehicles = await db.vehicles.findAll({where : {id : req.params.id}}).then((result)=>{
            return functions.makeArray(result);
        })
        let vehicle_images = await db.vehicle_images.findAll({where : {vid : req.params.id}}).then((result)=>{
            return functions.makeArray(result);
        })

        vehicles[0].images = vehicle_images;

        console.log("[vehicles]")
        console.log(vehicles);

        res.send({
            success : 200,
            vehicles : vehicles
        })
    })

    app.put("/api/admin/vehicle/:id",(req,res)=>{
        let date = new Date();
        logger.info("/api/admin/vehicle ::: PUT ::: Date ::: "+date);

        db.vehicles.update({
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

        responseHelper.success_code(200,'update success');

    })

    app.delete("/api/admin/vehicle/:id",(req,res)=>{
        let date = new Date();
        logger.info("/api/admin/vehicle ::: DELETE ::: Date ::: "+date);

        db.vehicles.destroy({
            where : {
                id : req.params.id
            }
        })

        responseHelper.success_code(200,'delete success');
   
    })
}