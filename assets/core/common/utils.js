var Utils = function () {

    /* 设置ajax样式 */
    var ajax = function () {
        /* 设置默认的全局配置，开启跨域 */
        var setup = function () {
            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                },
            });
        };

        /**
         * 同步ajax调用
         *
         * url 请求地址 data 请求参数 successCallback
         */
        var getJsonByAjaxWithSync = function (url, data, successCallback) {
            setup();
            $.ajax({
                type: "POST",
                async: false,
                url: localStorage.getItem('server') + url,
                headers:{
                    'user':localStorage.getItem('user'),
                    'token':localStorage.getItem('token')
                },
                data: data,
                dataType: "JSON",
                success: function (res) {
                    successCallback(res);
                },
                error: function (res) {
                    notify.error('请求服务器失败！');
                }
            });
        };

        /**
         * 异步ajax调用
         *
         * url 请求地址 data 请求参数 successCallback
         */
        var getJsonByAjaxWithAsync = function (url, data, successCallback) {
            setup();
            $.ajax({
                type: "POST",
                async: true,
                url: localStorage.getItem('server') + url,
                headers:{
                    'user':localStorage.getItem('user'),
                    'token':localStorage.getItem('token')
                },
                data: data,
                dataType: "JSON",
                success: function (res) {
                    successCallback(res);
                },
                error: function (res) {
                    //这里调用一个，封装好的js错误提醒函数，具体怎么写要看前端框架对于报错采用什么方式
                    alert("网络错误！");
                }
            });
        }

        return {
            getJsonByAjaxWithAsync: getJsonByAjaxWithAsync,
            getJsonByAjaxWithSync:getJsonByAjaxWithSync
        }
    }();

    /* 设置操作提示窗 */
    var notify = function() {

        options = {
            "closeButton" : true,
            "debug" : false,
            "newestOnTop" : false,
            "progressBar" : false,
            "positionClass" : "toast-bottom-right",
            "preventDuplicates" : false,
            "onclick" : null,
            "showDuration" : "300",
            "hideDuration" : "1000",
            "timeOut" : "3000",
            "extendedTimeOut" : "1000",
            "showEasing" : "swing",
            "hideEasing" : "linear",
            "showMethod" : "fadeIn",
            "hideMethod" : "fadeOut"
        };

        var notifyInfo = function(type, msg) {
            toastr.options = options;
            toastr[type](msg, "");
        }

        return {
            info : function(msg) {
                notifyInfo("success", msg);
            },
            error : function(msg) {
                notifyInfo("error", msg);
            },
            delSuccess : function(msg) {
                notifyInfo("success", msg);
            },
            requestError : function() {
                notifyInfo("error", "请求失败，请检查网络连接！");
            },
            responseError : function() {
                notifyInfo("error", "响应失败，请检查网络连接！");
            },
            delError : function() {
                notifyInfo("error", "删除失败，请检查网络连接！");
            },
            cancel : function() {
                notifyInfo("error", "操作取消！");
            }

        };
    }();
    
    var table = function () {

        //table settings
        var lang = {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        };

        var initTable = function (id, uri, columns, def) {
            var table = $(id).DataTable({
                ordering:!1,
                searching: !1,
                lengthChange: !1,
                destroy: !0,
                responsive: !0,
                serverSide: !0,
                processing: !0,
                ajax: {
                    url: localStorage.getItem('server') + uri,
                    type: "POST",
                    dataType: "json",
                    headers:{
                        'user':localStorage.getItem('user'),
                        'token':localStorage.getItem('token')
                    }
                },
                headerCallback: function(e) {
                    e.getElementsByTagName("th")[0].innerHTML = '<label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand"><input type="checkbox" value="" class="m-group-checkable"><span></span></label>'
                },
                columnDefs:[
                    {
                        defaultContent: "",
                        targets: "_all"
                    },
                    {
                        targets: 0,
                        width: "30px",
                        data: 'id',
                        className: "dt-right",
                        orderable: !1,
                        render: function() {
                            return '<label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand"><input type="checkbox" value="" class="m-checkable"><span></span></label>'
                        }
                    },
                    def,
                    {
                        targets: -1,
                        title: "操作",
                        className: 'text-center',
                        orderable: !1,
                        render: function() {
                            return '<a href="javascript:void(0);" name="type_edit" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="编辑"><i class="la la-edit"></i></a>'
                        }
                    }
                ],
                // dom:'<"top"i>rt<"bottom"iflp>',
                dom:'rt<"bottom"ip>',
                oLanguage: lang,
                columns: columns,
                iTabIndex: -1,   // 关闭键盘导航
            });

            table.on("change", ".m-group-checkable", function() {
                var e = $(this).closest("table").find("td:first-child .m-checkable");
                var flag = $(this).is(":checked");
                $(e).each(function() {
                    flag ? ($(this).prop("checked", !0), $(this).closest("tr").addClass("active")) : ($(this).prop("checked", !1), $(this).closest("tr").removeClass("active"));
                })
            });
            table.on("change", "tbody tr .m-checkbox", function() {
                $(this).parents("tr").toggleClass("active");
            });
        };

        return {
            initTable : function (id, uri, columns, def) {
                initTable(id, uri, columns, def);
            }
        };
    }();

    var tree = function () {
        var initTree = function (id, uri) {
            $(id).jstree({
                core: {
                    themes: {
                        responsive: !1
                    },
                    check_callback: !0,
                    data: function (who, callBack) {
                        var data;
                        $.ajax({
                            type: 'POST',
                            url: localStorage.getItem('server') + uri,
                            async: false,
                            headers: {
                                'user': localStorage.getItem('user'),
                                'token': localStorage.getItem('token'),
                            },
                            success: function(res) {
                                data = res.data;
                            },
                        });
                        callBack.call(this, data);
                    }
                },
                types: {
                    file: {
                        icon: "fa fa-file  m--font-brand"
                    }
                },
                state: {
                    key: "demo3"
                },
                plugins: ["dnd", "state", "types"]
            });
        };

        return {
            initTree : function (id, uri) {
                initTree(id, uri);
            }
        };
    }();

    var upload = function () {

        var initUpload = function (id, uri) {
            $(id).dropzone({
                url : localStorage.getItem('server') + uri,
                headers: {
                    'user': localStorage.getItem('user'),
                    'token': localStorage.getItem('token'),
                },
                method : "POST",
                paramName: "files",
                uploadMultiple : !0,
                addRemoveLinks : !0,
                autoProcessQueue : !1,
                maxFiles : 10,
                maxFilesize : 10,
                acceptedFiles : ".xlsx,.xls",
                dictRemoveFile :'移除',
                dictResponseError : '上传失败',
                dictInvalidFileType :'对不起，上传的文件类型只能为xls、xlsx',

                init:function () {
                    $('#btn_submit').on('click', function () {
                        Dropzone.forElement(".dropzone").processQueue();
                    });

                    this.on("success", function(file, res) {
                        if (res.status === 200) {
                            console.log(res.data);
                            notify.info(file.name + '，' + res.message);
                        } else {
                            notify.error(file.name + '，' + res.message);
                        }
                        this.removeAllFiles();
                    });

                    this.on("error", function(file, res) {
                        notify.error("请求服务器失败！");
                        this.removeAllFiles();
                    });
                }
                });
        };

        return {
            initUpload : function (id, uri) {
                initUpload(id, uri);
            }
        };
    }();

    var select = function () {

        var load = function (id, url) {
            ajax.getJsonByAjaxWithAsync(url, null, function (res) {
                var data = res.data;

                $(id).empty();
                $(id).append('<option value="">请选择</option>');

                for (index in data) {
                    $(id).append('<option value=' + data[index].id + '>' + data[index].type + '</option>');
                }
            });
        };

        return {
            load : function (id, url) {
                load(id, url);
            }
        }
    }();

    return {
        ajax: ajax,
        notify:notify,
        table:table,
        tree:tree,
        upload:upload,
        select:select
    };
}();