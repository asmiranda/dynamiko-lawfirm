class FacultyHome extends StudentHome {
    initListeners() {
        super.initListeners();
        let context = this;
        $(document).on('click', '.btnUploadPDF', function () {
            context.btnUploadPDF();
        });
        $(document).on('click', '.btnStartWebinar', function () {
            context.btnStartWebinar();
        });
        $(document).on('click', '.btnUploadFile', function () {
            context.btnUploadFile(this);
        });
        $(document).on('click', '.btnRemoveDailyReading', function () {
            context.btnRemoveDailyReading(this);
        });
        $(document).on('click', '.btnAddActivity', function () {
            context.btnAddActivity(this);
        });
        $(document).on('click', '.btnEditActivity', function () {
            context.btnEditActivity(this);
        });
        $(document).on('click', '.btnDeleteActivity', function () {
            context.btnDeleteActivity(this);
        });
        $(document).on('click', '.btnNewActivity', function () {
            context.btnNewActivity(this);
        });
        $(document).on('click', '.btnSaveActivity', function () {
            context.btnSaveActivity(this);
        });
        $(document).on('click', '.btnEditActivity', function () {
            context.btnEditActivity(this);
        });
    }

    btnNewActivity() {
        let scheduleCode = storage.get("scheduleCode");
        $(".selectedActivityCodeDisplay").attr("code", scheduleCode);
        $(".selectedActivityCodeDisplay").html("");
        $(`#selectedActivityCode`).val("");
        $(`#selectActivityType`).val("Quiz");
        $(`#activityText`).val("");
    }

    btnAddActivity() {
        let section = $("#moduleProfile").attr("section");
        let subject = $("#moduleProfile").attr("subject");
        $("#activityId").val("");
        $("#section").val(section);
        $("#subject").val(subject);
        $("#type").val("");
        $("#title").val("");
        $("#time").val("");
        $("#content").val("");

        $("div#editActivityModal").dialog({
            modal: true
        });
    }

    btnSaveActivity() {
        let context = this;
        let section = $("#section").val();
        let subject = $("#subject").val();
        let activityId = $("#activityId").val();
        let type = $("#type").val();
        let title = $("#title").val();
        let time = $("#time").val();
        let content = $("#content").val();

        var tmp = {};
        tmp["section"] = section;
        tmp["subject"] = subject;
        tmp["activityId"] = activityId;
        tmp["type"] = type;
        tmp["title"] = title;
        tmp["time"] = time;
        tmp["content"] = content;
        var vdata = JSON.stringify(tmp);

        let url = `${MAIN_URL}/api/generic/widget/SchoolUI/saveActivity`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        let successFunction = function (data) {
            console.log(data);
            context.arrangeActivities(section, subject, data);
            $("div#editActivityModal").dialog("close");
            $.toast({
                text: "Activity Saved",
                icon: "success",
                position: 'mid-center',
            })
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successFunction);
    }

    btnEditActivity(obj) {
        let section = $(obj).attr("section");
        let subject = $(obj).attr("subject");
        let activityId = $(obj).attr("activityId");

        let url = `${MAIN_URL}/api/generic/widget/SchoolUI/getActivity/${section}/${subject}/${activityId}`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let successFunction = function (data) {
            console.log(data)
            $("#section").val(section);
            $("#subject").val(subject);
            $("#activityId").val(activityId);
            $.each(data, function (index, record) {
                if (record._id == activityId) {
                    $("#type").val(record.type);
                    $("#title").val(record.title);
                    $("#content").val(record.content);
                    $("#time").val(record.time);
                }
            });
            $("div#editActivityModal").dialog({
                modal: true
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    btnDeleteActivity(obj) {
        let context = this;
        let section = $(obj).attr("section");
        let subject = $(obj).attr("subject");
        let activityId = $(obj).attr("activityId");

        let url = `${MAIN_URL}/api/generic/widget/SchoolUI/deleteActivity/${section}/${subject}/${activityId}`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");
        let successFunction = function (data) {
            console.log(data);
            context.arrangeActivities(section, subject, data);
            $.toast({
                text: "Activity Deleted",
                icon: "success",
                position: 'mid-center',
            })
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
                                <i class="fas fa-edit btnEditActivity" style="color: green;" section="${section}" subject="${subject}" activityId="${activityId}"></i> 
                                <i class="fas fa-trash btnDeleteActivity" style="margin-left: 10px; color: red;" section="${section}" subject="${subject}" activityId="${activityId}"></i> 
                            </div>
                        </div>
                        <div class="box-body">
                            <a href="#">${title} - ${time}</a> 
                            <br/><small>${content}</small>
                        </div>
                        <div class="box-footer text-center">
                            <a href="/api/pgeneric/download/activity-instruction/${storage.get("Person").email}/${section}-${subject}/${activityId}" target="_blank" style="font-size: x-small;"><i class="fas fa-paperclip"></i> Download</a>
                            <a href="#" section="${section}" subject="${subject}" activityId="${activityId}" class="btnUploadActivityInstruction" style="margin-left: 10px; font-size: x-small;"><i class="fa fa-upload"></i> Upload</a>                        
                            <a href="#" section="${section}" subject="${subject}" activityId="${activityId}" class="btnCheckAllSubmissions" style="margin-left: 10px; font-size: x-small;"><i class="fa fa-download"></i> All Submissions</a>
                        </div>
                    </div>
                </div>
            `;
            $("#ActivityList").append(str);
        });
    }

    btnRemoveDailyReading() {
        console.log("btnRemoveDailyReading");
        let scheduleCode = storage.get("scheduleCode");
        let url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SchoolUI/removeDailyReading/${scheduleCode}`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");
        let successFunction = function (data) {
            console.log(data);
            alert("Daily Reading Removed!");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    btnUploadFile() {
        console.log("btnUploadFile");
        let scheduleCode = storage.get("scheduleCode");

        var data = new FormData();
        var file = $('input#pdfFile').prop('files')[0];
        if (file.name.endsWith(".pdf")) {
            console.log("Received File");
            console.log(file.name);
            data.append("file", file);

            let successFunction = function (data) {
                alert("Daily Reading Uploaded!");
                console.log(data);
            };
            ajaxCaller.uploadFile(successFunction, "SchoolUI", scheduleCode, "pdf", data);
        }
        else {
            alert("Please select a PDF file.");
        }
    }

    btnUploadPDF() {
        console.log("btnUploadPDF");
        $(`#activities`).hide();
        $(`#studentList`).hide();
        $(`#myModules`).hide();
        $(`#dailyRead`).hide();
        $(`#chatScreen`).hide();
        $(`#removeVideo`).hide();
        $(`#activeVideo`).hide();

        $(`#uploadScreen`).show();
    }

    btnStartWebinar() {
        console.log("btnStartWebinar");
        if (this.webinarMode) {
            var r = confirm("End webinar mode?");
            if (r) {
                socketIOP2P.endWebinar();
                this.webinarMode = false;
            }
        }
        else {
            var r = confirm("Start webinar mode?");
            if (r) {
                socketIOP2P.startWebinar();
                this.webinarMode = true;
            }
        }
    }
}

$(function () {
    studentHome = new FacultyHome();
})