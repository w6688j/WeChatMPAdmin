define(['oa', 'config', 'jquery-ui'], function (oa, config) {
    oa.controller('order-list', ['$scope', '$http', '$compile', function ($scope, $http, $compile) {
        // 设置菜单
        $scope.setNavReport(1, 2, 21);
    }])
});