class NotificationUI extends AbstractSubUI {
    constructor() {
        super("NotificationUI");
        var context = this;
        $(document).on('click', `.btnReplyToNotification`, function () {
            context.btnReplyToNotification(this);
        });
    }

    btnReplyToNotification(obj) {
        var message = $(`textarea[name='replyMessage']`).val();
        console.log('btnReplyToNotification', message);

        var context = this;
        var recordId = $(obj).attr("recordId");
        var tmp = {};
        tmp["recordId"] = recordId;
        tmp["message"] = message;

        console.log(tmp);
        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/NotificationUI/post/replyMessageThread`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);

        var successFunction = function (ret) {
            console.log("btnReplyToNotification", url, ret);
            context.arrangeNotificationThread(ret);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successFunction);
    }

    onProfileLoaded(data) {
        console.log("On Profile Loaded called.", data);
        var context = this;
        var recordId = data.NotificationId;
        $(".btnReplyToNotification").attr("recordId", recordId);
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/NotificationUI/getMessageThread/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (ret) {
            console.log("onProfileLoaded", url, ret);
            context.arrangeNotificationThread(ret);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeNotificationThread(data) {
        $("#messageThread").empty();
        $(data).each(function (index, obj) {
            console.log(obj);
            var messageType = obj.getPropDefault("messageType", "");
            var message = obj.getPropDefault("message", "");
            var strChat = "";
            if (messageType == "Receive") {
                var fromEmail = obj.getPropDefault("fromEmail", "");
                var receivedDate = obj.getPropDefault("receivedDate", "");
                strChat = `
                    <div class="direct-chat-msg">
                        <div class="direct-chat-info clearfix">
                            <span class="direct-chat-name pull-left">${fromEmail}</span>
                            <span class="direct-chat-timestamp pull-right">${receivedDate}</span>
                        </div>
                        <div class="direct-chat-text">
                            ${message}
                        </div>
                    </div>
                `;
            }
            else {
                var replyByEmail = obj.getPropDefault("replyByEmail", "");
                var replyDate = obj.getPropDefault("replyDate", "");
                strChat = `
                    <div class="direct-chat-msg right">
                        <div class="direct-chat-info clearfix">
                            <span class="direct-chat-name pull-left">${replyByEmail}</span>
                            <span class="direct-chat-timestamp pull-right">${replyDate}</span>
                        </div>
                        <div class="direct-chat-text">
                            ${message}
                        </div>
                    </div>
                `;
            }
            $("#messageThread").append(strChat);
        });
    }

    newRecord() {
        this.clearModuleInputs(this.moduleName);
    }

    formatSearchList(index, obj, tabName) {
        var fromEmail = obj.getPropDefault("fromEmail", "");
        var emailReceiver = obj.getPropDefault("emailReceiver", "");
        var receivedDate = obj.getPropDefault("receivedDate", "");
        var message = obj.getPropDefault("message", "--");
        if (message.length > 30) {
            message = message.substr(0, 30);
        }
        var NotificationId = obj.getProp("NotificationId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 2;"><a href="#" class="${this.selectSearchRecord}" recordId="${NotificationId}" module="${this.moduleName}" tabName="${tabName}">${fromEmail}</a></div>
                <div style="flex: 2;">${emailReceiver}</div>
                <div style="flex: 1;">${receivedDate}</div>
                <div style="flex: 4;">${message}</div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    notificationUI = new NotificationUI();
});
