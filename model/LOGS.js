module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('LOGS', {
      ID: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      UID : {
        type: DataTypes.STRING,
        defaultValue : 'null',
        allowNull: true
      },
      CONTENT : {
        type: DataTypes.STRING,
        allowNull: true
      },
      CREATE_DATE : {
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