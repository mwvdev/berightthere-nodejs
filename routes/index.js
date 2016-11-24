'use strict';

var express = require('express');
var router = express.Router();

var config = require('../config');

router.get('/', function(req, res, next) {
    var uuid = req.query.uuid;
    if(!uuid) {
        return next(new Error('Invalid UUID specified'));
    }

    var db = require('../database');
    db.findLocations(uuid, function(err, locations) {
        if(err) {
            return next(err);
        }

        return res.render('index', {
            title: 'Be right there',
            uuid: JSON.stringify(uuid),
            googleMapsKey: config.googleMapsKey,
            locations: JSON.stringify(locations)
        });
    });
});

module.exports = router;
