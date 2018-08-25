var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');

module.exports = (app,logger)=>{

    //메인 질문 페이지
    app.get("/main", async (req,res)=>{
      res.render('client/main');
    })

    app.post("/main", async (req,res)=>{
      await db.mainQuestions.create(req.body.data).then((result)=>{
        res.send({
          succes : 200,
          message : "저장 완료"
        })
      })
    })

    app.put("/main", async (req,res)=>{
      await db.mainQuestions.update(req.body.data,{
        where : {
          id : req.body.id
        }
      });
      res.send({
        succes : 200,
        message : "변경 완료"
      })
    })

    app.delete("/main", async (req,res)=>{
        await db.mainQuestions.destroy({
          where : {
            id : req.body.id
          }
        })

        res.send({
          succes : 200,
          message : "삭제 완료"
        })
    })

}
