'use strict'

var server = require("./js/server.js");
var router = require("./js/router.js");

var handle = {};

handle["/"] = require("./js/start.js").reqStart;
handle["/jsonHandler"] = require("./js/jsonHandler.js").jsonHandler;
handle["/xmlHandler"] = require("./js/xmlHandler.js").xmlHandler;
handle["/weatherTable"] = require("./js/tableHandler.js").generateWeatherTable;
handle["/weatherGraph"] = require("./js/graphHandler.js").generateWeatherGraph;
handle["/convertWeatherJson"] = require("./js/convertWeatherJson.js").weatherJsonData;
handle["/convertWeatherXml"] = require("./js/convertWeatherXml.js").convertWeatherXml;
handle["/openWeatherData"] = require("./js/openWeatherData.js").openWeatherData;
handle["/css"] = require('./js/css.js').reqCSS;


server.startServer(router.route, handle);