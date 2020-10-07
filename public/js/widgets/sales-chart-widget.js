class SalesChartWidget {
    constructor() {
    }

    init() {
        console.log("LOAD SALES CHART");
        if ($("#salesChart")) {
            var cashChart = document.getElementById("salesChart").getContext("2d");

            var ajaxRequestDTO = new AjaxRequestDTO();
            ajaxRequestDTO.url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/widget/SalesChartWidget";
            ajaxRequestDTO.data = "";

            var successFunction = function (data) {
                console.log(data);
                widgetChartRule.doChart("#salesChart", data, data.chartType);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
        }
    }
}
