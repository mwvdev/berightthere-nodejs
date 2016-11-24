'use strict';

var db = require('../../database');

module.exports = {
    checkout: checkout
};

function checkout(req, res) {
    var id = req.swagger.params.id.value;

    db.tripCheckout(id, function(err) {
        if(err) {
            return res.status(500).json({error: 'Failed to check out. Details: ' + err});
        }
        if(this.changes === 0) {
            return res.status(500).json({error: 'Failed to check out. Trip could not be found.'});
        }

        return res.status(200).end();
    });
}
