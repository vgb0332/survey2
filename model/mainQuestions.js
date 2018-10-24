module.exports = function(sequelize, DataTypes){

    var date = new Date();
    var moment = require('moment-timezone');

    return sequelize.define('mainQuestions', {
      id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      _id: {
        type : DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      phonenumber : {
        type: DataTypes.STRING,
        allowNull: true
      },
      //첫쨋날, 둘쨋날
      day : {
        type: DataTypes.STRING,
        allowNull: true
      },
      color : {
        type: DataTypes.STRING,
        allowNull: true
      },
      textColor : {
        type: DataTypes.STRING,
        allowNull: true
      },
      startTimeFormat : {
        type: DataTypes.STRING,
        allowNull: true
      },
      endTimeFormat : {
        type: DataTypes.STRING,
        allowNull: true
      },
      startTime : {
        type: DataTypes.DATE,
        allowNull: true
      },
      endTime : {
        type: DataTypes.DATE,
        allowNull: true
      },
      title : {
        type: DataTypes.STRING,
        allowNull: true
      },
      anger : {
        type: DataTypes.STRING,
        allowNull: true
      },
      anxiety : {
        type: DataTypes.STRING,
        allowNull: true
      },
      agitation : {
        type: DataTypes.STRING,
        allowNull: true
      },
      fatigue : {
        type: DataTypes.STRING,
        allowNull: true
      },
      happy : {
        type: DataTypes.STRING,
        allowNull: true
      },
      location : {
        type: DataTypes.STRING,
        allowNull: true
      },
      satisfation : {
        type: DataTypes.STRING,
        allowNull: true
      },
      option01 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      option02 : {
        type: DataTypes.STRING,
        allowNull: true
      }

    });
  }
