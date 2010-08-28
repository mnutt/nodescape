require.paths.unshift('deps/mongoose');
require.paths.unshift('models');

var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/nodescape');
var Block = db.model('block');
var BlockCollection = db.collection('blocks');
var socket;

this.setSocket = function(sock) {
  socket = sock;
};

this.get = function (response, params) {
  Block.find({}, false).all(function(result) {
    response.send(200, {}, JSON.stringify(result));
  });
};

this.post = function (response, data) {
  var collection = db.collection('blocks');
  collection.update({column: data.col, row: data.row}, { "$push": { blocks: data.color } }, {upsert: true}, function() {
    response.send(200);
  });
};

this.socketPost = function(data, client) {
  var params = JSON.parse(data);

  BlockCollection.update({column: params.col, row: params.row}, { "$push": { blocks: params.color } }, {upsert: true}, function() {
    var response = {block: { row: params.row, col: params.col, color: params.color }};

    console.log("Broadcasting: " + JSON.stringify(response));
    socket.broadcast(response, client.sessionId);
  });
};