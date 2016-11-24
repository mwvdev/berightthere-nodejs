'use strict';

var db = require('../../../database');

var testUuid = 'fc36aa57-60c1-4de6-9746-26187b27ed7a';
var locations = [
    {latitude: 51.050409, longitude: 13.737262, occurred: 1479411037},
    {latitude: 51.049161, longitude: 13.745195, occurred: 1479411127},
    {latitude: 51.046085, longitude: 13.754872, occurred: 1479411137}
];

function clean(callback) {
    db.raw.serialize(function() {
        db.raw.run('DELETE FROM locations');
        db.raw.run('DELETE FROM trips', callback);
    });
}

function prepare(callback) {
    db.raw.serialize(function() {
        db.raw.run('INSERT INTO trips VALUES (?)', testUuid);
        var stmt = db.raw.prepare("INSERT INTO locations VALUES (?, ?, ?, ?)");
        for(var locationIndex = 0; locationIndex < locations.length; locationIndex++) {
            stmt.run(testUuid, locations[locationIndex].latitude, locations[locationIndex].longitude, locations[locationIndex].occurred);
        }
        stmt.finalize(callback);
    });
}

module.exports = {
    clean: clean,
    prepare: prepare
};
