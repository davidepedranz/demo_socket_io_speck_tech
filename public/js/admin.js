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

    var cats = ['box', 'cage', 'drank', 'eyes', 'fish', 'ninja', 'sleep', 'slippers', 'tied', 'walk'];
    var quotes = [
        {
            text: "The struggle you're in today is developing the strength you need for tomorrow.",
            author: "Unknown"
        },
        {
            text: "It doesn’t matter where you are, you are nowhere compared to where you can go.",
            author: "Bob Proctor"
        },
        {
            text: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci"
        },
        {
            text: "To be beautiful means to be yourself. You don't need to be accepted by others. You need to be yourself.",
            author: "Thich Nhat Hanh"
        },
        {
            text: "Do a little more of what you want to do every day, until your idea becomes what's real.",
            author: "Unknown"
        },
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "The Universe"
        },
        {
            text: "Your world is a living expression of how you are using—and have used—your mind.",
            author: "Nightingale"
        },
        {
            text: "Open your eyes, look within. Are you satisfied with the life you're living?",
            author: "Bob Marley"
        },
        {
            text: "A year from now you will wish you had started today.",
            author: "Karen Lamb"
        },
        {
            text: "Learn to enjoy every minute of your life. Be happy now. Don't wait for something outside of yourself to make you happy in the future.",
            author: "Unknown"
        },
        {
            text: "On your journey through life, make sure your biography has at least one extraordinary chapter.",
            author: "Unknown"
        }
    ];

    var $blue = $('.blue');
    var $green = $('.green');
    var $yellow = $('.yellow');
    var $red = $('.red');

    $blue.click(function () {
        var selected = cats[Math.floor(Math.random() * cats.length)];
        socket.emit('kitten', selected);
    });

    $green.click(function () {
        var quote = quotes[Math.floor(Math.random() * quotes.length)];
        socket.emit('quote', quote);
    });

    $yellow.click(function () {
        socket.emit('speck');
    });

    $red.click(function () {
        socket.emit('clean');
    });

});
