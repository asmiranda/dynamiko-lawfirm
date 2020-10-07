class SchoolUI extends AbstractUI {
    changeModule(evt) {
        admissionUI.loadTopRecords("Admission");
    }

    loadAnnouncements() {
        // $("#announcementContent").attr("src", ANNOUNCEMENT_URL);
    }

    loadStudents(scheduleCode) {
        utils.showSpin();
        let context = this;
        let url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SchoolUI/getStudents/${scheduleCode}`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let successFunction = function (data) {
            console.log("loadStudents", url, data);
            $(".studentImageRoster").empty();
            $(data).each(function (index, obj) {
                let code = obj.getPropDefault("code", "--");
                let profileUrl = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/PersonUI/${code}`;
                let fullName = `${obj.getPropDefault("firstName", "--")} ${obj.getPropDefault("lastName", "--")}`;
                let birthDate = `${obj.getPropDefault("birthDate", "--")}`;
                let str = `
                    <li>
                        <img src="${profileUrl}" alt="User Image">
                        <a class="users-list-name" href="#">${fullName}</a>
                        <span class="users-list-date">${birthDate}</span>
                    </li>
                `;

                $(".studentImageRoster").append(str);
            });
            utils.hideSpin();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadActivities(scheduleCode) {
        utils.showSpin();
        let url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SchoolUI/getActivities/${scheduleCode}`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let successFunction = function (data) {
            console.log("loadActivities", url, data);
            $(".ActivityList").empty();
            $(data).each(function (index, obj) {
                let SchoolScheduleTaskId = obj.getPropDefault("SchoolScheduleTaskId", "");
                let startDate = obj.getPropDefault("taskDate", "");
                let endDate = obj.getPropDefault("endDate", "");
                let taskType = obj.getPropDefault("taskType", "");
                let detail = obj.getPropDefault("detail", "");
                let str = `
                    <li class="time-label">
                        <span class="bg-red">
                            ${startDate}
                        </span>
                        <div class="box-tools pull-right" data-toggle="tooltip" title="">
                            <a class="btn" style="padding: 2px;"><i class="fa fa-edit hand btnAddActivity" recordId="${SchoolScheduleTaskId}"></i></a>
                            <a class="btn" style="padding: 2px;"><i class="fa fa-trash-o hand btnDeleteActivity" recordId="${SchoolScheduleTaskId}"></i></a>
                        </div>
                    </li>
                    <li>
                        <i class="fa fa-fw fa-gear bg-blue"></i>
                        <div class="timeline-item">
                            <span class="time"><i class="fa fa-clock-o"></i> till ${endDate}</span>
                            <h3 class="timeline-header"><a href="#">${taskType}</a></h3>
                            <div class="timeline-body">
                                ${detail}
                            </div>
                        </div>
                    </li>
                `;
                $(".ActivityList").append(str);
                utils.hideSpin();
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadFacultyHost(scheduleCode) {
        utils.showSpin();
        let context = this;
        let url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SchoolUI/getHostProfile/${scheduleCode}`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let successFunction = function (data) {
            console.log("loadFacultyHost", url, data);
            let code = data.getProp("code");
            let profileUrl = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/PersonUI/${code}`;
            $(".hostProfile").attr("src", profileUrl);

            let profileName = `${data.getProp("firstName")} ${data.getProp("lastName")}`;
            $(".profile-username").html(profileName);

            let subjectScheduleProfile = data.getProp("schedConfName");
            $(".subjectScheduleProfile").html(subjectScheduleProfile);

            let totalStudents = data.getProp("studentCount");
            $(".totalStudents").html(totalStudents);

            let schoolScheduleCode = data.getProp("schoolScheduleCode");
            $(`.btnJoinVirtualRoom[module="SchoolUI"]`).attr("code", schoolScheduleCode);
            utils.hideSpin();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

}

$(function () {
    schoolUI = new SchoolUI();
    registeredModules.push("schoolUI");
});

