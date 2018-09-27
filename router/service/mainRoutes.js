var jwt = require('jsonwebtoken');
var db = require('../../db.js');
var middleware = require('../../middlewares/authenticate.js');
const data = require('../../data/user');
const multiparty = require('multiparty');
var responseHelper = require('../../lib/responseHelper')
var functions = require('../../lib/functions')
var FileUpload = require('../../lib/aws/fileUpload');
var json2xls = require('json2xls');
var fs = require("fs");
var introLabels = fs.readFileSync("intro.json");
var mainLabels = fs.readFileSync("main.json");

module.exports = (app,logger)=>{
  	app.use(json2xls.middleware);
    //메인 질문 페이지
    app.get("/main", async (req,res)=>{
      res.render('client/main');
    })

    app.get("/getData", async (req,res)=>{

      if(req.session.phonenumber){
        let data = await db.mainQuestions.findAll({where : {phonenumber : req.session.phonenumber}}).then((result)=>{
          return functions.makeArray(result);
        })
        console.log(data);
        res.send({
          success : 200,
          data : data
        })
      }else{
        res.send({
          success : 400
        })
      }

    })

    app.post("/main", async (req,res)=>{
      console.log(req.body)
      req.body.data.phonenumber = req.session.phonenumber;
      await db.mainQuestions.create(req.body.data).then((result)=>{
        res.send({
          succes : 200,
          message : "저장 완료"
        })
      })
    })

    app.put("/main", async (req,res)=>{
      await db.mainQuestions.update(req.body.data,{
        where : {
          id : req.body.id,
          phonenumber :req.session.phonenumber
        }
      });
      res.send({
        succes : 200,
        message : "변경 완료"
      })
    })

    app.delete("/main", async (req,res)=>{
        await db.mainQuestions.destroy({
          where : {
            id : req.body.id
          }
        })

        res.send({
          succes : 200,
          message : "삭제 완료"
        })
    })

    app.get("/downloadUser", async (req,res)=>{

      let data = await db.users.findAll().then((result)=>{
        return functions.makeArray(result);
      });
      let allData = [];
      console.log(data);
      for(var i=0; i<data.length; i++){
        let tempData = {
          "No" : data[i].id,
          "휴대폰번호" : data[i].phonenumber,
          "이름" : data[i].name
        }
        allData.push(tempData);
      }
      res.xls('data.xlsx', allData);
    })

    app.get("/downloadIntro", async (req,res)=>{

      let data = await db.introQuestions.findAll().then((result)=>{
        return functions.makeArray(result);
      });
      let allData = [];

      var labels = JSON.parse(introLabels);

      for(var i=0; i<data.length; i++){
        let tempData = {
          "No" : data[i].id,
          "휴대폰번호" : data[i].phonenumber,
          "이름" : data[i].name,
        }

        for ( key  in data[i] ) {
          if(labels[key]){
            var label = labels[key];
            tempData[label] = data[i][key];
          }
        }
        allData.push(tempData);
      }
      res.xls('data.xlsx', allData);
    })

    app.get("/downloadMain", async (req,res)=>{
      //건희야 agitation 항목 없애도 된다
      let data = await db.mainQuestions.findAll().then((result)=>{
        return functions.makeArray(result);
      });
      let allData = [];

      var labels = JSON.parse(mainLabels);

      for(var i=0; i<data.length; i++){
        let tempData = {
          "No" : data[i].id,
          "휴대폰번호" : data[i].phonenumber,
          "이름" : data[i].name
        }

        for ( key  in data[i] ) {
          if(labels[key]){
            var label = labels[key];
            if(key == 'startTime' || key == 'endTime'){
              let timeFormat = functions.getTimeFormat(data[i][key]);
              tempData[label] = timeFormat;
            }else{
              tempData[label] = data[i][key];
            }
            
          }
        }

        allData.push(tempData);
      }
      res.xls('data.xlsx', allData);
    })



}
