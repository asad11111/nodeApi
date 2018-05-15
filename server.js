
var express = require('express'),

  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
 
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
  });

  
var routes = require('./api/routes/todoListRoutes'); //importing route


routes(app); //register the route
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

  
app.listen(port);