class GovernmentReportsUI {
    showGovernmentReport(obj) {
        console.log("called showGovernmentReport");
        var reportName = $(`.chooseGovernmentReport`).val();
        var startDate = $(`[name="chooseStartDate"]`).val();
        var endDate = $(`[name="chooseEndDate"]`).val();

        console.log(reportName);
        console.log(startDate);
        console.log(endDate);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/pwidget/GovernmentReportsUI/displayGovernmentReport/${reportName}/${startDate}/${endDate}`;
        $(`iframe[report="ForGovernmentReport"]`).attr("src", url);
    }

    autoChooseDate(obj) {
        console.log("called autoChooseDate");
        var thisDay = $(obj).hasClass("btnChooseThisDay");
        var thisWeek = $(obj).hasClass("btnChooseThisWeek");
        var thisMonth = $(obj).hasClass("btnChooseThisMonth");
        var thisYear = $(obj).hasClass("btnChooseThisYear");

        var startDate = "";
        var endDate = "";
        if (thisDay) {
            var today = new Date();
            startDate = moment(today).format('YYYY-MM-DD');
            endDate = moment(today).format('YYYY-MM-DD');
        }
        else if (thisWeek) {
            var today = new Date();
            var currentWeekDay = today.getDay();
            var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
            var wkStart = new Date(new Date(today).setDate(today.getDate() - lessDays));
            var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));

            startDate = moment(wkStart).format('YYYY-MM-DD');
            endDate = moment(wkEnd).format('YYYY-MM-DD');
        }
        else if (thisMonth) {
            var today = new Date();
            var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            startDate = moment(firstDayOfMonth).format('YYYY-MM-DD');
            endDate = moment(lastDayOfMonth).format('YYYY-MM-DD');
        }
        else if (thisYear) {
            var today = new Date();
            var firstDayOfYear = new Date(today.getFullYear(), 0, 1);
            var lastDayOfYear = new Date(today.getFullYear(), 11, 31);

            startDate = moment(firstDayOfYear).format('YYYY-MM-DD');
            endDate = moment(lastDayOfYear).format('YYYY-MM-DD');
        }
        $(`[name="chooseStartDate"]`).val(startDate);
        $(`[name="chooseEndDate"]`).val(endDate);
    }
}

