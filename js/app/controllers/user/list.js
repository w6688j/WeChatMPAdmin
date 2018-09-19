define(['oa', 'config', 'jquery-ui'], function (oa, config) {
    oa.controller('user-list', ['$scope', '$http', '$compile', function ($scope, $http, $compile) {
        // 设置菜单
        $scope.setNavReport(1, 3, 31);
    }])
});