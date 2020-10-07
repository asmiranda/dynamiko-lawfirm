class ExpenseUI extends AbstractSubUI {
    constructor(moduleName) {
        super(moduleName);
    }

    beforeSave(data) {
        tmp["ExpenseItems"] = utils.collectSubRecordDataForSaving("editRecord", "ExpenseItemUI");
        tmp["ExpenseCategoryItems"] = utils.collectSubRecordDataForSaving("editRecord", "ExpenseCategoryItemUI");
        return data;
    }

    arrangeRecordProfileItems(data, clsName) {
        $(`.autocomplete[module="ExpenseItemUI"]`).val("");
        $(`.editRecord[module="ExpenseItemUI"]`).val("");
        var items = data.getProp("ExpenseItems");
        $(items).each(function (index, obj) {
            dynaAutoComplete.loadDataAndAutoComplete(clsName, obj, index + 1, "ExpenseItemUI");
        })

        $(`.autocomplete[module="ExpenseCategoryItemUI"]`).val("");
        $(`.editRecord[module="ExpenseCategoryItemUI"]`).val("");
        var items = data.getProp("ExpenseCategoryItems");
        $(items).each(function (index, obj) {
            dynaAutoComplete.loadDataAndAutoComplete(clsName, obj, index + 1, "ExpenseCategoryItemUI");
        })
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
                    <span><a href="#" class="selectSearchRecord" recordId="${ExpenseId}" module="${this.moduleName}" tabName="${tabName}">${payeeName}</a></span>
                    <span class="pull-right">${accountName}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="selectSearchRecord" recordId="${ExpenseId}" module="${this.moduleName}" tabName="${tabName}"><i class="fa fa-calendar"> Total: </i> ${paymentDate}</a></span>
                    <span class="pull-right" style="font-size: 14px;"><i class="fa fa-money"> Total: </i> ${totalAmount}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    expenseUI = new ExpenseUI("ExpenseUI");
});
