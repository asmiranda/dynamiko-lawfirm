class PayableUI extends AbstractSubUI {
    constructor() {
        super("PayableUI");
        this.PayableItemUI = "PayableItemUI";
    }
    
    beforeSave(data) { 
        data[this.PayableItemUI] = utils.collectSubRecordDataForSaving("editRecord", this.PayableItemUI);
        return data;
    }

    newRecord() {   
        this.clearModuleInputs(this.moduleName);
        this.clearSubRecordsHolder(this.PayableItemUI);
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
        this.formatSubRecordsFromMain(this.PayableItemUI, data, clsName);
    }

    formatSearchList(index, obj, tabName) {
        var payeeName = obj.getProp("payableFrom");
        var accountName = obj.getProp("employeeName");
        var paymentDate = obj.getProp("transactionDate");
        var totalAmount = obj.getProp("totalAmount");
        var PayableId = obj.getProp("PayableId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${PayableId}" module="${this.moduleName}" tabName="${tabName}">${payeeName}</a></span>
                    <span class="pull-right">${accountName}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${PayableId}" module="${this.moduleName}" tabName="${tabName}"><i class="fa fa-calendar"> Date: </i> ${paymentDate}</a></span>
                    <span class="pull-right" style="font-size: 14px;"><i class="fa fa-money"> Total: </i> ${totalAmount}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    payableUI = new PayableUI();
});
