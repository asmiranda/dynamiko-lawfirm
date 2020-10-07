class ExpenseUI extends AbstractSubUI {
    constructor() {
        super("ExpenseUI");
        this.ExpenseItemUI = "ExpenseItemUI";
        this.ExpenseCategoryItemUI = "ExpenseCategoryItemUI";
    }
    
    beforeSave(data) { 
        data[this.ExpenseItemUI] = utils.collectSubRecordDataForSaving("editRecord", this.ExpenseItemUI);
        data[this.ExpenseCategoryItemUI] = utils.collectSubRecordDataForSaving("editRecord", this.ExpenseCategoryItemUI);
        return data;
    }

    newRecord() {   
        this.clearModuleInputs(this.moduleName);
        this.clearSubRecordsHolder(this.ExpenseItemUI);
        this.clearSubRecordsHolder(this.ExpenseCategoryItemUI);
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
        this.formatSubRecordsFromMain(this.ExpenseItemUI, data, clsName);
        this.formatSubRecordsFromMain(this.ExpenseCategoryItemUI, data, clsName);
    }

    formatSearchList(index, obj, tabName) {
        var payeeName = obj.getProp("payeeName");
        var accountName = obj.getProp("accountName");
        var paymentDate = obj.getProp("paymentDate");
        var totalAmount = obj.getProp("totalAmount");
        var ExpenseId = obj.getProp("ExpenseId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${ExpenseId}" module="${this.moduleName}" tabName="${tabName}">${payeeName}</a></span>
                    <span class="pull-right">${accountName}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${ExpenseId}" module="${this.moduleName}" tabName="${tabName}"><i class="fa fa-calendar"> Date: </i> ${paymentDate}</a></span>
                    <span class="pull-right" style="font-size: 14px;"><i class="fa fa-money"> Total: </i> ${totalAmount}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    expenseUI = new ExpenseUI();
});
