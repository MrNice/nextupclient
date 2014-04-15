/*globals define*/
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var Engine = require('famous/core/Engine');

    /*
     * @name content
     * @constructor
     * @description
     */

    function content() {
        View.apply(this, arguments);
    }

    content.prototype = Object.create(View.prototype);
    content.prototype.constructor = content;

    content.DEFAULT_OPTIONS = {
    };

    module.exports = content;
});
