define(function(require, exports, module) {
  'use strict';
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var View = require('famous/core/View');

  var LinkItemView = require('./views/LinkItemView');

  function _createReadView() {
    this.linkItemView = new LinkItemView();
    this.linkModifier = new Modifier();

    this._add(this.linkModifier).add(this.linkItemView);
  }

  function ContentView() {
    HeaderFooterLayout.apply(this, arguments);

    _createReadView.call(this);
  }

  ContentView.prototype = Object.create(HeaderFooterLayout.prototype);
  ContentView.prototype.constructor = ContentView;

  ContentView.DEFAULT_OPTIONS = {};

  module.exports = ContentView;
});
