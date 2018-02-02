module.exports = function(sequelize, DataTypes){

  var date = new Date();
  
  return sequelize.define('users', {
    id: {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email : {
      type: DataTypes.STRING,
      allowNull: true
    },
    password : {
      type: DataTypes.STRING,
      allowNull: true
    },
    name : {
      type: DataTypes.STRING,
      allowNull: true
    },
    loginDate : {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt : {
      type: DataTypes.STRING,
      defaultValue : date,
      allowNull: true
    },
    updatedAt : {
      type: DataTypes.STRING,
      defaultValue : date,
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