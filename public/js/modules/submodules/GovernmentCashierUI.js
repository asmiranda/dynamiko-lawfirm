class GovernmentCashierUI {
    acceptPayment() {
        var CashierQueueId = $(`[module="GovernmentCashierUI"][name="CashierQueueId"]`).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/GovernmentCashierUI/acceptPayment/${CashierQueueId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            governmentCashierUI.arrangeGovernmentCashierProfile(data, "GovernmentCashier");
            governmentCashierUI.displayInvoiceReport(CashierQueueId);
            showModalAny.show("Accept Payment", "Please print INVOICE, then wait for Printing.");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    displayInvoiceReport(recordId) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/pwidget/GovernmentCashierUI/displayInvoiceReport/${recordId}`;
        $(`iframe[report="CashierInvoiceReport"]`).attr("src", url);
    }

    selectGovernmentCashier(obj) {
        var CashierQueueId = $(obj).attr("CashierQueueId");

        governmentCashierUI.loadGovernmentCashierProfile(obj, "GovernmentCashier");
        governmentCashierUI.displayInvoiceReport(CashierQueueId);
    }

    loadTopCashierQueue() {
        var CashierQueueId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/GovernmentCashierUI/getTopCashierQueue`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            governmentCashierUI.arrangeSearchedGovernmentCashiers(data, "GovernmentCashier");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadGovernmentCashierProfile(obj, tabName) {
        var CashierQueueId = $(obj).attr("CashierQueueId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/GovernmentCashierUI/getCashierQueueProfile/${CashierQueueId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            governmentCashierUI.arrangeGovernmentCashierProfile(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeGovernmentCashierProfile(data) {
        console.log(data);
        var moduleName = data.getProp("moduleName");
        var CashierQueueId = data.getProp("CashierQueueId");

        var cashierTaker = data.getProp("cashierTaker");
        var queueDate = data.getProp("queueDate");
        var queueNumber = data.getProp("queueNumber");
        var title = data.getProp("title");
        var invoiceNumber = data.getProp("invoiceNumber");
        var issuerName = data.getProp("issuerName");
        var totalAmount = data.getProp("totalAmount");

        $(`[module="GovernmentCashierUI"][name="cashierTaker"]`).val(cashierTaker);
        $(`[module="GovernmentCashierUI"][name="queueDate"]`).val(queueDate);
        $(`[module="GovernmentCashierUI"][name="queueNumber"]`).val(queueNumber);
        $(`[module="GovernmentCashierUI"][name="title"]`).val(title);
        $(`[module="GovernmentCashierUI"][name="invoiceNumber"]`).val(invoiceNumber);
        $(`[module="GovernmentCashierUI"][name="issuerName"]`).val(issuerName);
        $(`[module="GovernmentCashierUI"][name="totalAmount"]`).val(totalAmount);
        $(`[module="GovernmentCashierUI"][name="moduleName"]`).val(moduleName);
        $(`[module="GovernmentCashierUI"][name="CashierQueueId"]`).val(CashierQueueId);
    }

    searchGovernmentCashierFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/GovernmentCashierUI/filterGovernmentCashier/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            GovernmentCashierUI.arrangeSearchedGovernmentCashiers(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedGovernmentCashiers(data, tabName) {
        console.log(data);
        var divName = `.searchGovernmentCashiers[module="GovernmentCashierUI"][tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var recordId = obj.getProp("CashierQueueId");
            var title = obj.getProp("title");
            var queueNumber = obj.getPropDefault("queueNumber", "");
            var queueDate = obj.getPropDefault("queueDate", "");
            var str = `
                <a href="#" class="selectGovernmentCashier" module="GovernmentCashierUI" tabName="${tabName}" CashierQueueId="${recordId}" recordId="${recordId}" style="font-weight: bolder;">${title}</a>
                <br/><span class="text-muted">
                    Queue #: <b style="font-size: 18px;">${queueNumber}</b> of ${queueDate}
                </span>
                <hr>
            `;
            $(divName).append(str);

        });
    }
}

