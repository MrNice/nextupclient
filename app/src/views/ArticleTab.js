/*globals define*/
define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var Modifier = require('famous/core/Modifier');
  var OptionsManager = require('famous/core/OptionsManager');

  function ArticleTab(model, options) {
    View.apply(this, arguments);

    this.options = Object.create(ArticleTab.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options) this.setOptions(options);

    this.article = model;

    var title = this.article.get('title');

    if (title.length > 40) title = title.slice(0, 40) + '...';

    this.surface = new Surface({
      content: title,
      size: this.options.size,
      properties: {
        backgroundColor: this.article.get('color') || this.color,
        lineHeight: this.options.size[1] + 'px',
        borderRadius: this.options.borderRadius,
        paddingLeft: '20px'
      }
    });

    this.surface.pipe(this._eventOutput);

    // hookup event inputs outputs
    this.surface.on('click', function() {
      console.log('surfaceClick emitted');
      console.log(this);
      this._eventOutput.emit('surfaceClick', this.article);
    }.bind(this));

    this.surfaceModifier = new Modifier();
    this._add(this.surfaceModifier).add(this.surface);
  }

  ArticleTab.prototype = Object.create(View.prototype);
  ArticleTab.prototype.constructor = ArticleTab;

  ArticleTab.DEFAULT_OPTIONS = {
    size: [undefined, 80],
    borderRadius: '0px 5px 5px 0px',
    color: '#ccddff'
  };

  module.exports = ArticleTab;
});
