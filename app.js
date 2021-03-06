
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var routes = require('./router');

var app = express();
require('./app_config/express')(__dirname, app);

var Sequelize = require('sequelize');
// Since this is a personal web server not meant to scale, we use SQLite
var sequelize = new Sequelize('database_' + app.get('env'), 'username', 'password', {
    dialect: 'sqlite',
    storage: 'persist/' + app.get('env') + '.sqlite'
});

// Set up Passport for authentication
require('./app_config/passport')(__dirname, sequelize);

// Set up routes
routes.route(app, sequelize);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
