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

  sequelize = new Sequelize('ushouse','ushouse01','ushouse', {
    host :'1.201.141.91',
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

db.places = sequelize.import(__dirname + '/model/places.js');



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
