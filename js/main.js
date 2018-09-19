var VERSION = 20180919;
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: './js/',
    urlArgs: function (id, url) {
        var args = 'v=' + VERSION;
        if (url.indexOf('cdn.bootcss') !== -1) {
            args = '';
        }

        return (url.indexOf('?') === -1 ? '?' : '&') + args;
    },
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        "jquery": [
            '//cdn.bootcss.com/jquery/1.11.3/jquery.min',
        ],
        "angular": [
            '//cdn.bootcss.com/angular.js/1.4.6/angular.min',
        ],
        "angular-ui-router": [
            "//cdn.bootcss.com/angular-ui-router/0.2.18/angular-ui-router.min",
        ],
        "ctrl": 'app/controllers',
        "srv": 'app/services',
        "dire": 'app/directives',
        "oa": 'app/app',
        "config": 'app/config',
        "jquery-ui": 'libs/jquery-ui.min',
        "functions": 'app/functions',
        'angular-async-loader': 'libs/angular-async-loader.min',
        'semaintic': 'https://cdn.bootcss.com/semantic-ui/2.3.1/semantic.min'
    },
    shim: {
        "functions": ["jquery"],
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-ui-router': {
            deps: ["angular"]
        },
        'jquery-ui': ['jquery'],
        'semaintic': ['jquery'],
        'config': {
            deps: ['angular'],
            exports: 'config'
        }
    }
});

// Start the main app logic.
requirejs(['jquery', 'angular', 'semaintic', 'oa', 'ctrl/loadingInterceptor', 'angular-ui-router', 'app/routers', 'app/filter', 'dire/main'],
    function ($, angular) {
        $(function () {
            angular.bootstrap(document, ['wx-oa'])
        });
    });