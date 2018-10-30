module.exports = function(sequelize, DataTypes){

    var date = new Date();

    return sequelize.define('introQuestions', {
      id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      phonenumber : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question1 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question2 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question3 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question4 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question5 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question6 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question7 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question8 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question9 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question10 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question11 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question12 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question13_1 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question13_2 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question13_3 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_a : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_b : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_b_i1 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_b_i2 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_c : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_c_i1 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_c_i2 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_d : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_d_i1 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_d_i2 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_e : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_e_i1 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question14_e_i2 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question15_1 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question15_2 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question16_1 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question16_2 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question17_1 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question17_2 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question18 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question19 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question20 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question21 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question22 : {
        type: DataTypes.STRING,
        allowNull: true
      },
      question23 : {
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
