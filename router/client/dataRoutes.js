var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
var cert = "asldjkhf12409uaslkjllkn23lrn9f";


module.exports = function(app,logger){

    app.post("/client/test",middleware.authMiddleWare(),(req,res)=>{
        res.send("success");
    })
}

