var jwt = require('jsonwebtoken');
var data = require('../data/user');
// import User from '../models/user';
const jwtSecret = data.cert();
var compose = require('composable-middleware');

function authMiddleWare(){
  return compose().use((req,res,next)=>{
      const authorizationHeader = req.headers['authorization'];
      let token;
      console.log(authorizationHeader)
      if (authorizationHeader) {
          token = authorizationHeader.split(' ')[1];
      }

      if (token) {
          jwt.verify(token,jwtSecret, (err, decoded) => {
            if (err) {
              res.send("FailedAthenticate")
            } else {
                console.log("통과!")
                next();
            }
          });
      } else {
          res.send("NoToken")
      }
  })
}

exports.authMiddleWare = authMiddleWare;

// exports.authMiddleWare = function(req, res, next){

//   const authorizationHeader = req.headers['authorization'];
//   let token;
//   console.log(authorizationHeader)
//   if (authorizationHeader) {
//     token = authorizationHeader.split(' ')[1];
//   }

//   if (token) {
//     jwt.verify(token,jwtSecret, (err, decoded) => {
//       if (err) {
//         res.status(401).json({ error: 'Failed to authenticate' });
//       } else {
//           console.log("통과!")
//           next();
//       }
//     });
//   } else {
//     res.status(403).json({
//       error: 'No token provided'
//     });
//   }
// }