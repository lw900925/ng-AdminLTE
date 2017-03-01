/**
 * Created by liuwei on 2016/11/7.
 */

var ngAdminLTEApp = angular.module('ngAdminLTEApp', [
    'ngResource',
    'ngCookies',
    'ngSanitize',
    'ngStorage',
    'ui.router',
    'pascalprecht.translate',
    'ngAdminLTEResources'
]);

// Angular ui-router
ngAdminLTEApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix("~");

        // 路由列表
        $stateProvider.state('ngAdminLTE', {
            url: '/',
            templateUrl: 'layout.html'

        }).state('login', {
            url: '/login',
            templateUrl: 'login.html',
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
            $injector.get('$state').go('404');
            return $location.path();
        });
    }

// Angular Translate
]).config(['$translateProvider', function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.useCookieStorage();
        $translateProvider.preferredLanguage('zh-CN');
        $translateProvider.fallbackLanguage('zh-CN');

// 常量配置
}]).constant('Constants', {
    // DataTables插件默认常量
    DataTable : {
        Dom : "<'row'<'col-xs-8'B><'col-xs-4'f>><'row'<'col-xs-12'tr>><'row'<'col-xs-3'l><'col-xs-3'i><'col-xs-6'p>>",
        Editor : {
            Language : {
                zh_CN : {
                    create: {
                        button: "创建",
                        title:  "<h3>创建</h3>",
                        submit: "确定"
                    },

                    edit: {
                        button: "编辑",
                        title:  "<h3>编辑</h3>",
                        submit: "确定"
                    },

                    remove: {
                        button: "删除",
                        title:  "<h3>删除</h3>",
                        submit: "确定",
                        confirm: {
                            _: "是否确定删除所选中的%d条记录？",
                            1: "是否确定删除所选中的1条记录？"
                        }
                    },

                    error: {
                        system: "系统内部出错"
                    },

                    multi: {
                        title: "多个值",
                        info: "所选中的项目包含多个不同值，要将这些值修改为相同值，请点击此处，否则这些值将保持不变。",
                        restore: "撤销更改",
                        noMulti: "该输入框可以单独编辑，但不是组的一部分。"
                    },

                    datetime: {
                        previous: "上一页",
                        next:     "下一页",
                        months:   [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
                        weekdays: [ "日", "一", "二", "三", "四", "五", "六" ],
                        amPm:     [ "上午", "下午" ],
                        unknown:  "-"
                    }
                },
                en_US : {
                    create: {
                        button: "New",
                        title:  "<h3>Create new entry</h3>",
                        submit: "Create"
                    },

                    edit: {
                        button: "Edit",
                        title:  "<h3>Edit entry</h3>",
                        submit: "Update"
                    },

                    remove: {
                        button: "Delete",
                        title:  "<h3>Delete</h3>",
                        submit: "Delete",
                        confirm: {
                            _: "Are you sure you wish to delete %d rows?",
                            1: "Are you sure you wish to delete 1 row?"
                        }
                    },

                    error: {
                        system: "A system error has occurred"
                    },

                    multi: {
                        title: "Multiple values",
                        info: "The selected items contain different values for this input. To edit and set all items for this input to the same value, click or tap here, otherwise they will retain their individual values.",
                        restore: "Undo changes",
                        noMulti: "This input can be edited individually, but not part of a group."
                    },

                    datetime: {
                        previous: "Previous",
                        next:     "Next",
                        months:   [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                        weekdays: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                        amPm:     [ "am", "pm" ],
                        unknown:  "-"
                    }
                }
            }
        }
    }
}).run(['$rootScope', '$location', '$templateCache', function ($rootScope, $location, $templateCache) {
    // 监听路由状态是否发生变化
    $rootScope.$on('$stateChangeSuccess', function ($rootScope) {
        // 清空模板缓存
        $templateCache.removeAll();
    });
}]);

ngAdminLTEApp.controller('LayoutController', function ($scope, $rootScope, $location, $translate, $localStorage, $sessionStorage, Constants) {
    // 重设左侧导航栏样式
    $scope.resetSidebar = function(expandNode) {
        $scope.expandNode = expandNode;
    };

    // 页面加载完毕事件
    $scope.$on('$viewContentLoaded', function () {
        // 重设左侧导航栏高度
        $.AdminLTE.layout.fix();
    });

    $('body').addClass('skin-blue sidebar-mini');
});
