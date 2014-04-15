define(function(require, exports, module) {
  'use strict';
  var Surface = require('famous/core/Surface');
  var Transform         = require('famous/core/Transform');
  var Modifier = require('famous/core/Modifier');
  var View = require('famous/core/View');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

  var ArticleContainer = require('views/ArticleContainer');

  function AppView(content) {
    View.apply(this, arguments);

    this.content = new HeaderFooterLayout();

    this.background = new Surface({
      size: [undefined, undefined],
      properties: {
        backgroundColor: 'brown'
      }
    });

    this.backgroundMod = new Modifier({
      transform: Transform.translate(0, 0, -2)
    });

    this.readModifier = new Modifier();
    this.nextModifier = new Modifier({
      origin: [1, 0]
    });

    this.readContainer = new ArticleContainer({
      data: content.read
    });
    this.nextContainer = new ArticleContainer({
      data: content.next,
      elementProperties: {
        borderRadius: '5px 0px 0px 5px'
      }
    });

    this._add(this.backgroundMod).add(this.background);
    this._add(this.readModifier).add(this.readContainer);
    this._add(this.nextModifier).add(this.nextContainer);
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {};

  module.exports = AppView;
});
