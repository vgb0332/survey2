module.exports = function(sequelize, DataTypes){
  return sequelize.define('BLOCK_ISSUES', {
    ID: {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    UID : {
      type: DataTypes.STRING,
      allowNull: true
    },
    BLOCK_ISSUE_THEME : {
      type: DataTypes.STRING,
      allowNull: true
    },
    BLOCK_ISSUE_CATEGORY : {
      type: DataTypes.STRING,
      allowNull: true
    },
    BLOCK_ISSUE_CONTENT : {
      type: DataTypes.STRING,
      allowNull: true
    },
    BLOCK_ISSUE_IMAGE : {
      type: DataTypes.STRING,
      defaultValue : 'no',
      allowNull: true
    },
    CREATE_DATE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    OPTION01 : {
      type: DataTypes.STRING,
      allowNull: true
    },
    OPTION02 : {
      type: DataTypes.STRING,
      allowNull: true
    }
    
  });
}
