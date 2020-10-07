class StudentDashboardUI extends AbstractUI {
    changeMainId(obj) {
    }

    doMainSearchData(evt) {
    }

    changeModule(evt) {
        personTaskUI.loadTodoList();
        // employeeUI.loadTopEmployees();
        // accountChartUI.loadTopAccountCharts("AccountChart");
        // expenseUI.loadTopExpenses("Expense");
        // salesOrderUI.loadTopSalesOrders("SalesOrder");
        // bankingUI.loadTopBankings("Banking");
        // taxPeriodUI.loadTopTaxPeriods("TaxPeriod");
        // reconcileUI.loadTopReconciles("Reconcile");
    }

    init() {
        $("#dynamikoMainSearch").hide();
    }

    loadedCallback(data) {
        var context = this;

        console.log("loadedCallback not implemented.")
        personTaskUI.loadTodoList();
        this.loadProfile(data);
        schoolUI.loadAnnouncements();
    }

    loadProfile(data) {
        utils.showSpin();
        let context = this;
        let url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PersonUI/getProfile`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let successFunction = function (data) {
            console.log("loadFacultyHost", url, data);
            let code = data.getProp("code");
            let profileUrl = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/PersonUI/${code}`;
            $(".hostProfile").attr("src", profileUrl);

            let profileName = `${data.getProp("firstName")} ${data.getProp("lastName")}`;
            $(".profile-username").html(profileName);
            utils.hideSpin();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

}

$(function () {
    studentDashboardUI = new StudentDashboardUI();
});
