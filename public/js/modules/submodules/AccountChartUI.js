class AccountChartUI extends AbstractSubUI {
    constructor() {
        super("AccountChartUI");
        this.GeneralLedgerUI = "GeneralLedgerUI";
    }
    
    beforeSave(data) { 
        data[this.GeneralLedgerUI] = utils.collectSubRecordDataForSaving("editRecord", this.GeneralLedgerUI);
        return data;
    }

    newRecord() {   
        this.clearModuleInputs(this.moduleName);
        this.clearSubRecordsHolder(this.GeneralLedgerUI);
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
        this.formatSubRecordsFromMain(this.GeneralLedgerUI, data, clsName);
    }

    formatSearchList(index, obj, tabName) {
        var accountName = obj.getProp("accountName");
        var debit = obj.getProp("debit");
        var accountNumber = obj.getProp("accountNumber");
        var credit = obj.getProp("credit");
        var AccountChartId = obj.getProp("AccountChartId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${AccountChartId}" module="${this.moduleName}" tabName="${tabName}">${accountName}</a></span>
                    <span class="pull-right">Debit: ${debit}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${AccountChartId}" module="${this.moduleName}" tabName="${tabName}">
                        Account #: ${accountNumber}</a></span>
                    <span class="pull-right" style="font-size: 14px;">Credit: ${credit}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    accountChartUI = new AccountChartUI();
});
