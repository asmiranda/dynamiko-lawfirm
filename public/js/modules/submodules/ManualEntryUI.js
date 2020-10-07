class ManualEntryUI extends AbstractSubUI {
    constructor() {
        super("ManualEntryUI");
        this.ManualEntryItemUI = "ManualEntryItemUI";
    }
    
    beforeSave(data) { 
        data[this.ManualEntryItemUI] = utils.collectSubRecordDataForSaving("editRecord", this.ManualEntryItemUI);
        return data;
    }

    newRecord() {   
        this.clearModuleInputs(this.moduleName);
        this.clearSubRecordsHolder(this.ManualEntryItemUI);
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
        this.formatSubRecordsFromMain(this.ManualEntryItemUI, data, clsName);
    }

    formatSearchList(index, obj, tabName) {
        var payeeName = obj.getProp("referenceNumber");
        var accountName = obj.getProp("employeeName");
        var paymentDate = obj.getProp("transactionDate");
        var totalAmount = obj.getProp("totalAmount");
        var ManualEntryId = obj.getProp("ManualEntryId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${ManualEntryId}" module="${this.moduleName}" tabName="${tabName}">${payeeName}</a></span>
                    <span class="pull-right">${accountName}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${ManualEntryId}" module="${this.moduleName}" tabName="${tabName}"><i class="fa fa-calendar"> Date: </i> ${paymentDate}</a></span>
                    <span class="pull-right" style="font-size: 14px;"><i class="fa fa-money"> Total: </i> ${totalAmount}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    manualEntryUI = new ManualEntryUI();
});
