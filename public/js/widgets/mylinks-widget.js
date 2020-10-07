class MyLinksWidget {
    constructor() {
        var context = this;
        console.log("MyLinksWidget");

        $(document).on('click', '.myLink.attendance', function () {
            context.showAttendance();
        });
        $(document).on('click', '.myLink.payslip', function () {
            context.showPayslip();
        });
        $(document).on('click', '.myLink.holiday', function () {
            context.showHoliday();
        });
        $(document).on('click', '.myLink.travel', function () {
            context.showTravel();
        });
        $(document).on('click', '.myLink.projects', function () {
            context.showProjects();
        });
        $(document).on('click', '.myLink.training', function () {
            context.showTraining();
        });
        $(document).on('click', '.myLink.accounting', function () {
            context.showAccounting();
        });
        $(document).on('click', '.myLink.helpdesk', function () {
            context.showHelpdesk();
        });
    }

    showAttendance() {
        var context = this;
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/MyLinksWidget/attendance';
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $("#MyLinksBody").empty();
            var str = `
            <table class="table table-hover">
                <tbody id="myLast30Attendance">
                    <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Total Hours</th>
                    </tr>
                </tbody>
            </table>
            `;
            $("#MyLinksBody").append(str);
            $(data).each(function (index, obj) {
                console.log(obj);
                var workDate = obj.getProp("workDate");
                var attendanceType = obj.getProp("attendanceType");
                var totalHours = obj.getProp("totalHours");

                var trStr = `
                <tr>
                    <td>${workDate}</td>
                    <td>${attendanceType}</td>
                    <td>${totalHours}</td>
                </tr>
                `;
                $("#myLast30Attendance").append(trStr);
            });
            $("#myLinksModalLabel").html("My Last 30 Attendance");
            $('#myLinksModal').modal();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    showPayslip() {
        var context = this;
        var myframe = "myPayslipFrame";
        $("#MyLinksBody").empty();
        var str = `<iframe id="${myframe}" src="${url}" style="width: 100%; height: 100%"></iframe>`;
        $("#MyLinksBody").append(str);

        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/MyLinksWidget/payslip';
        var successCallback = function (data_url) {
            document.querySelector('#myPayslipFrame').src = data_url;
            $('#myLinksModal').modal();
        };
        ajaxCaller.loadGetBytes(successCallback, url);
    }

    showHoliday() {
        var context = this;
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/MyLinksWidget/holiday';
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $("#MyLinksBody").empty();
            var str = `
            <table class="table table-hover">
                <tbody id="myHolidays">
                    <tr>
                    <th>Date</th>
                    <th>Holiday</th>
                    <th>Type</th>
                    </tr>
                </tbody>
            </table>
            `;
            $("#MyLinksBody").append(str);
            $(data).each(function (index, obj) {
                console.log(obj);
                var workDate = obj.getProp("holidayDate");
                var name = obj.getProp("name");
                var type = obj.getProp("type");

                var trStr = `
                <tr>
                    <td>${workDate}</td>
                    <td>${name}</td>
                    <td>${type}</td>
                </tr>
                `;
                $("#myHolidays").append(trStr);
            });
            $("#myLinksModalLabel").html("Holidays");
            $('#myLinksModal').modal();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    showTravel() {
        var context = this;
    }

    showProjects() {
        var context = this;
    }

    showTraining() {
        var context = this;
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/widget/MyLinksWidget/training';
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $("#MyLinksBody").empty();
            var str = `
            <table class="table table-hover">
                <tbody id="myTrainings">
                    <tr>
                        <th>Training</th>
                        <th>Location</th>
                        <th>Facilitator</th>
                        <th>Date</th>
                    </tr>
                </tbody>
            </table>
            `;
            $("#MyLinksBody").append(str);
            $(data).each(function (index, obj) {
                console.log(obj);
                var title = obj.getProp("title");
                var location = obj.getProp("location");
                var facilitator = obj.getProp("facilitator");
                var startDate = obj.getProp("startDate") ? obj.getProp("startDate") : "";

                var trStr = `
                <tr>
                    <td>${title}</td>
                    <td>${location}</td>
                    <td>${facilitator}</td>
                    <td>${startDate}</td>
                </tr>
                `;
                $("#myTrainings").append(trStr);
            });
            $("#myLinksModalLabel").html("Trainings");
            $('#myLinksModal').modal();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    showAccounting() {
        var context = this;
    }

    showHelpdesk() {
        var context = this;
    }
}

