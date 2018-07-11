var Sequelize = require('sequelize');

// if running on Heroku, env = "production", otherwise it will be "development"
var env = process.env.NODE_ENV || 'development';
var sequelize;


if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresl',
  });
}else {

  /*

  HOST 가 막혔을 떄
  INSERT INTO mysql.user (host,user,authentication_string,ssl_cipher, x509_issuer, x509_subject) VALUES ('111.222.%','root',password('패스워드'),'','','');
  GRANT ALL PRIVILEGES ON *.* TO 'root'@'111.222.%';

  iptables -I INPUT -p tcp --dport 3306 -m state --state NEW,ESTABLISHED -j ACCEPT

  iptables -I OUTPUT -p tcp --sport 3306 -m state --state ESTABLISHED -j ACCEPT

  show variables like 'skip_networking';

출처: http://bryan7.tistory.com/428 [민서네집]


    sequelize = new Sequelize('hotel','hotel','dprhotel', {
    host :'hotel.cq4818dpp8x6.ap-northeast-2.rds.amazonaws.com',
    dialect : 'mysql',
    port : 3306,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true
   }
  root
  rlarjsgml
  });
  */

  sequelize = new Sequelize('survey','survey','survey2018', {
    host :'survey.cgztrrgzxvdq.us-east-2.rds.amazonaws.com',
    dialect : 'mysql',
    port : 3306,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true
   }
  });
}

var db = {};

db.mainQuestions = sequelize.import(__dirname + '/model/mainQuestions.js');
db.introQuestions = sequelize.import(__dirname + '/model/introQuestions.js');
db.users = sequelize.import(__dirname + '/model/users.js');




db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
