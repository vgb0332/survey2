var db = require('../../db.js');

module.exports = (app,auth,logger)=>{

    app.get("/API",(req,res)=>{
        console.log("[API 호출 가즈아!!!!]")
        res.send("SIBAL SEX");
    })
}