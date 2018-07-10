var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');

module.exports = (app,logger)=>{

    app.get("/admin/placeManage", async (req,res)=>{
        res.render("admin/place/placeListPage");
    })

    app.get("/admin/plageRegist", async (req,res)=>{

        if(req.query.flag == 'new'){
            res.render("admin/place/placeRegistPage");
        }else{
            console.log(req.query.id);
            res.render("admin/place/placeRegistPage");
        }
        
    })

}