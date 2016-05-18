'use strict';

// load modules
const http = require('http');
const express = require('express');
const socket = require('socket.io');

// loggers
const debugClient = require('debug')('demo:client');
const debugCommand = require('debug')('demo:command');

// create an express app to serve the static files in the 'public' folder
var app = express();
app.use(express.static('public'));

// create http server
var httpServer = http.createServer(app);

// attach socket.io to the express server
var io = socket().listen(httpServer);


// when a client connects -> push the last available data
io.on('connect', function (socket) {

    // a new client connected
    debugClient('Connected: ' + socket.id);

    // log disconnections
    socket.on('disconnect', function () {
        debugClient('Disconnected: ' + socket.id);
    });

    // very secure... more or less
    // whenever somebody pushes a new event, broadcast it to everybody
    var forward = function (name) {
        socket.on(name, function (message) {
            debugCommand(name + ' -> ' + JSON.stringify(message));
            io.emit(name, message);
        });
    };

    // messages to forward to everybody
    ['kitten', 'quote', 'speck', 'clean'].forEach(forward);
});


// run the server
var httpPort = process.env.PORT || 8080;
httpServer.listen(httpPort, function () {
    console.log('HTTP server listening at port %d', httpPort);
});
