const jwt = require('jsonwebtoken');
const db = require('../../db.js');
const data = require('../../data/user');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
function makeArray(data){
	let resultArray = [];
	for(var rs in data){
	  if(data.hasOwnProperty(rs)){
		  //console.log(data[rs].dataValues)
		resultArray.push(data[rs].dataValues);
	  }
	}
	return resultArray;
  }
  function makeSpreadArray(data){
	let resultArray = [];
	for(var rs in data){
	  if(data.hasOwnProperty(rs)){
		resultArray.push(data[rs]);
	  }
	}
	console.log(resultArray)
	return resultArray;
  }
module.exports = (app,auth,logger)=>{

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
                    let token = jwt.sign({ uid : userData.UID, email : userData.EMAIL,name : userData.USER_NICK}, 
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

    app.post("/API/USER_PROFILE", auth.authCheck('all'), async (req,res)=>{

        let blocks = [];
        let info = [];
        let follows = [];
        let UID = '';
        let decoded;
        if(req.body.UID == ''){
            decoded = jwt.verify(req.body.TOKEN,data.cert());
            UID = decoded.uid;
        }else{
            UID = req.body.UID
        }
        
		console.log("[SPREAD BLOCK]");
        await db.BLOCK_ISSUES.findAll({where : {UID : UID}}).then((result)=>{ blocks= makeArray(result); });
        await db.USERS.findAll({where : {UID : decoded.uid}}).then((result)=>{ info= makeArray(result); });
        await db.sequelize.query("select * from USERs t1 join FOLLOWs t2 on t1.UID = t2.UID ").spread((result)=>{ follows= makeSpreadArray(result); });


		res.send({success : 200, data : {info : info, blocks : blocks,follows : follows}})

    })
    
    app.post("/API/FOLLOW", auth.authCheck('auth'), async (req,res)=>{
        let decoded = jwt.verify(req.body.TOKEN,data.cert());
        
        let newFollow = {
            UID : decoded.uid,
            FID : req.body.FID
        }

        db.FOLLOWS.create(newFollow).then((err,result)=>{
            
            db.USERS.findOne({where : {UID : newFollow.FID}}).then((result)=>{
                let newFollowCount = Number(result.FOLLOW_COUNT) + 1;
                db.USERS.update({
                    FOLLOW_COUNT : newFollowCount
                },{
                    where : {
                        UID : newFollow.FID
                    }
                });
                res.send({success : 200})
            })


        }).catch((err)=>{
            console.log(err);
            res.send({success : 400})
        })
        
        


        
    })

    app.post("/API/UNFOLLOW", auth.authCheck('auth'), async (req,res)=>{
        let decoded = jwt.verify(req.body.TOKEN,data.cert());
        let UID = decoded.uid;
        let FID = req.body.FID;

        db.FOLLOWS.destroy({where : {UID : UID, FID : FID}}).then((err,result)=>{
            db.USERS.findOne({where : {UID : FID}}).then((result)=>{
                let newFollowCount = Number(result.FOLLOW_COUNT) - 1;
                db.USERS.update({
                    FOLLOW_COUNT : newFollowCount
                },{
                    where : {
                        UID : newFollow.FID
                    }
                });
                res.send({success : 200})
            })
        }).catch((err)=>{
            console.log(err);
            res.send({success : 400})
        })
        
    })

    app.post("/API/FOLLOW_CHECK", auth.authCheck('auth'), async (req,res)=>{
        let decoded = jwt.verify(req.body.TOKEN,data.cert());
        let UID = decoded.uid;
        let FID = req.body.FID;

        db.FOLLOWS.findOne({where : {UID : UID, FID : FID}}).then((result)=>{
            if(result){
                res.send({success : 400,message : 'FOLLOW 불가능'})
            }else{
                res.send({success : 200,message : 'FOLLOW 가능'})
            }
        })
        
    })
}
