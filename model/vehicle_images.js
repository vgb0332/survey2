module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('vehicle_images', {
      id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      vid : {
        type: DataTypes.STRING,
        allowNull: true
      },
      image : {
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