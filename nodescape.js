require.paths.unshift('deps/mongoose');
require.paths.unshift('models');

var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/nodescape');
var Block = db.model('block');

this.get = function (response, params) {
  Block.find({}, false).all(function(result) {
    console.log(JSON.stringify(result[0], null, 2));
    response.send(200, {}, JSON.stringify(result));
  });
};

this.post = function (response, data) {
  var collection = db.collection('blocks');
  collection.update({column: data.col, row: data.row}, { "$push": { blocks: data.color } }, {upsert: true}, function() {
    response.send(200);
  });
};