require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
 var port = process.env.PORT || 3000 ;
  var mongoose = require('mongoose');
  
  Task = require('./api/models/todoListModel'); //created model loading here
  bodyParser = require('body-parser');
 
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
  });

  
var routes = require('./api/routes/todoListRoutes'); //importing route

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
  secret: config.secret,
  getToken: function (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
          return req.query.token;
      }
      return null;
  }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

// routes
app.use('/users', require('./api/controllers/users.controller'));
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      res.status(401).send('Invalid Token');
  } else {
      throw err;
  }
});


routes(app); //register the route
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

  var routes = require('./api/routes/todoListRoutes'); //importing route
  routes(app); //register the route


app.listen(port);