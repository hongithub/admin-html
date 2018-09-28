var LoginFunction = function () {

    var login = function () {
        $('#btn_login').on('click', function () {
            localStorage.setItem("server", 'http://127.0.0.1:8080');
            var data = {
                'username': $('#username').val(),
                'password': $('#password').val()
            };
            // document.location.href = 'dashboard.html';
            Utils.ajax.getJsonByAjaxWithSync('/user/login', data, function (res) {
                if (res.status === 200) {
                    Utils.notify.info(res.message);
                    localStorage.setItem("user", res.data.user);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("basePath", res.data.basePath);
                    localStorage.setItem("server", res.data.server);

                    window.location.href = localStorage.getItem("basePath")+res.url;
                } else {
                    Utils.notify.error(res.message);
                }
            });
        });
    };

    return {
        init: function () {
            login();
        }
    }
}();
$(document).ready(function () {
    LoginFunction.init()
});