'use strict';

var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(':memory:');
db.serialize(function() {
    db.run('PRAGMA foreign_keys = ON;');
    db.run('CREATE TABLE trips (uuid TEXT PRIMARY KEY NOT NULL)');
    db.run('CREATE TABLE locations (uuid TEXT, latitude REAL, longitude REAL, occurred INTEGER, FOREIGN KEY(uuid) REFERENCES trips(uuid) )');
});

function tripCheckin(uuid, callback) {
    db.serialize(function() {
        var statement = db.prepare('INSERT INTO trips VALUES (?)', function(err) {
            if(err) {
                callback(err);
            }
            else {
                statement.run(uuid, callback);
                statement.finalize();
            }
        });
    });
}

function tripCheckout(uuid, callback) {
    db.serialize(function() {
        db.run('DELETE FROM locations WHERE uuid = (?)', uuid, callback);
    });
}

function storeLocation(uuid, latitude, longitude, callback) {
    db.serialize(function() {
        var occurred = Math.floor(Date.now() / 1000);
        db.run('INSERT INTO locations VALUES (?, ?, ?, ?)', [uuid, latitude, longitude, occurred], callback);
    });
}

function findLocations(uuid, callback) {
    var locations = [];

    function handleRow(err, row) {
        if(!err) {
            locations.push({lat: row.latitude, lng: row.longitude});
        }
    }

    function handleComplete(err, rowCount) {
        if(rowCount === 0) {
            return callback(new Error('Unknown UUID specified'));
        }

        return callback(err, locations);
    }

    db.each('SELECT latitude, longitude, occurred FROM locations WHERE uuid = ? ORDER BY occurred ASC', uuid, handleRow, handleComplete);
}

exports.raw = db;
exports.tripCheckin = tripCheckin;
exports.tripCheckout = tripCheckout;
exports.storeLocation = storeLocation;
exports.findLocations = findLocations;