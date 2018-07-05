module.exports = function(sequelize, DataTypes){

  var date = new Date();
  
  return sequelize.define('users', {
    id: {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name : {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone : {
      type: DataTypes.STRING,
      allowNull: true
    },
    email : {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt : {
      type: DataTypes.STRING,
      allowNull: true
    },
    password : {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthYear : {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthMonth : {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthDay : {
      type: DataTypes.STRING,
      allowNull: true
    },
    subscriptionType : {
      type: DataTypes.STRING,
      allowNull: true
    },
    licenseFront : {
      type: DataTypes.STRING,
      allowNull: true
    },
    licenseBack : {
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