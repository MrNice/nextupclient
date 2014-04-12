/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');

    var AppView = require('./views/App');

    var appView = new AppView();
    // create the main context
    var mainContext = Engine.createContext();

    mainContext.add(appView);
});
