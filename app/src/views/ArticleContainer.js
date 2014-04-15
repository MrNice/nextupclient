define(function(require, exports, module) {
  'use strict';
  var Surface          = require('famous/core/Surface');
  var Transform         = require('famous/core/Transform');
  var View             = require('famous/core/View');
  var Modifier         = require('famous/core/Modifier');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var Scrollview       = require('famous/views/Scrollview');

  var Utility          = require('famous/utilities/Utility');
  var OptionsManager   = require('famous/core/OptionsManager');

  function _createBackground() {
    this.background = new Surface({
      size: [330, undefined],
      properties: {
        backgroundColor: 'black'
      }
    });

    this.backgroundMod = new Modifier({
      transform: Transform.translate(0, 0, -1)
    });
    this._add(this.backgroundMod).add(this.background);
  }

  function ArticleContainer(options) {
    View.apply(this, arguments);

    this.options = Object.create(ArticleContainer.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options) this.setOptions(options);

    this.container = new ContainerSurface(this.options.container);
    this.scrollview = new Scrollview(this.options.scrollview);

    this.surfaces = [];

    this.scrollview.sequenceFrom.apply(this.scrollview, [this.surfaces]);

    for (var i = 0; i < 200; i++) {
      var temp = new Surface({
        content: 'Surface: ' + (i + 1),
        size: this.options.elementProperties.size,
        properties: {
          backgroundColor: 'hsl(' + (i * 360 / 20) + ', 100%, 50%)',
          lineHeight: this.options.elementProperties.size[1] + 'px',
          textAlign: 'center',
          borderRadius: this.options.elementProperties.borderRadius
        }
      });

      temp.pipe(this.scrollview);
      this.surfaces.push(temp);
    }

    this.container.add(this.scrollview);

    this.containerMod = new Modifier();

    _createBackground.call(this);

    this._add(this.containerMod).add(this.container);
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
    backgroundPosition: [0, 0]
  };

  ArticleContainer.prototype.setOptions = function(options) {
    return this._optionsManager.setOptions(options);
  };
  module.exports = ArticleContainer;
});
