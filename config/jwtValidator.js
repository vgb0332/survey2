var url = require('url');
var compose = require('composable-middleware');
const data = require('../data/user');
var responseHelper = require('../lib/responseHelper');
var jwt = require('jsonwebtoken');

function authCheck(range) {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            
           

            if(range == 'all'){
                console.log("[전체 접근 가능]")
                next();
            }else{
                console.log("[특정인만 접근 가능]")
                var pathName = url.parse(req.url).pathname;
                console.log(pathName);
                console.log(range)
                let token = req.body.TOKEN;
                
                console.log("[pass token]");
                console.log(token);
                if(token == undefined) token = 'error';
    
                try {
                    let decoded = jwt.verify(token, data.cert());
                    console.log("[pass token decode]");
                    console.log(decoded);
                    
                    next();
                } catch(err) {
                    // err
                    console.log("[pass token error]");
                    console.log(err);
                    res.send({success : false, message : 'token이 유효하지 않습니다'})
                }
            }
           
  
  
  
        });
  }
  
  
  
  exports.authCheck = authCheck;