module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('introQuestions', {
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
      datas : {
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