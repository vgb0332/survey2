var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');

module.exports = (app,logger)=>{


    //로그인 페이지 - 첫페이지
    app.get("/",async (req,res)=>{
      res.render('client/login');
    })

    //회원가입 페이지
    app.get("/register", async (req,res)=>{
      res.render('client/register');
    })

    app.post("/login", async (req,res)=>{
      let phonenumber = req.body.phonenumber;
      let password = req.body.password;

      let user = await db.users.findOne({where : {phonenumber : phonenumber, password : password}});
      if(user){
        console.log(user);
        req.session.phonenumber = phonenumber;
        console.log("[session check]");
        console.log(req.session)
        res.send({
          success : 200,
          data : user
        })
      }else{
        res.send({
          success : 400,
          message : '회원 가입을 진행해주세요'
        })
      }
    });


    app.post("/register", async (req,res)=>{
      
      let user = await db.users.findOne({where : {phonenumber : req.body.phonenumber}});
      if(user){
        console.log(user)
        res.send({
          success : 400,
          message : "이미 가입되어 있는 회원입니다."
        })
      }else{ 
        await db.users.create(req.body).then((result)=>{
          console.log("[회원가입 완료]")
          console.log(result);
          res.send({
            success : 200,
            message : "회원 가입 완료"
          })
        })
      }

    })


}
