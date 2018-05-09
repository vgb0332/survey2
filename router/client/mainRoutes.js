var db = require('../../db.js');

module.exports = (app,logger)=>{

    app.get("/api",(req,res)=>{
        res.send("THIS IS PROHIBBITED PLACE!!!!!!HAHA");
    })
}