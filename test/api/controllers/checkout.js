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

    describe('checkout', function() {

        describe('DELETE /api/trip/{id}', function() {

            it('should delete an existing trip', function(done) {
                request(server)
                    .del('/api/trip/fc36aa57-60c1-4de6-9746-26187b27ed7a')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, res) {
                        if(err) {
                            return done(err);
                        }
                        return done();
                    });
            });

            it('should throw an error on a non-existing UUID', function(done) {
                request(server)
                    .del('/api/trip/2740d2f7-ef39-44f9-abf6-84350e11313b')
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
