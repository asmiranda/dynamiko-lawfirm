class ProcurementChartWidget {
    constructor() {
    }

    init() {
        console.log("LOAD PROCUREMENT CHART");
        if ($("#procurementChart")) {
            var cashChart = document.getElementById("procurementChart").getContext("2d");

            var ajaxRequestDTO = new AjaxRequestDTO();
            ajaxRequestDTO.url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/widget/ProcurementChartWidget";
            ajaxRequestDTO.data = "";

            var successFunction = function (data) {
                console.log(data);
                widgetChartRule.doChart("#procurementChart", data, data.chartType);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
        }
    }
}
