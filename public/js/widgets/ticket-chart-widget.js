class TicketChartWidget {
    constructor() {
    }

    init() {
        console.log("LOAD TICKET CHART");
        if ($("#ticketChart")) {
            var cashChart = document.getElementById("ticketChart").getContext("2d");

            var ajaxRequestDTO = new AjaxRequestDTO();
            ajaxRequestDTO.url = MAIN_URL + "/api/generic/" + storage.getCompanyCode() + "/widget/TicketChartWidget";
            ajaxRequestDTO.data = "";

            var successFunction = function (data) {
                console.log(data);
                didgetChartRule.doChart("#ticketChart", data, data.chartType);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
        }
    }
}
