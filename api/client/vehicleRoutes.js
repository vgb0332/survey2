var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');

module.exports = (app,logger)=>{

    app.get("/api/vehicle",(req,res)=>{
        let date = new Date();
        console.log("[API 호출 가즈아!!!!]")
        res.send("Trive API: "+date);
    })
}