define(function(require, exports, module) {
  'use strict';
  var Surface        = require('famous/core/Surface');
  var Modifier       = require('famous/core/Modifier');
  var View           = require('famous/core/View');
  var Transform      = require('famous/core/Transform');
  var Transitionable = require('famous/transitions/Transitionable');
  var Easing         = require('famous/transitions/Easing');
  var CachedMap      = require('famous/transitions/CachedMap');

  function ContentView(content) {
    View.apply(this, arguments);

    this.content = new Surface({
      size: [700, undefined],
      content: '<h1>' + content.reading[0].title + '</h1>' + content.reading[0].content,
      properties: {
        backgroundColor: '#f6ede6',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '15px'
      }
    });
  
    this.contentLift = new Modifier({
      transform: Transform.translate(0, 0, 2)
    });

    this.contentRotate = new Modifier({
      // transform: Transform.rotateZ(Math.PI/7)
    });

    this._add(this.contentLift).add(this.contentRotate).add(this.content);
  }

  ContentView.prototype = Object.create(View.prototype);
  ContentView.prototype.constructor = ContentView;

  ContentView.prototype.setContent = function() {
  };

  ContentView.prototype.rotateMore = function() {
    this.contentMod.transform = Transform(Math.PI/6);
  };

  ContentView.DEFAULT_OPTIONS = {
  };

  module.exports = ContentView;
});
