module.exports = function(sequelize, DataTypes){
  return sequelize.define('datas', {
    id: {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    tag : {
      type: DataTypes.STRING,
      allowNull: true
    },
    title : {
      type: DataTypes.STRING,
      allowNull: true
    },
    content : {
      type: DataTypes.STRING,
      allowNull: true
    },
    category : {
      //CODE or Snippet
      type: DataTypes.STRING,
      allowNull: true
    },
    date : {
      //CODE or Snippet
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