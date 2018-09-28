var InitLoadSidebar = function () {
    var t = $("#msg_sidebar");
    var e = $("#msg_sidebar_tabs");
    var a = t.find(".m-quick-sidebar__content");
    var n = function () {
        !function () {
            var a = $("#msg_sidebar_tabs_messenger");
            if (0 !== a.length) {
                var n = a.find(".m-messenger__messages"), o = function () {
                    var o = t.outerHeight(!0) - e.outerHeight(!0) - a.find(".m-messenger__form").outerHeight(!0) - 120;
                    n.css("height", o), mApp.initScroller(n, {})
                };
                o(), mUtil.addResizeHandler(o)
            }
        }();
        };
    return {
        init: function () {
            0 !== t.length && new mOffcanvas("msg_sidebar", {
                overlay: !0,
                baseClass: "m-quick-sidebar",
                closeBy: "close_msg_sidebar",
                toggleBy: "open_msg_sidebar"
            }).one("afterShow", function () {
                mApp.block(t), setTimeout(function () {
                    mApp.unblock(t), a.removeClass("m--hide"), n()
                }, 1e3)
            })
        }
    }
}();
$(document).ready(function () {
    InitLoadSidebar.init();
});