var SocketFunction = function () {

    var url = "ws://localhost:8080/ws";
    var name = localStorage.getItem('user');


    var chat = function () {
        if ('WebSocket' in window) {
            websocket = new WebSocket(url);
        } else {
            Utils.notify.error('请使用火狐或谷歌浏览器！')
            return;
        }
        //连接发生错误的回调方法
        websocket.onerror = function () {
            var text = name + "聊天中断，请刷新页面！";
            send(text, 1);
        };

        //连接成功建立的回调方法
        websocket.onopen = function () {
            var text = name + "，加入聊天室";
            send(text, 1);
        };

        //接收到消息的回调方法
        websocket.onmessage = function (event) {
            setMessageInnerHTML(event.data);
        };

        //连接关闭的回调方法
        websocket.onclose = function () {
            var text = name + "，离开聊天室";
            send(text, 1);
        };
    };

    //将消息显示在网页上
    var setMessageInnerHTML = function (res) {
        var json = JSON.parse(res);
        var html = null;
        switch (json.status) {
            case 1:
                html = '<div class="m-messenger__datetime">' + json.content + '</div>';
                break;
            case 2:
                if(json.name != name){
                    html = '<div class="m-messenger__wrapper">' +
                        '       <div class="m-messenger__message m-messenger__message--in">' +
                        '           <div class="m-messenger__message-pic">' +
                        '               <img src="../assets/global/app/media/img//users/user3.jpg" alt=""/>' +
                        '           </div>' +
                        '           <div class="m-messenger__message-body">' +
                        '               <div class="m-messenger__message-arrow"></div>' +
                        '                   <div class="m-messenger__message-content">' +
                        '                       <div class="m-messenger__message-username">' + json.name +'</div>' +
                        '                       <div class="m-messenger__message-text">' +json.content + '</div>' +
                        '                   </div>' +
                        '               </div>' +
                        '            </div>' +
                        '       </div>'
                }else{
                    html = '<div class="m-messenger__wrapper">' +
                        '       <div class="m-messenger__message m-messenger__message--out">' +
                        '            <div class="m-messenger__message-body">' +
                        '                 <div class="m-messenger__message-arrow"></div>' +
                        '                      <div class="m-messenger__message-content">' +
                        '                           <div class="m-messenger__message-text">' + json.content + '</div>' +
                        '                 </div>' +
                        '            </div>' +
                        '        </div>' +
                        '    </div>';
                }
                break;
        }
        $('#box_msg').append(html);
    };

    $('#btn_submit').on('click', function () {
        send($('#send_msg').val(), 2);
        $('#send_msg').val('');
    });

    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    $('#load_menus .m-menu__submenu').on('click', function () {
        closeWebSocket();
    });

    window.refresh = function () {
        closeWebSocket();
    };

    //关闭WebSocket连接
    var closeWebSocket = function () {
        if (websocket != null) {
            websocket.close();
        }
    };

    //发送消息
    var send = function (text, status) {

        var data = {
            content: text,
            name :name,
            status: status,
        };

        if (websocket == null) {
            chat();
        }

        websocket.send(JSON.stringify(data));
    };


    return {
        init: function () {
            chat();
        }
    }
}();

$(document).ready(function () {
    SocketFunction.init()
});