class EmployeeTeamMemberUI {
    selectTeamMember(obj) {
        var recordId = $(obj).attr("recordId");
        employeeTeamMemberUI.reloadMembers(recordId);
    }

    addTeamMember() {
        console.log("addTeamMember");
        var recordId = $(".employeeIdForTeamMember").attr("recordId");
        employeeTeamMemberUI.reloadMembers(recordId);
    }

    loadTeamMembers(obj) {
        console.log("loadTeamMember");
        var recordId = $(obj).attr("recordId");
        employeeTeamMemberUI.reloadMembers(recordId);
    }

    reloadMembers(recordId) {
        console.log("loadTeamMember");

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/EmployeeTeamMemberUI/getTeamMember/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        $(".employeeIdForTeamMember").attr("recordId", recordId);
        $(`.autoCompleteQuickUpdaterInput[module="EmployeeTeamMemberUI"][autoName="teamMemberCode"]`).attr("recordId", recordId);
        var successFunction = function (data) {
            console.log(data);

            $(".EmployeeTeamMemberUI_TeamMembers").empty();
            $(data).each(function (index, obj) {
                var employeeName = obj.getProp("employeeName");
                var employeeDesignation = obj.getProp("employeeDesignation");
                var teamMemberId = obj.getProp("teamMemberId");
                var teamMemberName = obj.getProp("teamMemberName");
                var teamMemberDesignation = obj.getPropDefault("teamMemberDesignation", "--");

                var supervisorId = obj.getProp("supervisorId");
                var supervisorEmployeeName = obj.getProp("supervisorEmployeeName");

                var str = `
                    <li>
                        <img class="profile-user-img img-responsive img-circle" module="EmployeeUI" src="${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/EmployeeUI/${teamMemberId}/${utils.nowString()}">
                        <a class="teamMemberSelect" href="#" module="EmployeeTeamMemberUI" recordId="${teamMemberId}">${teamMemberName}</a>
                        <span class="users-list-date">${teamMemberDesignation}</span>
                    </li>
                `;
                if (teamMemberId != undefined) {
                    $(".EmployeeTeamMemberUI_TeamMembers").append(str);
                }
                if (index == 0) {
                    $(".EmployeeTeamMemberUI_EmployeeName").html(employeeName);
                    if (supervisorId != undefined) {
                        $(".EmployeeTeamMemberUI_Supervisor").show();
                        $(".EmployeeTeamMemberUI_SupervisorName").html(supervisorEmployeeName);
                        $(".EmployeeTeamMemberUI_SupervisorName").attr("recordId", supervisorId);
                        $(".EmployeeTeamMemberUI_SupervisorDesignation").html("Supervisor/Manager");
                        $(".EmployeeTeamMemberUI_SupervisorPic").attr("src", `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/EmployeeUI/${supervisorId}/${utils.nowString()}`);
                    }
                    else {
                        $(".EmployeeTeamMemberUI_Supervisor").hide();
                    }
                }
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

}