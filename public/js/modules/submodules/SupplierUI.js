class SupplierUI {
    loadSupplierProfile(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SupplierUI/getSupplierProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            var recordId = data.getProp("SupplierId");
            var name = data.getProp("name");
            var email = data.getProp("email");
            var contact = data.getProp("contact");

            $(".SupplierUI_SupplierName").html(name);
            $(".SupplierUI_Supplier_Email").html(email);
            $(".SupplierUI_Supplier_Contact").html(contact);
            $(".SupplierUI_ProfilePic").attr("src", `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/SupplierUI/${recordId}/${utils.nowString()}`);
            $(".SupplierUI_ProfilePic").attr("recordId", recordId);
            $(".SupplierUI_ProfilePic").show();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    searchSupplierFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SupplierUI/getFilteredSuppliers/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            supplierUI.arrangeSearchedSuppliers(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadTopSuppliers(tabName) {
        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/SupplierUI/getTopSuppliers`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            console.log(data);
            supplierUI.arrangeSearchedSuppliers(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedSuppliers(data, tabName) {
        var divSelector = `.SupplierUI_SearchSuppliers[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var supplierName = obj.getProp("name");
            var email = obj.getPropDefault("email", "");
            var contact = obj.getPropDefault("contact", "");
            var recordId = obj.getProp("supplierId");
            var str = `
                <a href="#" class="SupplierUI_selectSupplier" module="SupplierUI" tabName="${tabName}" recordId="${recordId}" style="font-weight: bolder;">${supplierName}</a><br/>
                <span class="text-muted">
                    ${email} - ${contact}
                </span>
                <hr>
            `;
            $(divSelector).append(str);
        });

    }
}