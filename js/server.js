"use strict"

var http = require('http');
var url = require('url');


function startServer(route, handle) {

    http.createServer(function (request, response) {

        var pathname = url.parse(request.url).pathname;
        route(pathname, handle, response, request);

    }).listen(40412);

    console.log("Server has started.");
};

exports.startServer = startServer;