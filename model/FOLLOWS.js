module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('FOLLOWS', {
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
      FID : {
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