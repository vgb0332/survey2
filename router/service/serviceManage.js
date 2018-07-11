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
      res.render('client/intro');
    })


}
