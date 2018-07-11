module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('mainQuestions', {
      id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      uid : {
        type: DataTypes.STRING,
        allowNull: true
      },
      phonenumber : {
        type: DataTypes.STRING,
        allowNull: true
      },
      day : {
        type: DataTypes.STRING,
        allowNull: true
      },
      startTime : {
        type: DataTypes.STRING,
        allowNull: true
      },
      endTime : {
        type: DataTypes.STRING,
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
      depression : {
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