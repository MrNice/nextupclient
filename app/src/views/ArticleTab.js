/*globals define*/
define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var Modifier = require('famous/core/Modifier');
  // var Engine = require('famous/core/Engine');

  /*
  * @name ArticleTab
  * @constructor
  * @description
  */

  function ArticleTab() {
    View.apply(this, arguments);
  }

  ArticleTab.prototype = Object.create(View.prototype);
  ArticleTab.prototype.constructor = ArticleTab;

  ArticleTab.DEFAULT_OPTIONS = {
  };

  module.exports = ArticleTab;
});
