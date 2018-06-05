var url = require('url');
var compose = require('composable-middleware');
const data = require('../data/user');
var responseHelper = require('../lib/responseHelper');
var jwt = require('jsonwebtoken');
function authCheck() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
  
            let token = req.body.TOKEN;
            console.log("[pass token]");
            console.log(token);

            try {
                var decoded = jwt.verify(token, data.cert());
                console.log("[pass token decode]");
                console.log(decoded);
                next();
            } catch(err) {
                // err
                console.log("[pass token error]");
                console.log(err);
                responseHelper.err_send(401,'BLOCK CREATE ERROR(권한이 없습니다)', res);
            }
  
  
  
        });
  }
  
  
  
  exports.authCheck = authCheck;