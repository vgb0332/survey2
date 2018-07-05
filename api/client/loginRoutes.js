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

    app.post("/api/user/login",async (req,res)=>{
        let date = new Date();
        let result = await db.users.findOne({where : {email : req.body.email}})
        
        if(result){
            const userData = result.dataValues;
            await hasher({password:req.body.password, salt:userData.salt}, async function (err, pass, salt, hash) {
                console.log(hash);
                console.log(userData.password)
                if(hash == userData.password){
                    let node = { success : 200,message : "Login success"}
                    res.json(node)
                }else{
                    console.log("비밀번호 불일치")
                    let node = { success : 400, message : "Email and password not matched" }
                    res.json(node)
                }
            });
        }else{
            console.log("데이터 노존재")
            let node = { success : 400,message : "There is no account\nPlz check you email" }
            res.json(node)
        }
    })
}