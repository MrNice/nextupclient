define(function(require, exports, module) {
  var defaultArticles = require('./dummyData').exports;
  var Articles        = require('./Articles');
  var Backbone        = require('backbone');

  // console.log(Backbone.Collection.extend().subcollection)

  module.exports = Backbone.Model.extend({
    initialize: function(params) {
      this.fetch();
    },
    fetch: function() {
      // TODO : HOOK THIS UP TO THE SERVER :D
      this.set('articles', new Articles(defaultArticles));
      this.set('nextup', new Articles(defaultArticles));
      this.set('read', new Articles());
    }
  });
});
