var MenuFunction = function () {

    var tree = function () {

        Utils.tree.initTree('#menu_tree', '/menu');

        $('#menu_tree').on('changed.jstree', function(e, data) {
            var node = data.instance.get_node(data.selected[0]).original;

            if (node === undefined) {
                return;
            }
            
            $('#data_id').val(node.id);
            $('#data_pid').val(node.parentId);
            $('#data_url').val(node.url);
            $('#data_menu').val(node.text);
            $('#data_icon').val(node.icon);
            $('input:radio[value="' + node.level + '"]').prop('checked', true);

            $('#menu_form input').attr('disabled',true);
        });

        $('#btn_submit').on('click', function () {
            Utils.notify.error('请选择你要操作节点！');
        });

        $('#btn_add').on('click', function () {
            var id = $('#data_id').val();

            if (id === '') {
                Utils.notify.error('请选择你要新增功能的上级节点！');
                return;
            }
            clear();

            $('#btn_submit').text('新增');
            $('#btn_submit').off().on('click', function () {
                var data = {
                    'model.pid' : $('#data_id').val(),
                    'model.url' : $('#data_url').val(),
                    'model.menu' : $('#data_menu').val(),
                    'model.icon' : $('#data_icon').val(),
                    'model.level' : $('input:radio:checked').val()
                };

                Utils.ajax.getJsonByAjaxWithAsync('/menu/add', data, function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        $('#menu_tree').jstree(true).refresh();
                        Utils.notify.info(res.message);
                    } else {
                        Utils.notify.error(res.message);
                    }
                });
            });
        });

        $('#btn_edit').on('click',function () {
            var id = $('#data_id').val();

            if (id === '') {
                Utils.notify.error('请选择你要修改的节点！');
                return;
            }

            $('#menu_form input').attr('disabled',false);

            $('#btn_submit').text('修改');
            $('#btn_submit').off().on('click', function () {
                var data = {
                    'model.id' : $('#data_id').val(),
                    'model.pid' : $('#data_pid').val(),
                    'model.url' : $('#data_url').val(),
                    'model.menu' : $('#data_menu').val(),
                    'model.icon' : $('#data_icon').val(),
                    'model.level' : $('input:radio:checked').val()
                };

                Utils.ajax.getJsonByAjaxWithAsync('/menu/edit', data, function (res) {
                    if (res.status === 200) {
                        $('#menu_tree').jstree(true).refresh();
                        Utils.notify.info(res.message);
                    } else {

                    }
                });
            });
        });

        var clear = function () {
            $('#data_url').val('');
            $('#data_menu').val('');
            $('#data_icon').val('');
            $('input[name=data_level]').prop('checked', false);

            $('#menu_form input').attr('disabled',false);
        };
    };

    return {
        init: function () {
            tree();
        }
    }
}();
$(document).ready(function () {
    MenuFunction.init()
});