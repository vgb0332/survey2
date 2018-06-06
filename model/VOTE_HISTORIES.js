module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('VOTE_HISTORIES', {
      ID: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      UID : {
        type: DataTypes.STRING,
        allowNull: true
      },
      PID : {
        type: DataTypes.STRING,
        allowNull: true
      },
      POINT : {
        type: DataTypes.STRING,
        allowNull: true
      },
      OPTION01 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      OPTION02 : {
        type: DataTypes.STRING,
        allowNull: true
      }
      
    });
  }