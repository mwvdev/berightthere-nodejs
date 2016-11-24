'use strict';

var assert = require('assert');
var request = require('supertest');
var validator = require('validator');

var server = require('../../../app');
var database = require('../helpers/bootstrap_database');

describe('controllers', function() {

    beforeEach(function(done) {
        database.prepare(done);
    });

    afterEach(function(done) {
        database.clean(done);
    });

    describe('checkin', function() {

        describe('GET /api/trip/checkin', function() {

            it('should respond with valid UUID', function(done) {
                function validUUID(res) {
                    assert.ok(res.body);
                    assert.ok(res.body.uuid, 'server should respond with a UUID object');
                    assert.ok(validator.isUUID(res.body.uuid), 'server should respond with valid UUID');
                }

                request(server)
                    .get('/api/trip/checkin')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(validUUID)
                    .end(function(err, res) {
                        if(err) {
                            return done(err);
                        }
                        return done();
                    });
            });

        });

    });

});
