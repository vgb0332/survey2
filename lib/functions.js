
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
        return Number(today.getFullYear())+'-'+Number(today.getMonth()+1)+'-'+Number(today.getDate())+" "+Number(today.getHours())+":"+Number(today.getMinutes());
    }

}
