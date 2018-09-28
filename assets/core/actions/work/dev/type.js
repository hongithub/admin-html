var TypeFunction = function () {

    var type = function () {
        var columns = [
            {},
            {
                data: "type",
                title: '类型',
                className: 'text-center',
            },
            {
                data: "content",
                title: '描述',
                className: 'text-center',
            },
            {}
        ];

        Utils.table.initTable('#data_table', '/type', columns, {});

        $('#btn_add').on('click', function () {
            $('#action_type_desc').text('新增类型');
            $('#btn_submit').text('新增');

            $('#btn_submit').off().on('click', function () {
                var data = {
                    'model.type' : $('#doc_type').val(),
                    'model.content': $('#doc_content').val()
                };

                Utils.ajax.getJsonByAjaxWithAsync('/type/add', data, function (res) {
                    if (res.status === 200){
                        $('#form_type').resetForm();
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

        $('#data_table tbody').on('click', 'a[name=type_edit]', function () {
            $('#action_type_desc').text('修改类型');
            $('#btn_submit').text('修改');

            var record = $('#data_table').DataTable().rows(this.parentNode.parentNode).data();

            $('#doc_id').val(record[0].id);
            $('#doc_type').val(record[0].type);
            $('#doc_content').val(record[0].content);

            $('#btn_submit').off().on('click', function () {
                var data = {
                    'model.id' : $('#doc_id').val(),
                    'model.type' : $('#doc_type').val(),
                    'model.content': $('#doc_content').val()
                };

                Utils.ajax.getJsonByAjaxWithAsync('/type/edit', data, function (res) {
                    if (res.status === 200){
                        $('#form_type').resetForm();
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

        $('#form_type').validate({
            rules: {
                type: {
                    required: !0,
                    minlength: 5,
                },
                content: {
                    required: !0
                }
            },
            messages: {
                type: {
                    required: "类型不能为空！",
                    minlength: "最小长度不能超过5"
                },
                content: {
                    required: "类型描述不能为空"
                }
            }
        });
    };

    return {
        init: function () {
            type();
        }
    }
}();

$(document).ready(function () {
    TypeFunction.init()
});