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

    describe('add_location', function() {

        describe('POST /api/trip/{id}/addLocation', function() {

            it('should store a new location', function(done) {
                request(server)
                    .post('/api/trip/fc36aa57-60c1-4de6-9746-26187b27ed7a/addLocation')
                    .type('form')
                    .send({'latitude': 51.037086, 'longitude': 13.778368})
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, res) {
                        if(err) {
                            return done(err);
                        }
                        return done();
                    });
            });

            it('should fail on missing latitude', function(done) {
                request(server)
                    .post('/api/trip/fc36aa57-60c1-4de6-9746-26187b27ed7a/addLocation')
                    .type('form')
                    .send({'longitude': 13.778368})
                    .set('Accept', 'application/json')
                    .expect(400)
                    .end(function(err, res) {
                        if(err) {
                            return done(err);
                        }
                        return done();
                    });
            });

            it('should fail on missing longitude', function(done) {
                request(server)
                    .post('/api/trip/fc36aa57-60c1-4de6-9746-26187b27ed7a/addLocation')
                    .type('form')
                    .send({'latitude': 51.037086})
                    .set('Accept', 'application/json')
                    .expect(400)
                    .end(function(err, res) {
                        if(err) {
                            return done(err);
                        }
                        return done();
                    });
            });

            it('should fail on unknown trip ID', function(done) {
                request(server)
                    .post('/api/trip/2740d2f7-ef39-44f9-abf6-84350e11313b/addLocation')
                    .type('form')
                    .send({'latitude': 51.037086, 'longitude': 13.778368})
                    .set('Accept', 'application/json')
                    .expect(500)
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
