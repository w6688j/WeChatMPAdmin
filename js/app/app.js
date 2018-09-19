/**
 * Created by chenmingming on 2016/6/6.
 */
define(['angular', 'angular-async-loader', 'module', 'exports', 'functions'], function (angular, asyncLoader, module, exports) {

    var app = angular.module('wx-oa', ['ui.router', 'ajaxLoading']);
    asyncLoader.configure(app);

    module.exports = app;

    return app;
});