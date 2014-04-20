define(function(require, exports, module) {
  'use strict';
  var Surface          = require('famous/core/Surface');
  var Transform        = require('famous/core/Transform');
  var View             = require('famous/core/View');
  var Modifier         = require('famous/core/Modifier');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var Scrollview       = require('famous/views/Scrollview');
  var EventHandler     = require('famous/core/EventHandler');

  var Utility          = require('famous/utilities/Utility');
  var OptionsManager   = require('famous/core/OptionsManager');

  function _createBackground() {
    this.background = new Surface({
      size: [325, undefined],
      properties: {
        backgroundColor: '#8B0000'
      }
    });

    this.backgroundMod = new Modifier({
      transform: Transform.translate(0, 0, -1)
    });
    this._add(this.backgroundMod).add(this.background);
  }

  function _createHeader(name) {
    this.header = new Surface({
      size: [325, 50],
      content: name,
      properties: {
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        fontSize: '30px',
        paddingTop: '5px'
      }
    });

    this.headerMod = new Modifier({
      transform: Transform.translate(0, 0, 1)
    });

    this._add(this.headerMod).add(this.header);
  }

  function ArticleContainer(options) {
    View.apply(this, arguments);

    // Patch options
    this.options = Object.create(ArticleContainer.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options) this.setOptions(options);

    this.container = new ContainerSurface(this.options.container);
    this.scrollview = new Scrollview(this.options.scrollview);

    this.containerMod = new Modifier({
      transform: Transform.translate(0, 50, 0)
    });

    this.surfaces = [];
    this.scrollview.sequenceFrom.call(this.scrollview, this.surfaces);

    // TODO: Refactor surfaces
    var container = this.container; // TODO: Delete when you refactor surfaces

    this._clickFunction = function() {
      container.emit('surfaceClick', this);
    };

    // Refactoring to use a backbone collection
    this.options.data.each(function(article, i, articles) {
      var title = article.get('title');

      if (title.length > 40) title = title.slice(0, 40) + '...';
      article.set('color', 'hsl(' + (i * 360 / 12) + ', 86%, 50%)');

      var temp = new Surface({
        // TODO: Fix this overflow hack with more preprocessing
        content: title,
        size: this.options.elementProperties.size,
        properties: {
          backgroundColor: article.get('color'),
          lineHeight: this.options.elementProperties.size[1] + 'px',
          borderRadius: this.options.elementProperties.borderRadius,
          paddingLeft: '20px'
        }
      });
      temp.article = article;

      this.surfaces.push(temp);
      temp.pipe(this.scrollview);
      temp.on('click', this._clickFunction);
    }, this);

    // var surfaceData = this.options.data;

    // for (var i = 0; i < surfaceData.length; i++) {
    //   var title = this.options.data[i].get('title');

    //   if (title.length > 40) title = title.slice(0, 40) + '...';

    //   var temp = new Surface({
    //     // TODO: Fix this overflow hack with more preprocessing
    //     content: title,
    //     size: this.options.elementProperties.size,
    //     properties: {
    //       backgroundColor: 'hsl(' + (i * 360 / 12) + ', 86%, 50%)',
    //       lineHeight: this.options.elementProperties.size[1] + 'px',
    //       borderRadius: this.options.elementProperties.borderRadius,
    //       paddingLeft: '20px'
    //     }
    //   });

    //   temp.article = options.data[i];

    //   this.surfaces.push(temp);
    //   temp.pipe(this.scrollview);
    //   temp.on('click', this._clickFunction);
    // }

    _createBackground.call(this);
    _createHeader.call(this, this.options.name);
    this.container.add(this.scrollview);
    this._add(this.containerMod).add(this.container);

    EventHandler.setInputHandler(this, this.scrollview);
    EventHandler.setOutputHandler(this, this.scrollview);
    this.scrollview.subscribe(this.container);
  }

  ArticleContainer.prototype = Object.create(View.prototype);
  ArticleContainer.prototype.constructor = ArticleContainer;

  ArticleContainer.DEFAULT_OPTIONS = {
    scrollview: {
      edgePeriod: 800,
      friction: 0.5,
      drag: 0.2,
      speedLimit: 10,
      edgeDamp: 1,
      edgeGrip: 0.5
    },
    container: {
      size: [320, undefined],
      properties: {
        overflow: 'hidden'
      }
    },
    elementProperties: {
      size: [undefined, 80],
      borderRadius: '0px 5px 5px 0px'
    },
    backgroundPosition: [0, 0],
    name: 'Read'
  };

  ArticleContainer.prototype.setOptions = function(options) {
    return this._optionsManager.setOptions(options);
  };

  ArticleContainer.prototype.addTab = function(surface) {
    // this.surfaces.push(surface);
    // this.render();
  };

  ArticleContainer.prototype.removeTab = function(surface) {
  };

  module.exports = ArticleContainer;
});
