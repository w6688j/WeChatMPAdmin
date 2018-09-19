/**
 * 拦截器 全局$http注入loading效果
 */
define(['jquery', 'angular', 'config', 'srv/local-storage'], function ($, angular, config, $localStorage) {
    angular.module('ajaxLoading', [])

        .config(function ($httpProvider, $provide) {
            // Use x-www-form-urlencoded Content-Type
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value !== undefined && value !== null)
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };
            // Override $http service's default transformRequest
            $httpProvider.defaults.transformRequest = [function (data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }];
            $httpProvider.interceptors.push('loadingInterceptor');
            $provide.factory('config', ['$http', '$q', function ($h, $q) {
                var options = {};
                config.getOptions = function () {
                    if (options.cost) {
                        return $q.when(options);
                    }
                    return $h.get(config.parse('common/config'), {cache: true})
                        .then(function (data) {
                            if (data.data.code == 0) {
                                options = data.data.data;
                                return options;
                            } else {
                                tip('加载主要配置失败~请刷新后重试~');
                            }
                        });
                };

                return config;
            }])
        })

        .directive('loading', function () {
            return {
                replace: true,
                restrict: 'AE',
                template: '<div id="jquery-loading"><div class="loading-img" style="display: block;"><div class="spinner blue"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div></div>',
                link: function () {
                }
            };
        })

        .factory('loadingInterceptor', function ($q, $rootScope, $localStorage) {
            $rootScope.logout = function () {
                /*$.get(config.url.logout, function () {
                    window.location.reload();
                });*/
                console.log('logout');
                $localStorage.deleteLocalStorage('token');
                window.location.href = '/login.html';
            };
            $rootScope.reload = function () {
                $.get(config.parse('common/reload'), function (json) {
                    if (json.code == 0) {
                        $rootScope.$emit('reload-data');
                    }
                });
            };
            return {
                request: function (config) {
                    $("#jquery-loading").show();
                    config.method == 'GET' && (config.headers['X-Requested-With'] = 'XMLHttpRequest');
                    return config || $q.when(config);
                },
                response: function (response) {
                    $("#jquery-loading").hide();
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    $("#jquery-loading").hide();
                    tip('系统异常，请重试~');
                    return $q.reject(rejection);
                }
            };
        });
});