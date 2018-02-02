var Sequelize = require('sequelize');

// if running on Heroku, env = "production", otherwise it will be "development"
var env = process.env.NODE_ENV || 'development';
var sequelize;


if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresl',
  });
}else {
  // sequelize = new Sequelize('hotel','hotel','dprhotel', {
  //   host :'hotel.cq4818dpp8x6.ap-northeast-2.rds.amazonaws.com',
  //   dialect : 'mysql',
  //   port : 3306,
  //   define: {
  //     charset: 'utf8',
  //     collate: 'utf8_general_ci',
  //     timestamps: true
  //  }
  //root
  //rlarjsgml
  // });
  sequelize = new Sequelize('pooodingDev','root','rlarjsgml', {
    host :'52.79.220.217',
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

db.users = sequelize.import(__dirname + '/model/users.js');
db.datas = sequelize.import(__dirname + '/model/datas.js');


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
