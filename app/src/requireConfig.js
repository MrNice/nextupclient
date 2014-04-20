/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'famous-polyfills': '../lib/famous-polyfills/index',
        leapjs: '../lib/leapjs/leap',
        fixes: './fixes',
        backbone: '../lib/backbone/backbone',
        underscore: '../lib/underscore/underscore',
        jquery: '../lib/jquery/dist/jquery',
        'backbone.collectionsubset': '../lib/backbone.collectionsubset/dist/backbone.collectionsubset.min'
    }
});
require(['main']);
