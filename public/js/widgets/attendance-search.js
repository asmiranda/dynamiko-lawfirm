class AttendanceSearchWidget {
    constructor(moduleName) {
        this.moduleName = moduleName;
        this.mainDataTable;
    }

    loadData() {
        console.log("LOAD ATTENDANCE SEARCH");
        var context = this;
        $("#filterAttendanceSearch").change(function () {
            context.loadTableData($(this).val());
        });

        var widgetId = $("#attendanceSearchTable");
        if ($(widgetId).attr("id")) {
            this.mainDataTable = $(widgetId).DataTable({
                "searching": false,
                "bLengthChange": false,
                "pageLength": 5
            });
            context.loadTableData("");
        }
    }

    loadTableData(val) {
        var context = this;
        var ajaxRequestDTO = new AjaxRequestDTO();
        if (val == "") {
            ajaxRequestDTO.url = "/api/generic/" + storage.getCompanyCode() + "/widget/AttendanceSearchWidget";
        }
        else {
            ajaxRequestDTO.url = "/api/generic/" + storage.getCompanyCode() + "/widget/AttendanceSearchWidget/" + val;
        }
        ajaxRequestDTO.data = "";

        var successFunction = function (data) {
            console.log(data);
            context.mainDataTable.clear();
            $.each(data, function (i, obj) {
                var record = [];
                record.push(obj["lastName"] + ", " + obj["firstName"]);
                record.push(obj["age"]);
                record.push(obj["position"]);
                record.push(obj["supervisor"]);

                context.mainDataTable.row.add(record).node().id = obj["PersonId"];
                context.mainDataTable.draw(false);
            });
            console.log("Complete Called.");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }
}
