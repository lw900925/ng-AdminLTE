/**
 * --------------------------------------------------------
 * angular-datatables editor plugin
 * --------------------------------------------------------
 *
 * angular-datatables editor插件
 *
 * 该插件需要依赖angular-datatables模块才能运行，请确保正确引入了angular-datatables模块。
 *
 * @author liuwei
 * @version 1.0.0
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = 'datatables.editor';
}

(function(window, document, $, angular) {

    'use strict';

    // See https://editor.datatables.net/
    angular.module('datatables.editor', ['datatables'])
        .config(dtEditorConfig)
        .run(initEditorPlugin)
        .factory('DTEditorBuilder', dtEditorBuilder)
        .factory('DTEditorFieldBuilder', dtEditorFieldBuilder)
        .factory('DTEditorButtonBuilder', dtEditorButtonBuilder);
    
    function dtEditorConfig($provide) {
        $provide.decorator('DTOptionsBuilder', dtOptionsBuilderDecorator);
        
        function dtOptionsBuilderDecorator($delegate) {
            var newOptions = $delegate.newOptions;
            var fromSource = $delegate.fromSource;
            var fromFnPromise = $delegate.fromFnPromise;

            $delegate.newOptions = function() {
                return _decorateOptions(newOptions);
            };
            $delegate.fromSource = function(ajax) {
                return _decorateOptions(fromSource, ajax);
            };
            $delegate.fromFnPromise = function(fnPromise) {
                return _decorateOptions(fromFnPromise, fnPromise);
            };

            return $delegate;

            function _decorateOptions(fn, params) {
                var options = fn(params);
                options.withEditor = withEditor;
                return options;

                /**
                 * 绑定DataTable Editor插件
                 * @param editor
                 */
                function withEditor(editor) {
                    if (angular.isUndefined(editor)) {
                        throw new Error('You must define the options for the editor extension. See https://editor.datatables.net/');
                    }
                    options.editor = editor;
                    return options;
                }
            }
        }
        dtOptionsBuilderDecorator.$inject = ['$delegate'];
    }
    dtEditorConfig.$inject = ['$provide'];


    function initEditorPlugin(DTRendererService) {
        var editorPlugin = {
            preRender: preRender
        };
        DTRendererService.registerPlugin(editorPlugin);

        /**
         * preRender方法，在方法在渲染HTML页面之前执行
         * @param options
         */
        function preRender(options) {
            // 创建一个Editor对象
            var editor = new $.fn.dataTable.Editor(options.editor);
            var editorButtons = options.editor.editorButtons;

            // 将Editor和Button绑定到一起
            angular.forEach(editorButtons, function (editorButton) {
                options.buttons.push({extend: editorButton.extend, editor: editor, text: editorButton.text });
            });
        }
    }
    initEditorPlugin.$inject = ['DTRendererService'];

    function dtEditorBuilder() {

        var DTEditorOptions = {

            withOption: function(key, value) {
                if (angular.isString(key)) {
                    this[key] = value;
                }
                return this;
            },

            withIdSrc: function (idSrc) {
                this.idSrc = idSrc;
                return this;
            },
            
            withTableSelector: function (tableSelector) {
                this.table = tableSelector;
                return this;
            },
            
            withI18n: function (i18n) {
                this.i18n = i18n;
                return this;
            },

            withFields: function (fields) {
                this.fields = fields;
                return this;
            },

            withEditorButtons: function (editorButtons) {
                this.editorButtons = editorButtons;
                return this;
            }
        };

        return {
            fromSource: function (ajax) {
                var dtEditorOptions = Object.create(DTEditorOptions);
                dtEditorOptions.ajax = ajax;
                return dtEditorOptions;
            }
        }
    }

    function dtEditorFieldBuilder() {

        var DTEditorField = {

            withOption: function(key, value) {
                if (angular.isString(key)) {
                    this[key] = value;
                }
                return this;
            },

            withLabel: function (label) {
                this.label = label;
                return this;
            },

            withType: function (type) {
                this.type = type;
                return this;
            },

            withDefaultValue: function (defaultVal) {
                this.def = defaultVal;
                return this;
            },

            withSelectOptions: function (options) {
                this.options = options;
                return this;
            }
        };

        return {
            newField: function (sName) {
                if (angular.isUndefined(sName)) {
                    throw new Error('The parameter "sName" is not defined!');
                }

                var field = Object.create(DTEditorField);
                field.name = sName;
                return field;
            }
        }
    }

    function dtEditorButtonBuilder() {
        var DTEditorButton = {
            withOption: function(key, value) {
                if (angular.isString(key)) {
                    this[key] = value;
                }
                return this;
            },
            
            withText: function (text) {
                this.text = text;
                return this;
            }
        };

        return {
            newButton: function (sExtend) {
                if (angular.isUndefined(sExtend)) {
                    throw new Error('The parameter "sExtend" is not defined!');
                }
                var editorButton = Object.create(DTEditorButton);
                editorButton.extend = sExtend;
                return editorButton;
            }
        }
    }


})(window, document, jQuery, angular);