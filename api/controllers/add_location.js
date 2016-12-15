'use strict';

var db = require('../../database');

module.exports = {
    addLocation: addLocation
};

function addLocation(req, res) {
    var id = req.swagger.params.id.value;
    var latitude = req.swagger.params.latitude.value;
    var longitude = req.swagger.params.longitude.value;

    function generateError() {
        return 'Failed to store location (UUID: ' + id + ', latitude: ' + latitude + ', longitude: ' +
            longitude + ').';
    }

    db.storeLocation(id, latitude, longitude, function(err) {
        if(err) {
            return res.status(500).json({message: generateError() + ' Details:' + err});
        }
        if(this.changes === 0) {
            return res.status(500).json({message: generateError()});
        }

        var location = {lat: latitude, lng: longitude};
        req.app.io.to(id).emit('berightthere:newLocation', location);

        return res.status(200).end();
    });
}
