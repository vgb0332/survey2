const jwt = require('jsonwebtoken');
const db = require('../../db.js');
const data = require('../../data/user');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

module.exports = (app,logger)=>{

    app.post("/API/REGIST", async (req,res) => {

        var userData = {
            UID : data.getRandomString(),
            EMAIL : req.body.EMAIL,
            USER_NAME : req.body.USER_NAME == '' ? "설정요망" : req.body.USER_NAME,
            USER_NICK : req.body.USER_NICK,
            PASSWORD : req.body.PASSWORD,
            SALT : '',
            POINT : '0'
        }

        let checkEmail = await db.USERS.findOne({where : {EMAIL : userData.EMAIL}});
        let checkNick = await db.USERS.findOne({where : {USER_NICK : userData.USER_NICK}});
        if(checkEmail){
            console.log("있는 이메일");
            res.send({
                success : 400,
                message : "이미 있는 메일이에용"
            })
        }else{
            if(checkNick){
                console.log("있는 닉네임")
                res.send({
                    success : 400,
                    message : "이미 있는 닉네임 이에용"
                })
            }else{
                console.log("회원가입 가능");
                let validationResult = data.signupValidationCheck(userData);
                await hasher({password:userData.PASSWORD}, async (err, pass, salt, hash) => {
                    userData.SALT = salt
                    userData.PASSWORD = hash
                    console.log(userData)
                    await db.USERS.create(userData).then((err,result)=>{
                        res.send({
                            success : 200,
                            message : "회원 가입 성공",
                            data : {
                                EMAIL : userData.EMAIL,
                                USER_NICK : userData.USER_NICK
                            }
                        })
                    }).catch((err)=>{
                        console.log(err);
                        res.send({
                            success : 400,
                            message : err
                        })
                    })
                });
            }
        }
    })

    app.post("/API/LOGIN", async (req,res)=>{

        let result = await db.USERS.findOne({where : {EMAIL : req.body.EMAIL}})
        
        if(result){
            const userData = result.dataValues;
            await hasher({password:req.body.PASSWORD, salt:userData.SALT}, async function (err, pass, salt, hash) {
                console.log(hash);
                console.log(userData.PASSWORD)
                if(hash == userData.PASSWORD){
                    let token = jwt.sign({ id : userData.ID, email : userData.EMAIL,name : userData.USER_NICK}, 
                        data.cert(),{ expiresIn: 60 * 60 * 60 * 60});
                    await db.USERS.update({LOGIN_DATE : data.getNow()},{where : {UID : userData.UID}});
                    let node = { success : true, token : token, message : "Login success"}
                    res.json(node)
                }else{
                    console.log("비밀번호 불일치")
                    let node = { success : false, token : null, message : "Email and password not matched" }
                    res.json(node)
                }
            });
        }else{
            console.log("데이터 노존재")
            let node = { success : false, token : null, message : "There is no account\nPlz check you email" }
            res.json(node)
        }

        
    })
}
