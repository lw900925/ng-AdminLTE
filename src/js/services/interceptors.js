/**
 * --------------------------------------------------------
 * ng-AdminLTE Interceptor Configurations
 * --------------------------------------------------------
 *
 * AngularJS提供的拦截器功能，定义好拦截器后，需要将拦截器注册到$httpProvider中
 *
 */
ngAdminLTEApp.config(['$httpProvider', function ($httpProvider) {
    // 注册Angular拦截器栈
    $httpProvider.interceptors.push('authInterceptor');
}]);

/**
 * 认证拦截器，认证的结果保存在Cookie中，如果没有认证，跳转到登陆页。
 * @author liuwei
 */
ngAdminLTEApp.factory('authInterceptor', ['$cookieStore', '$q', function ($cookieStore, $q) {
    // 判断Cookie中是否有登陆信息


    return {
        response: function (response) {


            return response || $q.when(response);
        },

        responseError: function (rejection) {


            return $q.reject(rejection);
        }
    };
}]);
