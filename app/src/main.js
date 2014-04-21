/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine    = require('famous/core/Engine');
    var App       = require('./models/App');
    var AppView   = require('./views/AppView');
    var dummyData = require('./dummyData').exports;

    // TODO: Refactor to use backbone models with API Requests
    window.app     = new App();
    var appView = new AppView(window.app);

    // create the main context
    var mainContext = Engine.createContext();

    mainContext.add(appView);
});
