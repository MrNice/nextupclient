define(function(require, exports, module) {
  'use strict';
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var View = require('famous/core/View');

  var LinkItemView = require('./views/LinkItemView');

  function _createNextView() {
    this.linkItemView = new LinkItemView();
    this.linkModifier = new Modifier();

    this._add(this.linkModifier).add(this.linkItemView);
  }

  function NextView() {
    View.apply(this, arguments);

    _createNextView.call(this);
  }

  NextView.prototype = Object.create(View.prototype);
  NextView.prototype.constructor = NextView;

  NextView.DEFAULT_OPTIONS = {};

  module.exports = NextView;
});
