// Load modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');


// Declare internals

var internals = {
    errors: []
};


exports.init = internals.init = function (port, callback) {

    var server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, function (err) {

        Hoek.assert(!err, err);
        internals.errors.push(err);
        server.start(function (err) {

            Hoek.assert(!err, err);
            internals.errors.push(err);
            callback(internals.errors, server);
        });
    });
};
