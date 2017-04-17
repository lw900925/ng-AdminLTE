/**
 * Created by liuwei on 2017/2/28.
 */
ngAdminLTEApp.controller('LoginController', function ($scope, Constants, $state, $cookieStore) {
    $('body').addClass('login-page');

    $scope.email = 'lw900925@163.com';
    $scope.password = '123456';
    $scope.rememberMe = false;

    /**
     * 将用户登录信息保存在Cookies中，然后跳转到首页dashboard
     */
    $scope.login = function () {
        // 验证用户名和密码是否正确

        // 保存用户登录信息到Cookie
        $cookieStore.put(Constants.Cookie.AccessToken, 'ngAdminLTE-access-token-' + new Date().getTime())

        // 跳转到dashboard
        $state.go('ngAdminLTE.dashboard');
    };
});