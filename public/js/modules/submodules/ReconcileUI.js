class ReconcileUI {
    saveReconcile(obj) {
        console.log("saveReconcile called");
        var tmp = utils.collectDataForSaving("editReconcile", "ReconcileUI", "0");
        tmp["Debits"] = utils.collectSubRecordDataForSaving("editReconcile", "GeneralLedgerDebitUI");
        tmp["Credits"] = utils.collectSubRecordDataForSaving("editReconcile", "GeneralLedgerCreditUI");

        console.log(tmp);
        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ReconcileUI/post/saveReconcile`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            showModalAny.show("Save Reconcile Message", data.value);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    loadReconcileProfile(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ReconcileUI/getReconcileProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            reconcileUI.arrangeReconcileProfile(data, "editReconcile");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeReconcileProfile(data, clsName) {
        dynaAutoComplete.loadDataAndAutoComplete(clsName, data, 0, "ReconcileUI");

        $(`.editReconcile[module="GeneralLedgerCreditUI"]`).val("");
        var items = data.getProp("Credits");
        $(items).each(function (index, obj) {
            dynaAutoComplete.loadDataAndAutoComplete(clsName, obj, index + 1, "GeneralLedgerCreditUI");
        })

        $(`.editReconcile[module="GeneralLedgerDebitUI"]`).val("");
        var items = data.getProp("Debits");
        $(items).each(function (index, obj) {
            dynaAutoComplete.loadDataAndAutoComplete(clsName, obj, index + 1, "GeneralLedgerDebitUI");
        })
    }

    searchReconcileFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ReconcileUI/getFilteredReconciles/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            reconcileUI.arrangeSearchedReconciles(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadTopReconciles(tabName) {
        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ReconcileUI/getTopReconciles`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            console.log(data);
            reconcileUI.arrangeSearchedReconciles(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedReconciles(data, tabName) {
        var divSelector = `.ReconcileUI_SearchReconciles[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var payeeName = obj.getProp("description");
            var accountName = obj.getProp("glPeriod");
            var paymentDate = obj.getProp("transactionDate");
            var totalAmount = obj.getProp("totalAmount");
            var ReconcileId = obj.getProp("AcctTransactionId");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 100%;">
                        <span><a href="#" class="ReconcileUI_selectReconcile" recordId="${ReconcileId}" module="ReconcileUI" tabName="${tabName}">${payeeName}</a></span>
                        <span class="pull-right">${accountName}</span><br/>
                    </div>
                    <div style="flex: 100%;">
                        <span><a href="#" class="ReconcileUI_selectReconcile" recordId="${ReconcileId}" module="ReconcileUI" tabName="${tabName}"><i class="fa fa-calendar"> Total: </i> ${paymentDate}</a></span>
                        <span class="pull-right" style="font-size: 14px;"><i class="fa fa-money"></i> ${totalAmount}</span><br/>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divSelector).append(str);
        });

    }
}