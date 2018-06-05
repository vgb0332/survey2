var express = require('express');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');
var log4js = require('log4js');
var schedule = require('node-schedule');

var auth = require('./config/jwtValidator.js');


var storageRef;
// var storage = firebaseApp.storage();
var db = require('./db.js');
log4js.configure({
  appenders: {
    out : { type: 'console' },
    adminLog : { type: 'file', filename: 'logs/admin/admin.log',"maxLogSize": 1000000,"backups": 10},
    clientLog : { type: 'file', filename: 'logs/client/client.log',"maxLogSize": 1000000,"backups": 10}
  },
  categories : {
    admin : {appenders : ['adminLog'],level : 'info'},
    client : {appenders : ['clientLog'],level : 'info'},
    default : {appenders : ['adminLog','clientLog'],level : 'info'}
  }
});

var loggerAdmin = log4js.getLogger('admin');
var loggerClient = log4js.getLogger('client');
// var Strategy = require('passport-facebook').Strategy;
var _ = require('underscore');

var port = process.env.PORT || 3005;
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mysql = require('mysql');
var gm = require('gm');

// AWS.config.region = 'ap-northeast-2';
var fs = require('fs');

var cors = require('cors')
var app = express();

const corsOptions = {
  origin: 'http://localhost:8020',
  credentials: true,

}
app.use(cors(corsOptions))

app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:9000', 'http://localhost:9000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
// Configure view engine to render EJS templates.
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.locals.moment = require('moment');

app.use('/public',express.static(__dirname + '/public'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(bodyParser({uploadDir:'./uploads'}));
app.use(require('express-session')(
	{
	     secret: 'keyboard cat',
	     resave: true,
	     saveUninitialized: true,
	     cookie : {
 		       maxAge: 1000*60*60*60
	    }
	}
));

app.enable('trust proxy');


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



require('./router/client/mainRoutes.js')(app,auth,loggerClient);
require('./router/client/authRoutes.js')(app,auth,loggerClient);
require('./router/client/blockRoutes.js')(app,auth,loggerClient);
require('./router/client/imageRoutes.js')(app,auth,loggerClient);



app.use(function(req, res, next) {

  res.status(400);
  res.render('404page');
  // res.send("오류페이지")
});
db.sequelize.sync({ force: false }).then(function() {
  app.listen(port, function() {
      console.log('server listening on port: '+ port);
  });
});
