var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');

module.exports = (app,logger)=>{

    app.get("/admin", async (req,res)=>{
        res.render("admin/LoginPage", {message : ''});
    })

    app.post("/admin/login", async (req,res)=>{
        if(req.body.username == '' || req.body.password == ''){
            res.render("admin/LoginPage", {message : '이메일과 비밀번호를 입력 해주세요'});
        }else{
            if(req.body.username == 'ushouse'){
                if(req.body.password == 'ushouse'){
                    res.redirect("/admin/placeManage");
                }else{
                    res.render("admin/LoginPage", {message : '비밀번호를 확인해주세요'});
                }
            }else{
                res.render("admin/LoginPage", {message : '이메일을 확인해주세요'});
            }
        }
    })


}