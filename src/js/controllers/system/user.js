/**
 * Created by liuwei on 2017/3/1.
 */
ngAdminLTEApp.controller('UserController', function ($scope, Constants, DTOptionsBuilder, DTColumnBuilder, DTEditorBuilder, DTEditorFieldBuilder, DTEditorButtonBuilder) {
    $scope.resetSidebar('system');

    /*var editor = new $.fn.dataTable.Editor({
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

    });*/

    var editor = DTEditorBuilder.fromSource('/user')
        .withTableSelector('#user')
        .withIdSrc('id')
        .withI18n(Constants.DataTable.Editor.Language.zh_CN)
        .withFields([
            DTEditorFieldBuilder.newField('id').withLabel('ID'),
            DTEditorFieldBuilder.newField('firstName').withLabel('First name'),
            DTEditorFieldBuilder.newField('lastName').withLabel('Last name')
        ])
        .withEditorButtons([
            DTEditorButtonBuilder.newButton('create').withText('新建'),
            DTEditorButtonBuilder.newButton('edit').withText('编辑'),
            DTEditorButtonBuilder.newButton('remove').withText('删除'),
        ]);

    var dataSource = 'http://l-lin.github.io/angular-datatables/archives/data.json';

    $scope.dtOptions = DTOptionsBuilder.fromSource(dataSource)
        .withPaginationType('full_numbers')
        .withLanguageSource('lib/DataTables-1.10.13/i18n/lang-zh-CN.json')
        .withBootstrap()
        .withOption('responsive', true)
        .withDOM(Constants.DataTable.Dom)
        .withButtons([
            {
                extend: 'selectedSingle',
                text: '按钮',
                action: function (e, dt, node, config) {
                    alert('你点击了这个按钮。');
                }
            }
        ])
        .withEditor(editor)
        .withSelect({
            style: 'os',
            info: false
        });

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name')
    ];
});