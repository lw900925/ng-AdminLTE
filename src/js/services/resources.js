/**
 * Created by liuwei on 2017/2/28.
 */
var ngAdminLTEResources = angular.module("ngAdminLTEResources", ["ngResource"]);

ngAdminLTEResources.config(["$resourceProvider", function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
