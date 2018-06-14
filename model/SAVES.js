module.exports = function(sequelize, DataTypes){
    return sequelize.define('SAVES', {
      ID: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      //이슈 블럭인지 답글블럭인지 구별
      //issue or reply
      FLAG : {
        type: DataTypes.STRING,
        allowNull: true
      },
      UID : {
        type: DataTypes.STRING,
        allowNull: true
      },
      PPID : {
        type: DataTypes.STRING,
        allowNull: true
      },
      PID : {
        type: DataTypes.STRING,
        allowNull: true
      },
      SHOW : {
        type: DataTypes.STRING,
        defaultValue : 'SHOW',
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
      BLOCK_ISSUE_HASHTAG : {
        type: DataTypes.STRING,
        allowNull: true
      },
      BLOCK_ISSUE_CONTENT : {
        type: DataTypes.STRING,
        allowNull: true
      },
      BLOCK_ISSUE_IMAGE : {
        type: DataTypes.STRING,
        defaultValue : 'https://s3.ap-northeast-2.amazonaws.com/maemistore/image/space01.jpg',
        allowNull: true
      },
      BLOCK_ISSUE_VIDEO : {
        type: DataTypes.STRING,
        allowNull: true
      },
      BLOCK_ISSUE_LOCATION : {
        type: DataTypes.STRING,
        allowNull: true
      },
      CREATE_DATE: {
        type: DataTypes.STRING,
        allowNull: true
      },
      UPDATE_DATE: {
        type: DataTypes.STRING,
        allowNull: true
      },
      VOTE_UP: {
        type: DataTypes.STRING,
        defaultValue : '0',
        allowNull: true
      },
      VOTE_DOWN: {
        type: DataTypes.STRING,
        defaultValue : '0',
        allowNull: true
      },
      VIEWS: {
        type: DataTypes.STRING,
        defaultValue : '0',
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
  