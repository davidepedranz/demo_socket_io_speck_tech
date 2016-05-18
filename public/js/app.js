$(function () {
    'use strict';

    /////////////////////////////////////////////////////////////////////
    // Socket.IO section
    /////////////////////////////////////////////////////////////////////

    // create socket.io instance
    var socket = io();

    // connected to the server
    socket.on('connect', function () {
        console.log('connect');
    });

    // disconnected (eg. problems with the connection to the server)
    socket.on('disconnect', function () {
        console.log('disconnect');
        showLoading();
    });

    // commands
    socket.on('kitten', showKitten);
    socket.on('quote', showQuote);
    socket.on('speck', showSpeck);
    socket.on('clean', showClean);

    /////////////////////////////////////////////////////////////////////
    // DOM manipulation functions
    /////////////////////////////////////////////////////////////////////

    var $loading = $('.loading');
    var $content = $('.content');

    var $image = $content.find('.image');
    var $quote = $content.find('.quote');
    var $quoteText = $quote.find('.quote-text');
    var $quoteAuthor = $quote.find('.quote-author');

    function showLoading() {
        $content.hide();
        $loading.show();
    }

    function showContent() {
        $loading.hide();
        $content.show();
    }

    // change the picture
    function showKitten(kitten) {
        showContent();

        $image.show();
        $image.attr('src', 'img/cats/' + kitten + '.png');
    }

    // change the quote
    function showQuote(quote) {
        showContent();

        $quote.show();
        $quoteText.text(quote.text);
        $quoteAuthor.text(quote.author);
    }

    // show the speck picture
    function showSpeck() {
        showContent();

        $image.show();
        $image.attr('src', 'img/speck.jpg');

        $quoteText.text('This is a speck');
        $quoteAuthor.text('Somebody of the public');
    }

    function showClean() {
        showLoading();

        $image.hide();
        $quote.hide();
    }

});
