const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const db = require('../db.js');
const aes256 = require('nodejs-aes256');

module.exports = function(passport){

	passport.serializeUser(function(user,cb) {
	  console.log("serializeUser : "+user);
	  cb(null, user);
	});

	passport.deserializeUser(function(obj,cb) {
	  console.log("deserializeUser : "+obj);
	  cb(null, obj);
	});

	passport.use(new LocalStrategy({
        usernameField : 'phonenumber',
        passwordField : 'password',
        passReqToCallback : true
    }
    ,function(req,phonenumber, password, done) {

        var shasum = crypto.createHash('sha1');
	    shasum.update(password);
		var ePass = shasum.digest('hex');
		
		console.log(useremail);
		console.log(password)
        
    	db.SCM_C_USERS.findOne({where : {C_EMAIL : useremail, C_PASSWORD : ePass }}).then(function(user){
			console.log(user)
    	  	if(user)
    	  	{
    	  		 console.log("user :-> "+user);
	    	     console.log("user.dataValues :->"+user.dataValues);
	    	     //dataValues 뽑아 내서 값 비교후 넘기기
		         		var userInfo = {

                            'C_CODE' : user.dataValues.C_CODE,
                            'C_AUTH_ID' : user.dataValues.C_AUTH_ID,
                            'C_AUTH_RANGE' : user.dataValues.C_AUTH_RANGE,
                            'C_GRADE' : user.dataValues.C_GRADE,
                            'C_NAME' : user.dataValues.C_NAME,
                            'C_CONTACT01' : user.dataValues.C_CONTACT01,
                            'C_CONTACT02' : user.dataValues.C_CONTACT02,
                            'C_EMAIL' : user.dataValues.C_EMAIL,
                            'C_MANAGER' : user.dataValues.C_MANAGER,
                            'C_MANAGER_CONTACT' : user.dataValues.C_MANAGER_CONTACT,
                            'C_ADDRESS' : user.dataValues.C_ADDRESS,
                            'C_LICENSE_NUMBER' : user.dataValues.C_LICENSE_NUMBER,
                            'C_INFO' : user.dataValues.C_INFO,
                            'C_SITE' : user.dataValues.C_SITE,
                            'C_REGIST_DATE' : user.dataValues.C_REGIST_DATE
			         	}
			        
		            return done(null,userInfo);
    	  	}
    	  	else
    	  	{
    	  		return done(null,false);
    	  	}
    	  });
	    }
	));

}
