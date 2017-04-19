/**
 * Created by liuwei on 2017/4/11.
 */

ngAdminLTEApp.controller('MainController', function ($scope, $rootScope, $animate) {
    // 重设左侧导航栏样式
    $scope.resetSidebar = function(expandNode) {
        $scope.expandNode = expandNode;
    };

    // 页面加载完毕事件
    $scope.$on('$viewContentLoaded', function () {
        // 重设左侧导航栏高度
        $.AdminLTE.layout.fix();
    });
});
