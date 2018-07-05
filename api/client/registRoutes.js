var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
module.exports = (app,logger)=>{

    app.post("/api/user/regist",async (req,res)=>{
        let date = new Date();
        
        let newUser = {
            name : req.body.name,
            phone : req.body.phone,
            email : req.body.email,
            birthYear : req.body.birthYear,
            birthMonth : req.body.birthMonth,
            birthDay : req.body.birthDay,
            subscriptionType : req.body.subscriptionType,
            licenseFront : req.body.licenseFront,
            licenseBack : req.body.licenseBack
        }

        await db.users.findOne({where : {email : req.body.email}}).then(async (result)=>{
            if(result){
                responseHelper.err_code(400,'email already exist!!!',res);
            }else{
                await hasher({password:req.body.password}, async (err, pass, salt, hash) => {
                    newUser.salt= salt
                    newUser.password = hash
                    console.log(newUser)
                    await db.users.create(newUser).then((err,result)=>{
                        res.send({success : 200, data : newUser})
                    }).catch((err)=>{
                        console.log(err);
                        res.send({success : 400, message : 'fail'})
                    })
                });
            }
        })
        
        
    })



    app.post("/api/user/image", async (req,res)=>{
        let date = new Date();
        logger.info("/api/user/image ::: POST ::: Date ::: "+date);
        db.license_images.create(req.body).then((err,result)=>{
            res.send({success: 200})
        }).catch((err)=>{
            console.log(err);
            res.send({sucess : 400, message : err})
        })
    })
}