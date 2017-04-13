/**
 * --------------------------------------------------------
 * ng-AdminLTE Utils Module
 * --------------------------------------------------------
 * @author liuwei
 */
ngAdminLTEApp.factory('ngAdminLTEUtils', function () {
    return {
        deleteProperty : deleteProperty
    };

    /**
     * 删除对象的某个属性
     * @param object 对象
     * @param propertyName 属性名称
     */
    function deleteProperty(object, propertyName) {
        if (angular.isObject(object)) {
            delete object[propertyName];
        }
    }
});



