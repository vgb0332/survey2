var db = require('../../db.js');

module.exports = function(app,logger){

    app.get("/cilent",(req,res)=>{
        res.send("main");
    })
}