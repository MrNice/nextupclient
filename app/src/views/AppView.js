define(function(require, exports, module) {
  'use strict';
  var Surface            = require('famous/core/Surface');
  var Transform          = require('famous/core/Transform');
  var Modifier           = require('famous/core/Modifier');
  var View               = require('famous/core/View');

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

  function _createContent() {
    this.contentView = new ContentView(this.options.contentOptions);

    this.contentMod = new Modifier({
      origin: [0.5, 0]
    });

    this._add(this.contentMod).add(this.contentView);
  }

  function AppView(app) {
    var content = app;
    View.apply(this, arguments);

    // TODO: Remove this later
    this.name = 'appview';
    // TODO: Refactor to use API Calls

    this.options.contentOptions = app.get('nextup').first();
    this.options.nextOptions.containerOptions.data = app.get('nextup');
    this.options.readOptions.containerOptions.data = app.get('read');

    this.readModifier = new Modifier(this.options.readOptions.modifier);
    this.readContainer = new ArticleContainer(this.options.readOptions.containerOptions);

    this.nextModifier = new Modifier(this.options.nextOptions.modifier);
    this.nextContainer = new ArticleContainer(this.options.nextOptions.containerOptions);

    this.nextContainer.container.on('surfaceClick', function(surface) {
      // TODO: Splice out and add to read
      this.contentView.content.setContent('<h1>' + surface.article.get('title') + '</h1>' + surface.article.get('content'));
    }.bind(this));

    this.readContainer.container.on('surfaceClick', function(surface) {
      this.contentView.content.setContent('<h1>' + surface.article.get('title') + '</h1>' + surface.article.get('content'));
    }.bind(this));

    this._add(this.readModifier).add(this.readContainer);
    this._add(this.nextModifier).add(this.nextContainer);

    _createBackground.call(this);
    _createContent.call(this);
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {
    nextOptions: {
      containerOptions: {
        name: 'NextUp',
        elementProperties: {
          borderRadius: '5px 0px 0px 5px'
        },
        filter: function(model, i, collection) {
          return model.get('next');
        }
      },
      modifier: {
        origin: [1, 0]
      }
    },
    readOptions: {
      containerOptions: {
        name: 'Read',
        filter: function(model, i, collection) {
          return model.get('read');
        }
      },
      modifier: {
        origin: [0, 0]
      }
    }
  };

  module.exports = AppView;
});
