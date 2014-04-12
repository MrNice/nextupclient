define(function(require, exports, module) {
  'use strict';
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var View = require('famous/core/View');
  var Scrollview = require('famous/views/Scrollview');

  var LinkItemView = require('./LinkItemView');

  function _createReadView() {
    this.linkItemView = new LinkItemView();
    this.linkModifier = new Modifier();

    this._add(this.linkModifier).add(this.linkItemView);
  }

  function ReadView() {
    Scrollview.apply(this, arguments);

    var surfaces = [];

    Scrollview.sequenceFrom(surfaces);

    for (var i = 0, temp; i < 20000; i++) {
      temp = new Surface({
       content: 'Surface: ' + (i + 1),
       size: [undefined, 100],
       properties: {
         backgroundColor: 'hsl(' + (i * 360 / 40) + ', 100%, 50%)',
         lineHeight: '100px',
         textAlign: 'center'
       }
     });

      temp.pipe(Scrollview);
      surfaces.push(temp);
    }
  }

  ReadView.prototype = Object.create(View.prototype);
  ReadView.prototype.constructor = ReadView;

  ReadView.DEFAULT_OPTIONS = {};

  module.exports = ReadView;
});
