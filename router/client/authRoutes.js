var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var data = require('../../data/user');
var cert = data.cert();



module.exports = function(app,logger){

    app.get("/cilent",(req,res)=>{
        res.send("main");
    })

    app.post("/client/login",(req,res)=>{
        // console.log(req.body);
        var user = req.body;
        var userString = JSON.stringify(user);
        // console.log(userString)
        var userJson = JSON.parse(userString);
        console.log(userJson);
        var userTemp = data.userData()[0];
        if(req.body.email == userTemp.email && req.body.password == userTemp.password){

            var token = jwt.sign({
                id : userTemp.id,
                email : userTemp.email,
                name : userTemp.name
            }, cert,{ expiresIn: 60 * 60 * 60 * 60});

            console.log(token)

            var node = {
                success : true,
                token : token
            }

            res.json(node)
        }else{

            console.log("실패")
            var node = {
                success : false,
                token : null
            }
            res.json(node)
        }
    })
}