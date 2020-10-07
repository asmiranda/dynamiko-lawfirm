class BankingUI extends AbstractSubUI {
    constructor() {
        super("BankingUI");
        this.BankingTransactionUI = "BankingTransactionUI";
    }
    
    beforeSave(data) {
        data[this.BankingTransactionUI] = utils.collectSubRecordDataForSaving("editRecord", this.BankingTransactionUI);
        return data;
    }

    newRecord() {   
        this.clearModuleInputs(this.moduleName);
        this.clearSubRecordsHolder(this.BankingTransactionUI);
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
        this.formatSubRecordsFromMain(this.BankingTransactionUI, data, clsName);
    }

    formatSearchList(index, obj, tabName) {
        var payeeName = obj.getProp("bankName");
        var accountName = obj.getProp("bankAccountNumber");
        var paymentDate = obj.getPropDefault("bankCode","--");
        var totalAmount = obj.getPropDefault("balance","--");
        var BankingId = obj.getProp("BankingId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${BankingId}" module="${this.moduleName}" tabName="${tabName}">${payeeName}</a></span>
                    <span class="pull-right">${accountName}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${BankingId}" module="${this.moduleName}" tabName="${tabName}">${paymentDate}</a></span>
                    <span class="pull-right" style="font-size: 14px;"><i class="fa fa-money"> Balance: </i> ${totalAmount}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    bankingUI = new BankingUI();
});

