GLOBAL.DEBUG = true;

require.paths.unshift('.');
require.paths.unshift('deps/');

var http = require('http');
var nodestatic = require('node-static/lib/node-static');
var journey = require('journey/lib/journey');
var routes = require('routes');
var io = require('socket.io-node');

// Static file server
var file = new(nodestatic.Server)('./public');

var router = new(journey.Router)(routes.map);

var server = http.createServer(function(request, response) {
  var body = "";

  if(request.url == '/') { request.url = '/index.html'; }

  request.addListener('data', function (chunk) { body += chunk });
  request.addListener('end', function () {
    //
    // Dispatch the request to the router
    //
    router.route(request, body, function (result) {
      if(result.status === 404) {
        file.serve(request, response, function(err, result) {
          if (err) {
            file.serveFile('/404.html', 404, {}, request, response);
          }
        });
      } else {
        response.writeHead(result.status, result.headers);
        response.end(result.body);
      }
    });
  });
});
server.listen(3008, "127.0.0.1");
console.log("Listening on port 3008");

// socket.io, I choose you
var socket = io.listen(server);
routes.nodescape.setSocket(socket);

socket.on('connection', function(client){
  client.on('message', function(data) { routes.nodescape.socketPost(data, client) });
  // client.on('disconnect', function(){ console.log("GONE"); })
});