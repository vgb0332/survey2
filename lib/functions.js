
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
    }

}
