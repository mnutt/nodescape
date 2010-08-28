require.paths.unshift('.');
require.paths.unshift('deps/');

var http = require('http');
var nodestatic = require('node-static/lib/node-static');

// Mongodb
require.paths.unshift('deps/node-mongodb-native/lib');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSONNative;

// Mongodb client
var client = new Db('nodescape', new Server("127.0.0.1", 27017, {native_parser:true}));

// Static file server
var file = new(nodestatic.Server)('./public');

http.createServer(function(request, response) {
  // Static files
  request.addListener('end', function () {
    file.serve(request, response);
  });

}).listen(3008, "127.0.0.1");

console.log("Listening on port 3008");