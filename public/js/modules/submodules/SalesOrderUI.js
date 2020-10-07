class SalesOrderUI extends AbstractSubUI {
    constructor() {
        super("SalesOrderUI");
        this.SalesOrderItemUI = "SalesOrderItemUI";
    }
    
    beforeSave(data) {
        data[this.SalesOrderItemUI] = utils.collectSubRecordDataForSaving("editRecord", this.SalesOrderItemUI);
        return data;
    }

    newRecord() {   
        this.clearModuleInputs(this.moduleName);
        this.clearSubRecordsHolder(this.SalesOrderItemUI);
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
        this.formatSubRecordsFromMain(this.SalesOrderItemUI, data, clsName);
    }

    formatSearchList(index, obj, tabName) {
        var payeeName = obj.getProp("customerName");
        var accountName = obj.getProp("employeeName");
        var paymentDate = obj.getProp("invoiceDate");
        var totalAmount = obj.getProp("totalAmount");
        var SalesOrderId = obj.getProp("SalesOrderId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${SalesOrderId}" module="${this.moduleName}" tabName="${tabName}">${payeeName}</a></span>
                    <span class="pull-right">${accountName}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${SalesOrderId}" module="${this.moduleName}" tabName="${tabName}"><i class="fa fa-calendar"> Date: </i> ${paymentDate}</a></span>
                    <span class="pull-right" style="font-size: 14px;"><i class="fa fa-money"> Total: </i> ${totalAmount}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    salesOrderUI = new SalesOrderUI();
});

