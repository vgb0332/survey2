var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var data = require('../../data/user');
var cert = data.cert();



module.exports = function(app,logger){


    app.post("/client/login",(req,res)=>{
        // // console.log(req.body);
        // var user = req.body;
        // var userString = JSON.stringify(user);
        // // console.log(userString)
        // var userJson = JSON.parse(userString);
        // console.log(userJson);
        // var userTemp = data.userData()[0];
        console.log("로그인 영역 입장")
        db.users.findOne({where : {email : req.body.email}}).then((result)=>{
           
            if(result){
                const userData = result.dataValues;
                console.log("로그인 한 사용자");
                console.log(userData);
                console.log(req.body);
                if(req.body.password == userData.password){

                    var token = jwt.sign({
                        id : userData.id,
                        email : userData.email,
                        name : userData.name
                    }, cert,{ expiresIn: 60 * 60 * 60 * 60});

                    console.log(token)

                    var node = {
                        success : true,
                        token : token,
                        message : "Login success"
                    }

                    res.json(node)
                }else{

                    console.log("비밀번호 불일치")
                    var node = {
                        success : false,
                        token : null,
                        message : "Email and password not matched"
                    }
                    res.json(node)
                }

            }else{

                console.log("데이터 노존재")
                var node = {
                    success : false,
                    token : null,
                    message : "There is no account\nPlz check you email"
                }
                res.json(node)


            }
            
        })
        
    })
}