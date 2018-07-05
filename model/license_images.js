module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('license_images', {
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
      //front or backend
      position : {
        type: DataTypes.STRING,
        allowNull: true
      },
      license_image : {
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