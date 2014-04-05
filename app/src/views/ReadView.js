define(function(require, exports, module) {
  'use strict';
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var View = require('famous/core/View');

  var LinkItemView = require('./LinkItemView');

  function _createReadView() {
    this.linkItemView = new LinkItemView();
    this.linkModifier = new Modifier();

    this._add(this.linkModifier).add(this.linkItemView);
  }

  function ReadView() {
    View.apply(this, arguments);

    _createReadView.call(this);
  }

  ReadView.prototype = Object.create(View.prototype);
  ReadView.prototype.constructor = ReadView;

  ReadView.DEFAULT_OPTIONS = {};

  module.exports = ReadView;
});
