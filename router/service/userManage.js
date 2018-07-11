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


}
