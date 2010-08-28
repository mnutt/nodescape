var nodescape = require('nodescape');

this.map = function() {
  this.path(/^\/blocks\.json/, function (req) {
    this.get().bind(nodescape.get);

    this.post().bind(nodescape.post);
  });
};
