class ChatWidget {
    constructor() {
        var context = this;
        $(document).on('click', '#btnChatMessage', function () {
            context.sendBot();
        });
        $(document).on('click', '#userChatMessage', function () {
            if (e.keyCode === 13) {
                context.sendBot();
            }
        });
    }

    sendBot() {
        var context = this;

        var value = $("#userChatMessage").val();
        if (value && value.trim() != "") {
            var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/ChatWidget/' + value;
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");
            var successCallback = function (data) {
                console.log(data);
                context.writeFromUser(value)
                context.writeFromBot(data);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
    }

    writeFromUser(value) {
        var str = `
        <div class="direct-chat-msg right">
            <div class="direct-chat-text">
                ${value}
            </div>
        </div>
        `;
        $(".chatWidgetMessages").append(str);
        $("#userChatMessage").val("");
        $(".chatWidgetMessages").stop().animate({ scrollTop: $(".chatWidgetMessages")[0].scrollHeight }, 1000);
    }

    writeFromBot(value) {
        var str = `
        <div class="direct-chat-msg">
            <div class="direct-chat-text">
                ${value}
            </div>
        </div>
        `;
        $(".chatWidgetMessages").append(str);
    }
}
