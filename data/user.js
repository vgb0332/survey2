
/*
@20180510 THEMP DATA;
*/

const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

exports.userData = function(){

	return [{
	    id : '1',
	    email : "gunhee21@gmail.com",
	    password : "1234",
	    name : 'Poooding'
	}]

}

exports.getNow = () => {
	var today = new Date();
	var now = Number(today.getFullYear())+'-'+Number(today.getMonth()+1)+'-'+Number(today.getDate())+' '+Number(today.getHours())+':'+Number(today.getMinutes());
	return now;
}

exports.getRandomString = () => {

		var chars = "0123456789ABCDEFGHIJabcdefghijklmnKLMNOPQRSTUVWXTZ";
		var string_length = 20;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
		}
		//document.randform.randomfield.value = randomstring;
		return randomstring;

}

exports.cert = () => {
	return "asldjkhf12409uaslkjllkn23ADFSDFKJHVKJHKL<MNLKNKLJLKXCIOL98790218374LKZXmvlkasjdasdklj0-134lrn9fasldjkhf12409uaslkjllkn23ADFSDFKJHVKJHKL<MNLKNKLJLKXCIOL98790218374LKZXmvlkasjdasdklj0-134!@#!@#lrn9fasldjkhf12409uaslkjllkn23ADFSDFKJHVKJHKL<MNLKNKLJLKXCIOL98790218374LKZXaslaskldhjfklashjdolfjaosiur092834092384ulkhsdjlvmnzxc,mvnkszjdhfoqiw3yu09r8127304598uqwelkfnal,xmcnv,znxckvn2o398470w9d8g-89bpkwnm4,5merfgdf0-134!@#!@#lrn9fasldjkhf12409uaslkjllkn23ADFSDFKJHVKJHKL<NLKNKLJLKXCIOL98790218374LKZXmvlkasjdasdklj0-134!@#!@#lrn9fasldjkhf12409uaslkjllkn23ADFSDFKJHVKJHKL<MNLKNKLJLKXCIOL98790218374LKZXmvlkasjdasdklj0-134!@#!@#lrn9fasldjkhf12409uaslkjllkn23ADFSDFKJHVKJHKL<MNLKNKLJLKXCIOL98790218374LKZXmvlkasjdasdklj0-134!@#!@#lrn9fasldjkhf12409uaslkjllkn23ADFSDFKJHVKJHKL<MNLKNKLJLKXCIOL98790218374LKZXmvlkasjdasdklj0-134!@#!@#lrn9f";
}

exports.makePasswordToHash = async (p) =>{
	
	let result = {err : '',pass : '', salt : '', hash : ''}
	await hasher({password:p}, async (err, pass, salt, hash) => {
		console.log(salt);
		console.log(hash)
		return {
			salt : salt,
			hash : hash
		}
	});
	
	
}

exports.signupValidationCheck = (data) =>{
  let errors = {};

  if (Validator.isEmpty(data.USER_NICK)) {
    errors.USER_NICK = '닉네임: This field is required';
  }
  if (Validator.isEmpty(data.EMAIL)) {
    errors.EMAIL = 'EMAIL: This field is required';
  }
  if (!Validator.isEmail(data.EMAIL)) {
    errors.email = '이메일이 유효하지 않습니다';
  }
  if (Validator.isEmpty(data.PASSWORD)) {
    errors.password = 'PASSWORD: This field is required';
  }
//   if (Validator.isNull(data.passwordConfirmation)) {
//     errors.passwordConfirmation = 'This field is required';
//   }
//   if (!Validator.equals(data.password, data.passwordConfirmation)) {
//     errors.passwordConfirmation = 'Passwords must match';
//   }
//   if (Validator.isNull(data.timezone)) {
//     errors.timezone = 'This field is required';
//   }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
