module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('services', {
      id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      service_name : {
        type: DataTypes.STRING,
        allowNull: true
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
      content : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_code : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_name : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_address : {
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