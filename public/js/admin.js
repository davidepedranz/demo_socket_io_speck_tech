$(function () {
    'use strict';

    /////////////////////////////////////////////////////////////////////
    // DOM manipulation functions
    /////////////////////////////////////////////////////////////////////

    var $loading = $('.loading');
    var $console = $('.content');

    function showLoading() {
        $console.hide();
        $loading.show();
    }

    function showContent() {
        $loading.hide();
        $console.show();
    }

    /////////////////////////////////////////////////////////////////////
    // Socket.IO section
    /////////////////////////////////////////////////////////////////////

    // create socket.io instance
    var socket = io();

    // connected to the server
    socket.on('connect', function () {
        showContent();
    });

    // disconnected (eg. problems with the connection to the server)
    socket.on('disconnect', function () {
        showLoading();
    });


    /////////////////////////////////////////////////////////////////////
    // Commands
    /////////////////////////////////////////////////////////////////////

    var $blue = $('.blue');
    var $green = $('.green');
    var $yellow = $('.yellow');
    var $red = $('.red');

    $blue.click(function () {
        socket.emit('command', 'blue');
    });

    $green.click(function () {
        socket.emit('command', 'green');
    });

    $yellow.click(function () {
        socket.emit('command', 'yellow');
    });

    $red.click(function () {
        socket.emit('command', 'red');
    });

});
