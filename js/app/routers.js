define(['oa', 'config'], function (pms, config) {
    pms.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.active = {};
    }]);
    pms.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/product.html');
        $stateProvider
            .state('product', {
                url: '/product.html',
                templateUrl: config.tpl('product/list'),
                controllerUrl: 'ctrl/product/list',
                controller: 'product-list'
            })
            .state('order', {
                url: '/order.html',
                templateUrl: config.tpl('order/list'),
                controllerUrl: 'ctrl/order/list',
                controller: 'order-list'
            })
            .state('user', {
                url: '/user.html',
                templateUrl: config.tpl('user/list'),
                controllerUrl: 'ctrl/user/list',
                controller: 'user-list'
            })
        ;

        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);

});