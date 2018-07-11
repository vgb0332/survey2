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
      password : {
        type: DataTypes.STRING,
        allowNull: true
      },
      phonenumber : {
        type: DataTypes.STRING,
        allowNull: true
      },
      introQuestion : {
        type: DataTypes.STRING,
        defaultValue : 'no',
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