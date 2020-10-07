class SchoolCashierUI extends AbstractSubUI {
    constructor() {
        super("SchoolCashierUI");
    }

    changeModule(evt) {
        console.log("changeModule");
        schoolCashierUI.loadTopRecords("SchoolCashier");
        // reportUI.loadReportList("SchoolCashierUI");
    }

    newRecord() {
        this.clearModuleInputs(this.moduleName);
    }

    formatSearchList(index, obj, tabName) {
        var accountName = obj.getProp("lastName") + ", " + obj.getProp("firstName");
        var level = obj.getPropDefault("gradeLevel", "--");
        var accountNumber = obj.getPropDefault("invoiceNumber", "--");
        var email = obj.getPropDefault("email");
        var CashierQueueId = obj.getPropDefault("CashierQueueId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${CashierQueueId}" module="${this.moduleName}" tabName="${tabName}">${accountName}</a></span>
                    <span class="pull-right">Level: ${level}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${CashierQueueId}" module="${this.moduleName}" tabName="${tabName}">
                        Invoice #: ${accountNumber}</a></span>
                    <span class="pull-right" style="font-size: 14px;">${email}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }

    acceptPayment() {
        var CashierQueueId = $(`[module="SchoolCashierUI"][name="CashierQueueId"]`).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SchoolCashierUI/acceptPayment/${CashierQueueId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            SchoolCashierUI.arrangeSchoolCashierProfile(data, "SchoolCashier");
            SchoolCashierUI.displayInvoiceReport(CashierQueueId);
            showModalAny.show("Accept Payment", "Please print INVOICE, then wait for Printing.");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    displayInvoiceReport(recordId) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/pwidget/SchoolCashierUI/displayInvoiceReport/${recordId}`;
        $(`iframe[report="CashierInvoiceReport"]`).attr("src", url);
    }

    selectSchoolCashier(obj) {
        var CashierQueueId = $(obj).attr("CashierQueueId");

        SchoolCashierUI.loadSchoolCashierProfile(obj, "SchoolCashier");
        SchoolCashierUI.displayInvoiceReport(CashierQueueId);
    }

    // loadTopCashierQueue() {
    //     var CashierQueueId = $(mainId).val();
    //     var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SchoolCashierUI/getTopCashierQueue`;
    //     var ajaxRequestDTO = new AjaxRequestDTO(url, "");

    //     var successCallback = function(data) {
    //         SchoolCashierUI.arrangeSearchedSchoolCashiers(data, "SchoolCashier");
    //     };
    //     ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    // }

    // loadSchoolCashierProfile(obj, tabName) {
    //     var CashierQueueId = $(obj).attr("CashierQueueId");
    //     var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SchoolCashierUI/getCashierQueueProfile/${CashierQueueId}`;
    //     var ajaxRequestDTO = new AjaxRequestDTO(url, "");

    //     var successFunction = function(data) {
    //         SchoolCashierUI.arrangeSchoolCashierProfile(data);
    //     };
    //     ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    // }

    // arrangeSchoolCashierProfile(data) {
    //     console.log(data);
    //     var moduleName = data.getProp("moduleName");
    //     var CashierQueueId = data.getProp("CashierQueueId");

    //     var cashierTaker = data.getProp("cashierTaker");
    //     var queueDate = data.getProp("queueDate");
    //     var queueNumber = data.getProp("queueNumber");
    //     var title = data.getProp("title");
    //     var invoiceNumber = data.getProp("invoiceNumber");
    //     var issuerName = data.getProp("issuerName");
    //     var totalAmount = data.getProp("totalAmount");

    //     $(`[module="SchoolCashierUI"][name="cashierTaker"]`).val(cashierTaker);
    //     $(`[module="SchoolCashierUI"][name="queueDate"]`).val(queueDate);
    //     $(`[module="SchoolCashierUI"][name="queueNumber"]`).val(queueNumber);
    //     $(`[module="SchoolCashierUI"][name="title"]`).val(title);
    //     $(`[module="SchoolCashierUI"][name="invoiceNumber"]`).val(invoiceNumber);
    //     $(`[module="SchoolCashierUI"][name="issuerName"]`).val(issuerName);
    //     $(`[module="SchoolCashierUI"][name="totalAmount"]`).val(totalAmount);
    //     $(`[module="SchoolCashierUI"][name="moduleName"]`).val(moduleName);
    //     $(`[module="SchoolCashierUI"][name="CashierQueueId"]`).val(CashierQueueId);
    // }

    // searchSchoolCashierFilter(obj) {
    //     var value = $(obj).val();
    //     var tabName = $(obj).attr("tabName");
    //     console.log(value);

    //     var recordId = $(mainId).val();
    //     var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SchoolCashierUI/filterSchoolCashier/${value}`;
    //     var ajaxRequestDTO = new AjaxRequestDTO(url, "");

    //     var successCallback = function(data) {
    //         SchoolCashierUI.arrangeSearchedSchoolCashiers(data, tabName);
    //     };
    //     ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    // }

    // arrangeSearchedSchoolCashiers(data, tabName) {
    //     console.log(data);
    //     var divName = `.searchSchoolCashiers[module="SchoolCashierUI"][tabName="${tabName}"]`;
    //     $(divName).empty();
    //     $(data).each(function(index, obj) {
    //         var recordId = obj.getProp("CashierQueueId");
    //         var title = obj.getProp("title");
    //         var queueNumber = obj.getPropDefault("queueNumber", "");
    //         var queueDate = obj.getPropDefault("queueDate", "");
    //         var str = `
    //             <a href="#" class="selectSchoolCashier" module="SchoolCashierUI" tabName="${tabName}" CashierQueueId="${recordId}" recordId="${recordId}" style="font-weight: bolder;">${title}</a>
    //             <br/><span class="text-muted">
    //                 Queue #: <b style="font-size: 18px;">${queueNumber}</b> of ${queueDate}
    //             </span>
    //             <hr>
    //         `;
    //         $(divName).append(str);

    //     });
    // }
}

$(function () {
    schoolCashierUI = new SchoolCashierUI();
    registeredModules.push("schoolCashierUI");
})