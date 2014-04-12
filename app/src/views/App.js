define(function(require, exports, module) {
  'use strict';
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var View = require('famous/core/View');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var Scrollview = require('famous/views/Scrollview');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

  function AppView() {
    var i;
    var temp;
    View.apply(this, arguments);

    this.readSurfaces = [];
    this.nextSurfaces = [];

    this.readContainer = new ContainerSurface({
      size: [320, undefined],
      properties: {
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.8)'
      }
    });

    this.nextContainer = new ContainerSurface({
      size: [320, undefined],
      properties: {
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.8)'
      }
    });

    this.readScroll = new Scrollview({
      edgePeriod: 800,
      friction: 0.5,
      drag: 0.2,
      speedLimit: 10,
      edgeDamp: 1,
      edgeGrip: 0.5
    });

    this.nextScroll = new Scrollview({
      edgePeriod: 800,
      friction: 0.5,
      drag: 0.2,
      speedLimit: 10,
      edgeDamp: 1,
      edgeGrip: 0.5
    });

    this.content = new HeaderFooterLayout({});

    this.readScroll.sequenceFrom(this.readSurfaces);

    for (i = 0; i < 200; i++) {
      temp = new Surface({
       content: 'Surface: ' + (i + 1),
       size: [undefined, 80],
       properties: {
         backgroundColor: 'hsl(' + (i * 360 / 20) + ', 100%, 50%)',
         lineHeight: '100px',
         textAlign: 'center',
         borderRadius: '0px 5px 5px 0px'
       }
     });

      temp.pipe(this.readScroll);
      this.readSurfaces.push(temp);
    }

    this.nextScroll.sequenceFrom(this.nextSurfaces);

    for (i = 0; i < 200; i++) {
      temp = new Surface({
       content: 'Surface: ' + (i + 1),
       size: [undefined, 80],
       properties: {
         backgroundColor: 'hsl(' + (i * 360 / 20) + ', 100%, 50%)',
         lineHeight: '100px',
         textAlign: 'center',
         borderRadius: '5px 0px 0px 5px'
       }
     });

      temp.pipe(this.nextScroll);
      this.nextSurfaces.push(temp);
    }

    this.readModifier = new Modifier({
    });

    this.nextModifier = new Modifier({
      origin: [1, 0]
    });

    this.readContainer.add(this.readScroll);
    this.nextContainer.add(this.nextScroll);

    this._add(this.readModifier).add(this.readContainer);
    this._add(this.nextModifier).add(this.nextContainer);
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {};

  module.exports = AppView;
});
