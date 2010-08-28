require.paths.unshift('.');
require.paths.unshift('deps/');

var http = require('http');
var nodestatic = require('node-static/lib/node-static');

var file = new(nodestatic.Server)('./public');

http.createServer(function(request, response) {
  // Static files
  request.addListener('end', function () {
    file.serve(request, response);
  });

}).listen(3008, "127.0.0.1");

console.log("Listening on port 3008");