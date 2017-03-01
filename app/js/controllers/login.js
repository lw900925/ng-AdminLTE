/**
 * Created by liuwei on 2017/2/28.
 */
ngAdminLTEApp.controller('LoginController', function ($scope, $translateCookieStorage, Constants, $translate, $state) {
    // 默认语言，从CookieStorage中获取
    $scope.language = $translateCookieStorage.get('NG_TRANSLATE_LANG_KEY');

    // 切换语言
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $scope.language = langKey;
    };

    $('body').addClass('login-page');
});