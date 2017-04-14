/**
 * Created by liuwei on 2016/11/7.
 */

var ngAdminLTEApp = angular.module('ngAdminLTEApp', [
    'ngResource',
    'ngCookies',
    'ngSanitize',
    'ngStorage',
    'ui.router',
    'datatables',
    'datatables.bootstrap',
    'datatables.buttons',
    'datatables.select',
    'datatables.editor',
    'satellizer'
]);

// Angular ui-router
ngAdminLTEApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix("~");

        // 路由列表
        $stateProvider.state('ngAdminLTE', {
            url: '/',
            templateUrl: 'partials/layout.html'

        }).state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginController'

        }).state('ngAdminLTE.dashboard', {
            url: 'dashboard',
            templateUrl: 'partials/dashboard.html',
            controller: 'DashboardController'

        }).state('ngAdminLTE.user', {
            url: 'user',
            templateUrl: 'partials/system/user.html',
            controller: 'UserController'

        }).state('ngAdminLTE.404', {
            url: '404',
            templateUrl: '404.html'
        });

        // 默认跳转到dashboard页面
        $urlRouterProvider.when('', function ($injector, $location) {
            $injector.get('$state').go('ngAdminLTE.dashboard');
        }).otherwise(function($injector, $location) {
            $injector.get('$state').go('ngAdminLTE.404');
            return $location.path();
        });
    }
])

// Angular Satellizer
.config(['$authProvider', function ($authProvider) {

}])

// Angular run
.run(['$rootScope', '$location', '$templateCache', function ($rootScope, $location, $templateCache) {
    // 监听路由状态是否发生变化
    $rootScope.$on('$stateChangeSuccess', function ($rootScope) {
        // 清空模板缓存
        $templateCache.removeAll();
    });
}]);


