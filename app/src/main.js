/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var dummyData = require('./dummyData').exports;

    var AppView = require('./views/App');

    // TODO: Refactor to use backbone models with API Requests
    var appView = new AppView(dummyData);
    // create the main context
    var mainContext = Engine.createContext();

    mainContext.add(appView);
});
