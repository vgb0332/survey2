module.exports = function(sequelize, DataTypes){

    var date = new Date();
    
    return sequelize.define('options', {
      id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      place_code : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_shape : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_address : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_x : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_y : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_structure : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_floor : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_width : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_fee : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_feature : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_regist_date : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_status : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_checkin : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_checkout : {
        type: DataTypes.STRING,
        allowNull: true
      },
      place_pre_checkout_ : {
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