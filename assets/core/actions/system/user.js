var UserFunction = function () {

    var table = function () {
        var columns = [
            {},
            {
                data: "username",
                title: '用户名',
                className: 'text-center',
            },
            {
                data: "level",
                title: '等级',
                className: 'text-center',
            },
            {}
        ];

        var def = {
            targets: -2,
            render: function (index) {
                var style = {
                    1: {
                        title: "普通管理员",
                        class: "m-badge--brand"
                    },
                    2: {
                        title: "系统管理员",
                        class: " m-badge--metal"
                    },
                    3: {
                        title: "超级管理员",
                        class: " m-badge--primary"
                    }
                };
                return void 0 === style[index] ? index : '<span class="m-badge ' + style[index].class + ' m-badge--wide">' + style[index].title + "</span>"
            }
        };

        Utils.table.initTable('#data_table', '/user/listData', columns, def);

        $('#btn_add').on('click', function () {
            $('#action_type_desc').text('新增用户');
            $('#btn_submit').text('新增');
            $('form').resetForm();

            $('#modal_common').modal('show');

            $('#btn_submit').off().on('click', function () {
                var data = {
                    'model.username': $('#user_uname').val(),
                    'model.password': $('#user_repword').val(),
                    'model.level': $('input:radio:checked').val()

                };

                Utils.ajax.getJsonByAjaxWithAsync('/user/add', data, function (res) {
                    if (res.status === 200) {
                        $('#form_type').resetForm();
                        $('#modal_common').modal('hide');
                        Utils.notify.info(res.message);
                    } else {
                        Utils.notify.info(res.message);
                    }
                    $('#data_table').DataTable().draw();
                });
            });
        });

        $('#data_table tbody').on('click', 'a[name=type_edit]', function () {
            $('#action_type_desc').text('修改用户');
            $('#btn_submit').text('修改');

            var record = $('#data_table').DataTable().rows(this.parentNode.parentNode).data();

            $('#user_id').val(record[0].id);
            $('#user_uname').val(record[0].username);
            $('#user_pword').val(record[0].password);
            $('input:radio[value="' + record[0].level + '"]').prop('checked', true);

            $('#btn_submit').off().on('click', function () {
                var data = {
                    'model.username': $('#user_uname').val(),
                    'model.password': $('#user_pword').val(),
                    'model.level': $('input:radio:checked').val()
                };

                Utils.ajax.getJsonByAjaxWithAsync('/user/edit', data, function (res) {
                    if (res.status === 200) {
                        $('#modal_common').modal('hide');
                        Utils.notify.info(res.message);
                    } else {
                        Utils.notify.info(res.message);
                    }
                    $('#data_table').DataTable().draw();
                });
            });

            $('#modal_common').modal('show');
        });
    };

    return {
        init: function () {
            table();
        }
    }
}();
$(document).ready(function () {
    UserFunction.init()
});