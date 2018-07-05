
module.exports = (app,logger)=>{

    app.get("/apidoc",(req,res)=>{
        res.render("apidoc");
    })
}