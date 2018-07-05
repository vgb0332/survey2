var db = require('../../db.js');

module.exports = (app,logger)=>{

    app.get("/api",(req,res)=>{
        let date = new Date();
        console.log("[API 호출 가즈아!!!!]")
        res.send("Trive API: "+date);
    })
}