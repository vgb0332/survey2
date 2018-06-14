module.exports = function(sequelize, DataTypes){

  var date = new Date();
  
  return sequelize.define('USERS', {
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
    EMAIL : {
      type: DataTypes.STRING,
      allowNull: true
    },
    USER_NAME : {
      type: DataTypes.STRING,
      allowNull: true
    },
    USER_NICK : {
      type: DataTypes.STRING,
      allowNull: true
    },
    USER_IMAGE : {
      type: DataTypes.STRING,
      allowNull: true
    },
    USER_DESCRIPTION : {
      type: DataTypes.STRING,
      allowNull: true
    },
    PASSWORD : {
      type: DataTypes.STRING,
      allowNull: true
    },
    SALT : {
      type: DataTypes.STRING,
      allowNull: true
    },
    LOGIN_DATE : {
      type: DataTypes.STRING,
      allowNull: true
    },
    POINT : {
      type: DataTypes.STRING,
      allowNull: true
    },
    FOLLOW_COUNT : {
      type: DataTypes.STRING,
      defaultValue: '0',
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