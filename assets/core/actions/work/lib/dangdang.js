var DangDangFunction = function () {

    var dangdang = function () {
        var columns = [
            {},
            {
                data: "name",
                title: '姓名',
                className: 'text-center',
            },
            {
                data: "address",
                title: '家庭住址',
                className: 'text-center',
            },
            {
                data: "tel",
                title: '电话',
                className: 'text-center',
            },
            {
                data: "email",
                title: '邮箱',
                className: 'text-center',
            },
            {}
        ];

        Utils.table.initTable('#data_table', '/dangdang', columns, {});

        Utils.upload.initUpload('#upload_files', '/dangdang/upload');

        $('#btn_upload').on('click', function () {
            $('#modal_upload').modal('show');
        });

        $('#btn_edit').on('click', function () {

        });


    };

    return {
        init: function () {
            dangdang();
        }
    }
}();
$(document).ready(function () {
    DangDangFunction.init()
});