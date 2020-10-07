class TasksWidget {
    constructor() {
        var context = this;
        console.log("Testing Task Widget");

        $(document).on('click', '.btnStartTask', function () {
            context.startTask();
        });
        $(document).on('click', '.taskLinker', function () {
            context.taskLinker(this);
        });
        this.loadTask();
    }

    startTask() {
        var moduleName = $("#selectStartTaskWidget").val();
        // var formLinker = new FormLinker();
        // formLinker.linkToForm(moduleName);
    }

    loadTask() {
        var context = this;
        var companyCode = storage.getCompanyCode();
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/TasksWidget/all';
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            context.clearInbox();
            $(data).each(function (index, obj) {
                console.log(obj);
                console.log(storage.uname);
                var wfMessageId = obj.getProp("WfMessageId");
                var fromAssignee = obj.getProp("fromAssignee");
                var toAssignee = obj.getProp("toAssignee");
                var description = obj.getProp("description");
                var dateSent = new Date(obj.getProp("dateSent"));
                var dateStr = moment(dateSent).format('DD MMM HH:mm a');
                var latestWfStatus = obj.getProp("latestWfStatus");
                var senderActionStr = obj.getProp("senderActionStr");
                var receiverActionStr = obj.getProp("receiverActionStr");
                var senderId = obj.getProp("senderId");
                var receiverId = obj.getProp("receiverId");
                var senderName = obj.getProp("senderName");
                var receiverName = obj.getProp("receiverName");
                var entity = obj.getProp("entity");
                var entityId = obj.getProp("entityId");

                var str = `
                    <div class="direct-chat-msg __class__">
                        <div class="direct-chat-info clearfix">
                            <span class="direct-chat-name pull-left">__personname__</span>
                            <span class="direct-chat-timestamp pull-right">${dateStr}</span>
                        </div>
                        <img class="direct-chat-img" src="${MAIN_URL}/api/generic/${companyCode}/profilePic/PersonUI/__personId__" alt="User">
                        <div class="direct-chat-text cursor-pointer taskLinker" module="${entity}" recId="${entityId}">${description}</div>
                    </div>
                `;
                // console.log(str);
                if (latestWfStatus == 'COMPLETED') {
                    str = str.replace("__personId__", senderId);
                    str = str.replace("__personname__", "Completed By: " + senderName);
                    $(".forCompletedMessage").append(str);
                }
                else {
                    if (storage.uname == toAssignee) {
                        str = str.replace("__class__", "right");
                        str = str.replace("__personId__", receiverId);
                    }
                    else {
                        str = str.replace("__personId__", senderId);
                    }
                    str = str.replace("__personname__", "FROM: " + senderName + " ==> " + receiverName);

                    if (latestWfStatus == 'SUBMIT') {
                        $(".forEndorsementMessage").append(str);
                    }
                    else {
                        $(".forApprovalMessage").append(str);
                    }
                }
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    taskLinker(obj) {
        var moduleName = $(obj).attr("module");
        var recId = $(obj).attr("recID");
        // var formLinker = new FormLinker();
        // formLinker.linkToForm(moduleName+"UI", recId);
    }

    clearInbox() {
        $(".forEndorsementMessage").empty();
        $(".forApprovalMessage").empty();
    }
}
