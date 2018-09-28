var DocFunction = function () {

    var doc = function () {
        var columns = [
            {},
            {
                data: "title",
                title: '标题',
                className: 'text-center',
            },
            {
                data: "type",
                title: '类型',
                className: 'text-center',
            },
            {
                data: "cdate",
                title: '创建时间',
                className: 'text-center',
            },
            {
                data: "edate",
                title: '修改时间',
                className: 'text-center',
            },
            {
                data: "status",
                title: '状态',
                className: 'text-center',
            },
            {}
        ];

        Utils.table.initTable('#data_table', '/doc', columns, {});

        $(".summernote").summernote({
            height: 150
        });

        $('#btn_add').on('click', function () {
            $('#action_type_desc').text('新增文章');
            $('#btn_submit').text('新增');
            $('form').resetForm();

            Utils.select.load('#doc_type', '/type/select');
            $('#modal_common').modal('show');

            $('#btn_submit').off().on('click', function () {
                var data = {
                    'model.title' : $('#doc_title').val(),
                    'model.type' : $('#doc_type').val(),
                    'model.content': $(".summernote").summernote('code')
                };

                Utils.ajax.getJsonByAjaxWithAsync('/doc/add', data, function (res) {
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
        });

        $('#data_table tbody').on('click', 'a[name=type_edit]', function () {
            $('#action_type_desc').text('修改文章');
            $('#btn_submit').text('修改');

            var record = $('#data_table').DataTable().rows(this.parentNode.parentNode).data();
            Utils.select.load('#doc_type', '/type/select');

            $('#btn_submit').off().on('click', function () {
                var vals = $('#data_table').DataTable().rows(this.parentNode.parentNode).data();
                var data = {
                    'model.id' : $('#doc_id').val(),
                    'model.title' : $('#doc_title').val(),
                    'model.type' : $('#doc_type').val(),
                    'model.content': $('#doc_content').val(),
                    'model.cdate' : vals[0].cdate,
                    'model.status' : vals[0].status
                };

                Utils.ajax.getJsonByAjaxWithAsync('/doc/edit', data, function (res) {
                    if (res.status === 200){
                        $('#modal_common').modal('hide');
                        Utils.notify.info(res.message);
                    } else {
                        Utils.notify.info(res.message);
                    }
                    $('#data_table').DataTable().draw();
                });
            });


            $('#doc_id').val(record[0].id);
            $('#doc_title').val(record[0].title);
            // $("#doc_type").find('option[text="Java"]').attr("selected", true);
            // $("#doc_type").find('option[text="'+record[0].type+'"]').attr('selected', true);
            $('#doc_type option').filter(function () {
                if ($(this).text() == record[0].type) {
                    $(this).attr("selected", "selected");
                }
            });
            $(".summernote").summernote('code', record[0].content);

            $('#modal_common').modal('show');
        });
    };

    return {
        init: function () {
            doc();
        }
    }
}();
$(document).ready(function () {
    DocFunction.init()
});