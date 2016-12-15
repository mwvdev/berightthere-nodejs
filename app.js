'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var io = require('socket.io')();
app.io = io;

var SwaggerExpress = require('swagger-express-mw');

var db = require('./database');
var routes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

io.on('connection', function(socket) {
    socket.on('berightthere:subscribe', function(data) {
        socket.join(data.uuid);
    });

    socket.on('berightthere:syncRequest', function(data) {
        db.findLocations(data.uuid, function(err, locations) {
            if(!err) {
                socket.emit('berightthere:sync', locations);
            }
        })
    });
});

var config = {
    appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if(err) {
        throw err;
    }

    swaggerExpress.register(app);
});

module.exports = app;
