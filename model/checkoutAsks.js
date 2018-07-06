module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('checkoutAsks', {
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
      name : {
        type: DataTypes.STRING,
        allowNull: true
      },
      email : {
        type: DataTypes.STRING,
        allowNull: true
      },
      phonenumber : {
        type: DataTypes.STRING,
        allowNull: true
      },
      theme : {
        type: DataTypes.STRING,
        allowNull: true
      },
      checkout_date : {
        type: DataTypes.STRING,
        allowNull: true
      },
      message : {
        type: DataTypes.STRING,
        allowNull: true
      },
      request_date : {
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