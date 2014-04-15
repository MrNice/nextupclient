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
        backbone: '../lib/backbone/backbone'
    }
});
require(['main']);
