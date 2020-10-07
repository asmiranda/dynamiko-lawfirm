class GovernmentPrintingUI {
    displayForPrintingReport(recordId) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/pwidget/GovernmentPrintingUI/displayForGovernmentPrintingReport/${recordId}`;
        $(`iframe[report="ForGovernmentPrintingReport"]`).attr("src", url);
    }

    selectPrintingQueue(obj) {
        var printingQueueId = $(obj).attr("PrintingQueueId");

        governmentPrintingUI.loadPrintingQueueProfile(obj, "PrintingQueue");
        governmentPrintingUI.displayForPrintingReport(printingQueueId);
    }

    loadTopPrintingQueue() {
        var printingQueueId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/GovernmentPrintingUI/getTopPrintingQueues`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            governmentPrintingUI.arrangeSearchedPrintingQueues(data, "GovernmentPrinting");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadPrintingQueueProfile(obj, tabName) {
        var printingQueueId = $(obj).attr("PrintingQueueId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/GovernmentPrintingUI/getPrintingQueueProfile/${printingQueueId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            governmentPrintingUI.arrangePrintingQueueProfile(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangePrintingQueueProfile(data) {
        console.log(data);
        var moduleName = data.getProp("moduleName");
        var printingQueueId = data.getProp("PrintingQueueId");

        var cashierTaker = data.getProp("cashierTaker");
        var queueDate = data.getProp("queueDate");
        var queueNumber = data.getProp("queueNumber");
        var title = data.getProp("title");
        var invoiceNumber = data.getProp("invoiceNumber");
        var issuerName = data.getProp("issuerName");
        var totalAmount = data.getProp("totalAmount");

        $(`[module="GovernmentPrintingUI"][name="cashierTaker"]`).val(cashierTaker);
        $(`[module="GovernmentPrintingUI"][name="queueDate"]`).val(queueDate);
        $(`[module="GovernmentPrintingUI"][name="queueNumber"]`).val(queueNumber);
        $(`[module="GovernmentPrintingUI"][name="title"]`).val(title);
        $(`[module="GovernmentPrintingUI"][name="invoiceNumber"]`).val(invoiceNumber);
        $(`[module="GovernmentPrintingUI"][name="issuerName"]`).val(issuerName);
        $(`[module="GovernmentPrintingUI"][name="totalAmount"]`).val(totalAmount);
        $(`[module="GovernmentPrintingUI"][name="moduleName"]`).val(moduleName);
        $(`[module="GovernmentPrintingUI"][name="PrintingQueueId"]`).val(printingQueueId);
    }

    searchPrintingQueueFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/GovernmentPrintingUI/filterPrintingQueue/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            governmentPrintingUI.arrangeSearchedPrintingQueues(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedPrintingQueues(data, tabName) {
        console.log(data);
        var divName = `.searchGovernmentPrintings[module="GovernmentPrintingUI"][tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var recordId = obj.getProp("PrintingQueueId");
            var title = obj.getProp("title");
            var queueNumber = obj.getPropDefault("queueNumber", "");
            var queueDate = obj.getPropDefault("queueDate", "");
            var str = `
                <a href="#" class="selectPrintingQueue" module="GovernmentPrintingUI" tabName="${tabName}" PrintingQueueId="${recordId}" recordId="${recordId}" style="font-weight: bolder;">${title}</a>
                <br/><span class="text-muted">
                    Queue #: <b style="font-size: 18px;">${queueNumber}</b> of ${queueDate}
                </span>
                <hr>
            `;
            $(divName).append(str);

        });
    }
}

