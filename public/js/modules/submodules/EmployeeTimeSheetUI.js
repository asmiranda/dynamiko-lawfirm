class EmployeeTimeSheetUI {
    loadTimeSheet(obj) {
        console.log("loadTimeSheet");
        var recordId = $(obj).attr("recordId");

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/EmployeeTimeSheetUI/getTimeSheet/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);

            $(".EmployeeTimeSheetUI_TimeSheetEntries").empty();
            $(data).each(function (index, obj) {
                var employeeName = obj.getProp("employeeName");
                var tsDate = obj.getProp("workDate");
                var tsHours = obj.getProp("totalHours");
                var tsType = obj.getProp("attendanceType");
                var str = `
                    <tr>
                        <td>${tsDate}</td>
                        <td>${tsHours}</td>
                        <td>${tsType}</td>
                    </tr>
                `;
                $(".EmployeeTimeSheetUI_TimeSheetEntries").append(str);
                if (index == 0) {
                    $(".EmployeeTimeSheetUI_EmployeeName").html(employeeName);
                }
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }
}