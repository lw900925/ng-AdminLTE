/**
 * --------------------------------------------------------
 * ng-AdminLTE Resources Configurations
 * --------------------------------------------------------
 *
 * 资源服务封装了与后台接口的统一交互，该服务需要依赖ngResource模块
 *
 */
ngAdminLTEApp.config(["$resourceProvider", function($resourceProvider) {
    // 默认情况下，末尾斜杠可以引起后端服务器不期望出现的行为，改配置将末尾斜杠从URL中剥离
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

/**
 * 企业管理模块Service
 */
ngAdminLTEApp.factory('Enterprise', ['$resource', function ($resource) {
    
}]);
