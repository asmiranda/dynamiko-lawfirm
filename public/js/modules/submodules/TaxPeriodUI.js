class TaxPeriodUI extends AbstractSubUI {
    constructor() {
        super("TaxPeriodUI");
        this.TaxPeriodTransactionUI = "TaxPeriodTransactionUI";
    }
    
    beforeSave(data) { 
        data[this.TaxPeriodTransactionUI] = utils.collectSubRecordDataForSaving("editRecord", this.TaxPeriodTransactionUI);
        return data;
    }

    newRecord() {   
        this.clearModuleInputs(this.moduleName);
        this.clearSubRecordsHolder(this.TaxPeriodTransactionUI);
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
        this.formatSubRecordsFromMain(this.TaxPeriodTransactionUI, data, clsName);
    }

    formatSearchList(index, obj, tabName) {
        var payeeName = obj.getProp("taxName");
        var accountName = obj.getProp("periodCode");
        var paymentDate = obj.getProp("startPeriod");
        var totalAmount = obj.getProp("endPeriod");
        var TaxPeriodId = obj.getProp("TaxPeriodId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${TaxPeriodId}" module="${this.moduleName}" tabName="${tabName}">${payeeName}</a></span>
                    <span class="pull-right">${accountName}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${TaxPeriodId}" module="${this.moduleName}" tabName="${tabName}"><i class="fa fa-calendar"> Date: </i> ${paymentDate}</a></span>
                    <span class="pull-right" style="font-size: 14px;"><i class="fa fa-money"> Total: </i> ${totalAmount}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    taxPeriodUI = new TaxPeriodUI();
});
