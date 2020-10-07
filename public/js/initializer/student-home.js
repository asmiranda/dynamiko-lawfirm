class StudentHome {

    initListeners() {
        console.log(`token = ${storage.getToken()}`);
        let context = this;

        $(document).on('click', '.btnCheckAllSubmissions', function () {
            context.btnCheckAllSubmissions(this);
        });
        $(document).on('click', '.btnUploadActivityInstruction', function () {
            context.btnUploadActivityInstruction(this);
        });
        $(document).on('click', '.btnUploadActivity', function () {
            context.btnUploadActivity(this);
        });
        $(document).on('click', '#btnLogin', function () {
            context.handleLogin();
        });
        $(document).on('click', '.btnSchedule', function () {
            context.btnSchedule(this);
        });
        $(document).on('click', '.btnCall', function () {
            context.btnCall(this);
        });
        $(document).on('click', '.btnShowProfile', function () {
            context.btnShowProfile(this);
        });
        $(document).on('click', '.btnFullScreen', function () {
            context.btnFullScreen(this);
        });
        $(document).on('click', '.btnBook', function () {
            context.btnBook(this);
        });
        $(document).on('click', '.btnActivities', function () {
            context.btnActivities(this);
        });
        $(document).on('click', '.btnFacultyAndStudents', function () {
            context.btnFacultyAndStudents(this);
        });
        $(document).on('click', '.btnChat', function () {
            context.btnChat(this);
        });
        $(document).on('click', '.btnEndCall', function () {
            context.btnEndCall(this);
        });
        $(document).on('click', '.btnSaveNetworkBandwidth', function () {
            context.btnSaveNetworkBandwidth(this);
        });
        $(document).on('click', '.btnAddVideo', function () {
            context.btnAddVideo(this);
        });
        $(document).on('click', '.btnRemoveVideo', function () {
            context.btnRemoveVideo(this);
        });
        $(document).on('click', '.btnMute', function () {
            context.btnMute(this);
        });
        $(document).on('click', '.btnUnmute', function () {
            context.btnUnmute(this);
        });
        $(document).on('click', '.btnSendChatMessage', function () {
            context.btnSendChatMessage(this);
        });
        $(document).on('dataChannelMessageReceived', function () {
            context.dataChannelMessageReceived(event);
        });
        $(document).on('click', '.btnHideChatScreen', function () {
            context.btnHideChatScreen(event);
        });
        $(document).on('click', '.btnScreenSharing', function () {
            console.log("on click btnScreenSharing")
            context.btnScreenSharing(event);
        });
        $(document).on('click', '.miniVideoStream', function () {
            context.displaySelectedVideo(this);
        });
        $(document).on('click', '.remoteMiniVideoStream', function () {
            context.displaySelectedVideo(this);
        });
    }

    btnScreenSharing() {
        console.log("btnScreenSharing")
        socketIOP2P.shareScreen();
    }

    btnHideChatScreen() {
        $("#chatScreen").hide();
    }

    btnMute() {
        socketIOMediaStream.localVideo.getAudioTracks()[0].enabled = false;
        // $(`.btnAddVideo`).hide();
        // $(`.btnRemoveVideo`).hide();
        $(`.btnUnmute`).show();
        $(`.btnMute`).hide();
    }

    btnUnmute() {
        socketIOMediaStream.localVideo.getAudioTracks()[0].enabled = true;
        // $(`.btnAddVideo`).hide();
        // $(`.btnRemoveVideo`).hide();
        $(`.btnUnmute`).hide();
        $(`.btnMute`).show();
    }

    btnCall(obj) {
        $(`#meetingScreen`).show();
        $(`#activeVideoScreen`).show();

        $(`#activities`).hide();
        $(`#myVideo`).show();
        $(`#myVideoBlur`).show();
        $(`#myVideoActionButtons`).show();

        // $(`.btnAddVideo`).show();
        $(`.btnRemoveVideo`).show();
        // $(`.btnUnmute`).show();
        $(`.btnMute`).show();
        $(`.btnFullScreen`).show();

        $(`#activeVideo`).show();
        $(`#meetingScreen`).show();
        $(`#remoteVideos`).show();
        $(`.btnChat`).show();
        $(`#uploadScreen`).hide();
        $(`.btnEndCall`).show();
        $(`.btnCall`).hide();

        $(`.btnStartWebinar`).show();
        $(`.btnScreenSharing`).show();
        socketIOP2P.clearConnections();

        socketIOMediaStream.initVideo(function () {
            console.log("Local Media Started");
            socketIOMeetingRoom.init();
            socketIOMeetingRoom.join("Join Room", leftMenu.latestModuleCode);
        });
        this.onCall = true;
    }

    btnEndCall() {
        $(`#moduleHeader`).show();
        $(`#activities`).show();
        $(`#dailyRead`).hide();
        $(`#chatScreen`).hide();
        $(`#activeVideo`).hide();
        $(`#meetingScreen`).hide();
        $(`#remoteVideos`).hide();
        $(`#myModules`).show();

        $(`#myVideo`).hide();
        $(`#myVideoActionButtons`).hide();

        $(`.btnAddVideo`).hide();
        $(`.btnRemoveVideo`).hide();
        $(`.btnUnmute`).hide();
        $(`.btnMute`).hide();
        $(`.btnFullScreen`).hide();
        $(`.btnChat`).hide();
        $(`#chatScreen`).hide();
        $(`.btnEndCall`).hide();
        $(`.btnCall`).show();

        $(`.btnStartWebinar`).hide();
        $(`.btnScreenSharing`).hide();
        this.onCall = false;
        socketIOP2P.clearConnections();
        socketIOMediaStream.localVideo.getVideoTracks()[0].stop();
        socketIOMediaStream.localVideo.getAudioTracks()[0].stop();
    }

    btnActivities() {
        $(`#moduleHeader`).show();
        $(`#activities`).show();
        $(`#dailyRead`).hide();
        $(`#chatScreen`).hide();
        $(`#studentList`).hide();
        $(`#activeVideo`).hide();
        $(`#remoteVideos`).hide();
        $(`#uploadScreen`).hide();
    }

    btnFacultyAndStudents() {
        $(`#moduleHeader`).show();
        $(`#activities`).hide();
        $(`#dailyRead`).hide();
        $(`#studentList`).show();
        $(`#chatScreen`).hide();
        $(`#activeVideo`).hide();
        $(`#remoteVideos`).hide();
        $(`#uploadScreen`).hide();
    }

    btnChat() {
        $(`#moduleHeader`).show();
        $(`#activities`).hide();
        $(`#dailyRead`).hide();
        $(`#studentList`).hide();
        $(`#chatScreen`).show();
        $(`#studentList`).hide();
        $(`#activeVideo`).hide();
        $(`#remoteVideos`).hide();
    }

    btnCheckAllSubmissions(obj) {
        let section = $(obj).attr("section");
        let subject = $(obj).attr("subject");
        let activityId = $(obj).attr("activityId");
        this.loadSubmissions(section, subject, activityId);
    }

    loadSubmissions(section, subject, activityId) {
        let url = `${MAIN_URL}/api/generic/widget/SchoolUI/getSubmissions/${section}/${subject}/${activityId}`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let successFunction = function (data) {
            studentHome.arrangeSubmissions(data);
            $("div#allSubmissionsModal").dialog({
                modal: true
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeSubmissions(data) {
        $("#studentSubmissionList").empty();
        $(data).each(function (index, obj) {
            let fullName = `${obj.lastName}, ${obj.firstName}`;
            let str = `
                <div>
                    <a href="/api/pgeneric/download/activity-student/${obj.uploadedBy}/${obj.key}/${obj.subKey}" target="_blank" style="font-size: x-small;">${fullName}</a>
                </div>
            `;
            $("#studentSubmissionList").append(str);
        });
    }

    btnUploadActivityInstruction(obj) {
        let section = $(obj).attr("section");
        let subject = $(obj).attr("subject");
        let activityId = $(obj).attr("activityid");
        let uploadUrl = `/api/generic/attachment/upload/activity-instruction/${section}-${subject}/${activityId}`;
        console.log(`uploadUrl = ${uploadUrl}`);
        mainInitializer.uploadFileDropZone.options.url = uploadUrl;

        $("div#uploadFileDropZoneModal").attr("title", "Upload Activity Instruction");
        $("div#uploadFileDropZoneModal").dialog({
            modal: true
        });
    }

    btnUploadActivity(obj) {
        let section = $(obj).attr("section");
        let subject = $(obj).attr("subject");
        let activityId = $(obj).attr("activityid");
        let uploadUrl = `/api/generic/attachment/upload/activity-student/${section}-${subject}/${activityId}`;
        console.log(`uploadUrl = ${uploadUrl}`);
        mainInitializer.uploadFileDropZone.options.url = uploadUrl;

        $("div#uploadFileDropZoneModal").attr("title", "Upload Activity");
        $("div#uploadFileDropZoneModal").dialog({
            modal: true
        });
    }

    displaySelectedVideo(obj) {
        let activeVideo = document.getElementById("activeVideo")
        activeVideo.srcObject = obj.srcObject

        $(`#meetingScreen`).show();
        $(`#activities`).hide();
        $(`#myVideo`).show();
        $(`#myVideoActionButtons`).show();

        // $(`.btnAddVideo`).show();
        $(`.btnRemoveVideo`).show();
        // $(`.btnUnmute`).show();
        $(`.btnMute`).show();

        $(`#activeVideo`).show();
        $(`#meetingScreen`).show();
        $(`#remoteVideos`).show();
        $(`.btnChat`).show();

        $(`#chatScreen`).hide();
        $(`#activities`).hide();
        $(`#dailyRead`).hide();
        $(`#studentList`).hide();
        $(`#uploadScreen`).hide();
    }

    dataChannelMessageReceived(evt) {
        let message = evt.detail.data;
        let obj = JSON.parse(message);
        if (obj.dataType == 'Chat') {
            this.handleChatMessage(obj);
        }
        else if (obj.dataType == 'SaveMode') {
            this.handleRemoteSaveMode(obj);
        }
        else if (obj.dataType == 'UnsaveMode') {
            this.handleRemoteUnsaveMode(obj);
        }
        else if (obj.dataType == 'StartWebinar') {
            this.handleStartWebinarRequest(obj);
        }
        else if (obj.dataType == 'EndWebinar') {
            this.handleEndWebinarRequest(obj);
        }
        else if (obj.dataType == 'ShareScreen') {
            this.handleShareScreen(obj);
        }
        else if (obj.dataType == 'UnshareScreen') {
            this.handleUnshareScreen(obj);
        }
    }

    handleShareScreen(obj) {
        socketIOP2P.handleShareScreen(obj);
    }

    handleUnshareScreen(obj) {
        socketIOP2P.handleUnshareScreen(obj);
    }

    handleStartWebinarRequest(obj) {
        socketIOP2P.handleStartWebinarRequest(obj);
    }

    handleEndWebinarRequest(obj) {
        socketIOP2P.handleEndWebinarRequest(obj);
    }

    handleRemoteUnsaveMode(obj) {
        socketIOP2P.handleRemoteUnsaveMode()
    }

    handleRemoteSaveMode(obj) {
        socketIOP2P.handleRemoteSaveMode()
    }

    handleChatMessage(obj) {
        let remoteProfile = obj.profileName;
        let messageStr = obj.message;
        let str = `
            <div style="width: 100%;">
                <a href="#" class="name">${remoteProfile}</a>
                <p class="message">${messageStr}</p>
            </div>
        `;
        console.log(str);
        $("#chatBox").append(str);
    }

    btnSendChatMessage(obj) {
        let chatUser = $("#selectChatUser").val();
        let chatMessage = $("#txtChatMessage").val();

        let str = `
            <div style="width: 100%;">
                <p class="message" style="color:#767dcd">${chatMessage}</p>
            </div>
        `;
        $("#chatBox").append(str);

        socketIOP2P.sendChatMessage(chatUser, chatMessage);
    }

    btnAddVideo() {
        socketIOMediaStream.localVideo.getVideoTracks()[0].enabled = true;
        $(`.btnAddVideo`).hide();
        $(`.btnRemoveVideo`).show();
        // $(`.btnUnmute`).hide();
        // $(`.btnMute`).hide();

        $(`#myVideo`).show();
        $(`#myVideoBlur`).show();
        $(`#myVideoActionButtons`).show();
    }

    btnRemoveVideo() {
        socketIOMediaStream.localVideo.getVideoTracks()[0].enabled = false;
        $(`.btnAddVideo`).show();
        $(`.btnRemoveVideo`).hide();
        // $(`.btnUnmute`).hide();
        // $(`.btnMute`).hide();

        $(`#myVideo`).hide();
        $(`#myVideoBlur`).hide();
        $(`#myVideoActionButtons`).hide();
    }

    btnSaveNetworkBandwidth() {
        if (this.saveMode) {
            socketIOP2P.unsaveBandWidth();
            this.saveMode = false;
        }
        else {
            var r = confirm("Power and network bandwidth saving mode?");
            if (r) {
                socketIOP2P.saveBandWidth();
            }
            this.saveMode = true;
        }
    }

    btnSchedule(obj) {
        let section = $(obj).attr("section");
        let subject = $(obj).attr("subject");
        this.loadModuleDetail(section, subject);
        this.loadActivities(section, subject);
        this.loadStudents(section, subject);
    }

    handleLogin() {
        let context = this;
        let uname = $("#email").val();
        let passw = $("#password").val();
        loginJS.login(uname, passw, function (data) {
            storage.setToken(data.Authorization);
            storage.getUname(uname);
            context.init();
        });
    }

    loadProfile() {
        let person = storage.get("Person");
        $("#myProfileName").html(person.firstName);
    }

    loadSchedules() {
        let person = storage.get("Person");
        this.arrangeSchedules(person.schedules);
    }

    arrangeSchedules(data) {
        console.log(data);
        $("#moduleList").empty();
        var boxBackGrounds = ['bg-aqua', 'bg-green', 'bg-yellow', 'bg-red', 'bg-aqua', 'bg-green', 'bg-yellow', 'bg-red', 'bg-aqua', 'bg-green', 'bg-yellow', 'bg-red'];
        let section = "";
        let subject = "";
        let time = "";
        $(data).each(function (index, obj) {
            section = obj.getPropDefault("section", "--");
            subject = obj.getPropDefault("subject", "--");
            time = obj.getPropDefault("time", "--");
            let nextColor = boxBackGrounds[index];
            let str = `
                <div style="flex: 1; min-width: 100px;">
                    <!-- small box -->
                    <div class="small-box ${nextColor} btnSchedule" style="margin: 10px;" section="${section}" subject="${subject}" time="${time}">
                        <div class="inner">
                            <span>${subject}</span>
                        </div>
                    </div>
                </div>
            `;
            $("#moduleList").append(str);
        });
        this.loadModuleDetail(section, subject);
        this.loadActivities(section, subject);
        this.loadStudents(section, subject);
    }

    loadModuleDetail(section, subject, time) {
        leftMenu.latestModuleCode = section + "-" + subject;
        $("#moduleProfile").html(section + "-" + subject);
        $("#moduleProfile").attr("section", section);
        $("#moduleProfile").attr("subject", subject);
        let dailyReadingUrl = `${MAIN_URL}/api/pgeneric?widget=SchoolUI&action=getDailyReading&term1=${section}&term2=${subject}&term3=${time}`;
        let trueUrl = `${dailyReadingUrl}`;
        $("#dailyReadingPDF").attr("src", trueUrl);
    }

    loadStudents(section, subject, time) {
        let url = `${MAIN_URL}/api/generic/widget/SchoolUI/getStudents/${section}/${subject}/${time}`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let successFunction = function (data) {
            studentHome.arrangeStudents(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeStudents(data) {
        $("#studentImageRoster").empty();
        $(data).each(function (index, obj) {
            let fullName = `${obj.getPropDefault("firstName", "--")} ${obj.getPropDefault("lastName", "--")}`;
            let str = `
                <li style="width: 70%;">
                    <a class="users-list-name text-left" href="#">${fullName}</a>
                </li>
            `;

            $("#studentImageRoster").append(str);
        });
        $(".studentCount").html(`${data.length} students`);
    }

    loadActivities(section, subject) {
        let url = `${MAIN_URL}/api/generic/widget/SchoolUI/getActivities/${section}/${subject}`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let successFunction = function (data) {
            studentHome.arrangeActivities(section, subject, data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeActivities(section, subject, data) {
        $("#ActivityList").empty();
        $(data).each(function (index, obj) {
            let activityId = obj.getPropDefault("_id", "");
            let type = obj.getPropDefault("type", "");
            let title = obj.getPropDefault("title", "");
            let content = obj.getPropDefault("content", "");
            let time = obj.getPropDefault("time", "");
            let attachment = obj.getPropDefault("attachment", "");
            let icon = "fa fa-cogs";
            let icon_color = 'bg-red';
            if (type != 'Exam') {
                icon = 'fa fa-pencil-square-o'
                icon_color = 'bg-green'
            }
            let str = `
                <div style="flex: 80%; margin: 2px 15px;">
                    <div class="box box-info">
                        <div class="box-header with-border">
                            <h3 class="box-title">${type}</h3>
                            <div class="pull-right box-tools">
                                <a href="#" section="${section}" subject="${subject}" activityId="${activityId}" class="btnUploadActivity" style="font-size: x-small;"><i class="fa fa-upload"></i> Upload</a>
                                <a href="/api/pgeneric/download/activity-student/${storage.get("Person").email}/${section}-${subject}/${activityId}" target="_blank" style="margin-left: 10px; font-size: x-small;"><i class="fa fa-download"></i> Download</a>
                            </div>
                        </div>
                        <div class="box-body">
                            <a href="#">${title} - ${time}</a> 
                            <a href="/api/pgeneric/download/activity-instruction/${storage.get("Person").email}/${section}-${subject}/${activityId}" target="_blank" style="font-size: x-small;"><i class="fas fa-paperclip"></i></a>
                            <br/><small>${content}</small>
                        </div>
                    </div>
                </div>
            `;
            $("#ActivityList").append(str);
        });
    }

    init() {
        this.saveMode = false;
        this.webinarMode = false;
        this.initListeners();
        if (storage.getToken() && storage.getToken().length > 20) {
            $("#welcome").show();

            this.loadProfile();
            this.loadSchedules();
        }
        else {
            $("#welcome").hide();
        }
    }
}

$(function () {
    studentHome = new StudentHome();
})