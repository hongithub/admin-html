var initFunction = function () {

    var initMenu = function () {
        Utils.ajax.getJsonByAjaxWithSync('/menu', null, function (res) {
            if (res.status === 200) {
                $('#load_menus').html(template('foreach_menus', res));
            } else {
                Utils.notify.error(res.message);
            }
        });
    };
    
    var initHeaderAndFooter = function () {
        $('#load_header').load('header-footer/header.html');
        $('#load_footer').load('header-footer/footer.html');
    };

    var loadContentByUrl = function () {
        $('#load_menus .m-menu__submenu a').on('click', function () {
            $('#load_content').load($(this).attr('url'));
        });
    };

    var styleAdd = function () {
        $('.m-menu__subnav .m-menu__item').on('click', function () {
            $('.m-menu__item').removeClass('m-menu__item--active')
            $(this).addClass('m-menu__item--active');
        });
    };


    return {
        init: function () {
            initMenu();
            initHeaderAndFooter();
            loadContentByUrl();
            styleAdd();
        }
    }
}();
$(document).ready(function () {
    initFunction.init()
});