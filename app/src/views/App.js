define(function(require, exports, module) {
  'use strict';
  var Surface            = require('famous/core/Surface');
  var Transform          = require('famous/core/Transform');
  var Modifier           = require('famous/core/Modifier');
  var View               = require('famous/core/View');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

  var ArticleContainer   = require('views/ArticleContainer');
  var ContentView        = require('views/ContentView');

  function _createBackground() {
    this.background = new Surface({
      size: [undefined, undefined],
      properties: {
        backgroundColor: 'brown'
      }
    });

    this.backgroundMod = new Modifier({
      transform: Transform.translate(0, 0, -2)
    });

    this._add(this.backgroundMod).add(this.background);
  }

  function _createContent(content) { 
    this.contentView = new ContentView(content);

    this.contentMod = new Modifier({
      origin: [0.5, 0]
    });

    this._add(this.contentMod).add(this.contentView);
  }

  function AppView(content) {
    View.apply(this, arguments);

    // TODO: Remove this later
    this.name = 'appview';
    // TODO: Refactor to use API Calls
    this.options.readOptions.container.data = content.read;
    this.options.nextOptions.container.data = content.next;

    this.readModifier = new Modifier(this.options.readOptions.modifier);
    this.readContainer = new ArticleContainer(this.options.readOptions.container);

    this.nextModifier = new Modifier(this.options.nextOptions.modifier);
    this.nextContainer = new ArticleContainer(this.options.nextOptions.container);

    this.nextContainer.container.on('surfaceClick', function(surface) {
      this.contentView.content.setContent('<h1>' + surface.article.title + '</h1>' + surface.article.content);
      // this.readContainer.addTab(surface);
    }.bind(this));

    this.readContainer.container.on('surfaceClick', function(surface) {
      this.contentView.content.setContent('<h1>' + surface.article.title + '</h1>' + surface.article.content);
      // this.readContainer.addTab(surface);
    }.bind(this));

    _createBackground.call(this);

    this.contentView = new ContentView(this.options);

    this.contentMod = new Modifier({
      origin: [0.5, 0]
    });

    this._add(this.contentMod).add(this.contentView);

    this._add(this.readModifier).add(this.readContainer);
    this._add(this.nextModifier).add(this.nextContainer);
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {
    nextOptions: {
      container: {
        name: 'NextUp',
        elementProperties: {
          borderRadius: '5px 0px 0px 5px'
        }
      },
      modifier: {
        origin: [1, 0]
      }
    },
    readOptions: {
      container: {
        name: 'Read',
      },
      modifier: {
        origin: [0, 0]
      }
    }
  };

  module.exports = AppView;
});
