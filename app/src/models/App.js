define(function(require, exports, module) {
  var defaultArticles = require('./dummyData').exports;
  var Articles        = require('./Articles');
  var Backbone        = require('backbone');

  module.exports = Backbone.Model.extend({
    initialize: function(params) {
      this.fetch();
    },
    fetch: function() {
      this.set('articles', new Articles(defaultArticles));
    }
  });
});
