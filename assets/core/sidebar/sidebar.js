//==加载局部页面函数
var Sidebar = function() {

    /* 加载函数 */
    var load = function() {
        var loadSidebar = function(url, callBackFunc) {
            $("#msg_sidebar").empty();
            $("#msg_sidebar").load(url, function() {
                if( typeof(callBackFunc) === "function") {
                    callBackFunc();
                }
            });
        };

        return{
            openSidebar : function(url, callBackFunc) {
                loadSidebar(url, callBackFunc);
            }
        };
    }();

    return {
        load : load
    };
}();