
var db = require('../db.js');

module.exports = {

    randomString : () => {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var string_length = 7;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
        }
        //document.randform.randomfield.value = randomstring;
        return randomstring;
    },
    getNowTimeFormat : () =>{
        let today = new Date();
        return Number(today.getFullYear())+'-'+Number(today.getMonth()+1)+'-'+Number(today.getDate())+" "+Number(today.getHours())+":"+Number(today.getMinutes());
    },
    getTimeFormat : (date) =>{
        let today = new Date(date);
        return Number(today.getFullYear())+'년 '+Number(today.getMonth()+1)+'월 '+Number(today.getDate())+"일 "+Number(today.getHours())+"시 "+Number(today.getMinutes())+'분';
    },
    save_log : async (UID, CONTENT) =>{

        let today = new Date();
        let logs = {
            UID : UID,
            CONTENT : CONTENT,
            CREATE_DATE : Number(today.getFullYear())+'-'+Number(today.getMonth()+1)+'-'+Number(today.getDate())+" "+Number(today.getHours())+":"+Number(today.getMinutes())
        }
        
        await db.LOGS.create(logs).then((err,result)=>{
            return {success : true}
        }).catch((err)=>{
            console.log("[히스토리 저장시 에러]")
            console.log(err);
            return {success : false}
        })
    },
    makeArray : (data) => {
        let resultArray = [];
        for(var rs in data){
          if(data.hasOwnProperty(rs)){
              //console.log(data[rs].dataValues)
            resultArray.push(data[rs].dataValues);
          }
        }
        return resultArray;
    },
    makeSpreadArray : (data) => {
        let resultArray = [];
        for(var rs in data){
          if(data.hasOwnProperty(rs)){
            resultArray.push(data[rs]);
          }
        }
        console.log(resultArray)
        return resultArray;
    }

}
