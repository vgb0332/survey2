module.exports = function(sequelize, DataTypes){

    var date = new Date();

    return sequelize.define('vehicles', {
      id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      bodyType : {
        type: DataTypes.STRING,
        allowNull: true
      },
      carType : {
        type: DataTypes.STRING,
        allowNull: true
      },
      colorExterior : {
        type: DataTypes.STRING,
        allowNull: true
      },
      colorInterior : {
        type: DataTypes.STRING,
        allowNull: true
      },
      cylinder : {
        type: DataTypes.STRING,
        allowNull: true
      },
      door : {
        type: DataTypes.STRING,
        allowNull: true
      },
      drivetrain : {
        type: DataTypes.STRING,
        allowNull: true
      },
      features : {
        type: DataTypes.STRING,
        allowNull: true
      },
      fuel : {
        type: DataTypes.STRING,
        allowNull: true
      },
      fuelEconomy : {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude : {
        type: DataTypes.STRING,
        allowNull: true
      },
      longitude : {
        type: DataTypes.STRING,
        allowNull: true
      },
      make : {
        type: DataTypes.STRING,
        allowNull: true
      },
      model : {
        type: DataTypes.STRING,
        allowNull: true
      },
      trim : {
        type: DataTypes.STRING,
        allowNull: true
      },
      subscriptionStart : {
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