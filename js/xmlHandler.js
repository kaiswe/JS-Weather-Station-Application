'use strict'

var url = require('url');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({ explicitArray: false });
var https = require('https');


function xmlHandler(response, request) {

    var weatherYear = url.parse(request.url).query;

    const file = weatherYear + '.xml';

    const xmlURL = "https://www.it.murdoch.edu.au/~S900432D/ict375/data/" + file;

    https.get(xmlURL, function (res) {

        var xmlD = '';
        
        res.on('data', function (data) {

            xmlD += data;

        });

        res.on('end', function () {

            parser.parseString(xmlD, function (err, result) {

                var xmlData = JSON.stringify(result);

                if (err) {

                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.write('Error reading file');
                    response.end();

                } else {

                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(xmlData);
                    response.end();

                };
            });
        });
    });
};

exports.xmlHandler = xmlHandler;