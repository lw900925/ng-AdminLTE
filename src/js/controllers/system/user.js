/**
 * Created by liuwei on 2017/3/1.
 */
ngAdminLTEApp.controller('UserController', function ($scope, Constants, DTOptionsBuilder, DTColumnBuilder) {
    $scope.resetSidebar('system');

    var editor = new $.fn.dataTable.Editor({
        ajax: '/user',
        table: '#user',
        idSrc:  'id',
        fields: [
            { label: "ID", name: 'id' },
            { label: "First name", name: 'firstName' },
            { label: "Last name", name: 'lastName' }
        ],
        i18n: Constants.DataTable.Editor.Language.zh_CN

    }).on('open', function (event, main, action) {

    });

    var dataSource = 'http://l-lin.github.io/angular-datatables/archives/data.json';

    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource(dataSource)
        .withPaginationType('full_numbers')
        .withLanguageSource('lib/DataTables-1.10.13/i18n/lang-zh-CN.json')
        .withDOM(Constants.DataTable.Dom)
        .withButtons([
            {
                extend: 'selectedSingle',
                text: '按钮',
                action: function (e, dt, node, config) {
                    alert('你点击了这个按钮。');
                }
            }
            // { extend: 'create', editor: editor, text: '新建' }
        ])
        .withSelect({
            style: 'os',
            info: false
        });

    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name')
    ];
});