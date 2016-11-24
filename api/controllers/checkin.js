'use strict';

var uuid = require('uuid');

var db = require('../../database');

module.exports = {
    checkin: checkin
};

function checkin(req, res) {
    var tripUuid = uuid.v4();

    db.tripCheckin(tripUuid, function(err) {
        if(err) {
            console.error('Failed to check in using: ' + tripUuid + '. Details:');
            console.error(err);

            return res.status(500).json({message: 'Failed to check in. See server log for details.'});
        }

        return res.json({uuid: tripUuid});
    });
}
