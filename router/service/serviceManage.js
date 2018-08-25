var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');

module.exports = (app,logger)=>{


    //이트로 질문 : 인트로 질문 했으면 메인 페이지로, 안했으면 하게끔
    app.get("/intro", async(req,res)=>{

      if(req.session.phonenumber){
        let user = await db.users.findOne({where : {phonenumber : req.session.phonenumber}});
        if(user){
          console.log(user);
          if(user.introQuestion == 'no'){
            res.render('client/intro');
          }else{
            res.redirect("/main");
          }
        }else{
          res.redirect("/")
        }
      }else{
        res.redirect("/")
      }
     //res.render('client/intro');
    })

    app.post("/intro", async (req,res)=>{
      req.body.data.phonenumber = req.session.phonenumber;
      await db.introQuestions.create(req.body.data).then(async (result)=>{
        console.log(result);
        await db.users.update({
          introQuestion : 'yes'
        },{
          where : {
            phonenumber : req.session.phonenumber
          }
        })
        res.send({
          success : 200,
          message : "입력 완료"
        })
      })
    })


}
