class RealEstateTransferUI {
    init() {
        $("#dynamikoMainSearch").hide();
    }

    loadTopRealEstateTransfers() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateTransferUI/getTopRealEstateTransfers`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateTransferUI.arrangeSearchedRealEstateTransfers(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedRealEstateTransfers(data) {
        console.log(data);
        var divName = `.searchRealEstateTransfers[module="RealEstateTransferUI"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var RealEstateTransferId = obj.getProp("RealEstateTransferId");

            var customerName = obj.getProp("customerName");
            var customerEmail = obj.getProp("customerEmail");

            var employeeName = obj.getPropDefault("employeeName", "");
            var totalAmount = obj.getPropDefault("totalAmount", "");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 50%;">
                        <span><a href="#" class="selectRealEstateTransfer" recordId="${RealEstateTransferId}" module="RealEstateTransferUI">${customerName}</a></span>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-mail"></i> ${customerEmail}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted"><i class="fa fa-compass"> Employee: </i> ${employeeName}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-compass"> Total: </i> ${totalAmount}</small>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divName).append(str);
        });
    }

    arrangeSearchedRealEstateTransfers(data) {
        console.log(data);
        var divName = `.searchRealEstateTransfer[module="RealEstateTransferUI"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var customerName = obj.getProp("customerName");
            var customerEmail = obj.getProp("customerEmail");
            var customerId = obj.getProp("customerId");

            var employeeName = obj.getPropDefault("employeeName", "");
            var totalAmount = obj.getPropDefault("totalAmount", "");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 50%;">
                        <span><a href="#" class="selectRealEstateTransfer" recordId="${customerId}" module="RealEstateTransferUI">${customerName}</a></span>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-mail"></i> ${customerEmail}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted"><i class="fa fa-compass"> Employee: </i> ${employeeName}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-compass"> Total: </i> ${totalAmount}</small>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divName).append(str);
        });
    }

    loadRealEstateTransferProfile(obj, tabName) {
        console.log(`loadRealEstateTransferProfile for ${tabName}`);
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateTransferUI/getRealEstateTransferProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            realEstateTransferUI.arrangeRealEstateTransferProfile(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeRealEstateTransferProfile(data, clsName) {
        $(`.edit${clsName}`).each(function (index, obj) {
            var key = $(obj).attr("name");
            if (key) {
                var value = data.getProp(key);
                console.log(key + " -> " + value);
                $(`.edit${clsName}[name="${key}"]`).val(value);
            }
        });
        realEstateTransferUI.loadAutoCompleteRowLabel("customerCode", 1);

        var recordId = $(`.edit${clsName}[name="RealEstateTransferId"]`).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateTransferUI/getRealEstateTransferItems/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            $(data).each(function (index, obj) {
                realEstateTransferUI.arrangeRealEstateTransferItem(index + 100, obj, clsName);
            })
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeRealEstateTransferItem(rowIndex, data, clsName) {
        console.log(rowIndex, data, clsName);
        var productCode = data.getProp("productCode");
        var unitPrice = data.getProp("unitPrice");
        var quantity = data.getProp("quantity");
        var totalAmount = data.getProp("totalAmount");

        $(`.edit${clsName}[module="RealEstateTransferItemUI"][rowIndex="${rowIndex}"][name="productCode"]`).val(productCode);
        $(`.edit${clsName}[module="RealEstateTransferItemUI"][rowIndex="${rowIndex}"][name="unitPrice"]`).val(unitPrice);
        $(`.edit${clsName}[module="RealEstateTransferItemUI"][rowIndex="${rowIndex}"][name="quantity"]`).val(quantity);
        $(`.edit${clsName}[module="RealEstateTransferItemUI"][rowIndex="${rowIndex}"][name="totalAmount"]`).val(totalAmount);
    }

    loadAutoCompleteRowLabel(field, rowIndex) {
        console.log(`loadAutoCompleteRowLabel == [autoname=${field}] == `);
        var tmpLabel = $(`[class~='autocomplete'][autoname='${field}'][rowIndex='${rowIndex}']`);
        tmpLabel.val("");

        var hiddenAutoComplete = `.HiddenAutoComplete[name="${field}"][rowIndex='${rowIndex}']`;
        var moduleName = $(hiddenAutoComplete).attr("module");
        var value = $(hiddenAutoComplete).val();

        if (value != null && value != "") {
            var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/autocompletelabel/${moduleName}/${field}/${value}`;
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");
            var successCallback = function (data) {
                console.log(data);
                var divDescAutoComplete = $(`[class~='DivAutoComplete'][autoname='${data.getProp("fieldName")}'][rowIndex='${rowIndex}']`);
                divDescAutoComplete.html(data.getProp("value"));
                var fieldAutoComplete = $(`[class~='autocomplete'][autoname='${data.getProp("fieldName")}'][rowIndex='${rowIndex}']`);
                fieldAutoComplete.val(data.getProp("value"));
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
    };

    selectRealEstateTransfer(obj) {
        console.log("selectRealEstateTransfer");
        console.log("Record ID == " + $(obj).attr("recordId"));
        realEstateTransferUI.loadRealEstateTransferProfile(obj, "RealEstateTransfer");
    }

    selectRealEstateTransfer(obj) {
        console.log("selectRealEstateTransfer");
        console.log("Record ID == " + $(obj).attr("recordId"));
        realEstateTransferUI.loadRealEstateTransferProfile(obj, "Sale");
    }
}