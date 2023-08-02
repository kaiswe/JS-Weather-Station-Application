'use strict'

var url = require('url');
var https = require('https');


function jsonHandler(response, request) {

    var weatherYear = url.parse(request.url).query;

    const file = weatherYear + '.json';

    const xmlURL = "https://www.it.murdoch.edu.au/~S900432D/ict375/data/" + file;

    https.get(xmlURL, function (res) {

        var jd = '';

        res.on('data', function (data) {

            jd += data;

        });

        res.on('end', function () {

            var obj = JSON.stringify(jd);

            var jsonData = JSON.parse(obj);

            response.writeHead(200, { 'Content-Type': 'application/json' });

            response.write(jsonData);

            response.end();

        });

    }).on("error", function () {

        console.log("Error could not find the specified JSON file");

    });

};

exports.jsonHandler = jsonHandler;