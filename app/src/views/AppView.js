define(function(require, exports, module) {
  'use strict';
  var Modifier = require('famous/core/Modifier');
  var View = require('famous/core/View');

  var ContentView = require('./views/ContentView');
  var ReadView = require('./views/ReadView');
  var NextView = require('./views/NextView');

  function _createContentView() {
    this.contentView = new ContentView();
    this.contentModifier = new Modifier();

    this._add(this.contentModifier).add(this.contentView);
  }

  function _createReadView() {
    this.readView = new ReadView({
      edgePeriod: 800,
      friction: 0.5,
      drag: 0.2,
      speedLimit: 10,
      edgeDamp: 1,
      edgeGrip: 0.5
    });

    this.readModifier = new Modifier();

    this._add(this.readModifier).add(this.readView);
  }

  function _createNextView() {
    this.nextView = new NextView();
    this.nextModifier = new Modifier();

    this._add(this.nextModifier).add(this.nextView);
  }

  function AppView() {
    View.apply(this, arguments);

    _createContentView.call(this);
    _createReadView.call(this);
    _createNextView.call(this);
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {};

  module.exports = AppView;
});
