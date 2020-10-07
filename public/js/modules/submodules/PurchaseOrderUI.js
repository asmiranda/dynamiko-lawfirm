class PurchaseOrderUI {
    changeMainId(obj) {
    }

    doMainSearchData(evt) {
    }

    changeModule(evt) {
        personTaskUI.loadTodoList();
        employeeUI.loadTopEmployees();
        supplierUI.loadTopSuppliers("POSupplier");
        productUI.loadTopProducts("POProduct");
        purchaseOrderUI.loadTopPO();
        productRequestUI.loadTopProductRequest();
    }

    init() {
        $("#dynamikoMainSearch").hide();
    }


    selectProduct(obj) {
        // var recordId = $(obj).attr("recordId");
        var tabName = $(obj).attr("tabName");
        console.log(tabName);

        if (tabName == "POProduct") {
            productUI.loadProductProfile(obj);
            purchaseOrderUI.loadActivePoForProduct(obj);
        }
    }

    selectSupplier(obj) {
        // var recordId = $(obj).attr("recordId");
        var tabName = $(obj).attr("tabName");
        console.log(tabName);

        if (tabName == "POSupplier") {
            supplierUI.loadSupplierProfile(obj);
            purchaseOrderUI.loadActivePoForSupplier(obj);
        }
    }

    searchPurchaseOrderFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PurchaseOrderUI/getFilteredPO/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            purchaseOrderUI.arrangePO(data, "Dashboard");
            purchaseOrderUI.arrangePO(data, "NewPO");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadTopPO() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PurchaseOrderUI/getTopPO`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            purchaseOrderUI.arrangePO(data, "Dashboard");
            purchaseOrderUI.arrangePO(data, "NewPO");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangePO(data, tabName) {
        var divSelector = `.PurchaseOrderUI_SearchPurchaseOrder[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var supplierName = obj.getProp("supplierName");
            var poPrice = obj.getProp("poPrice");
            var poQuantity = obj.getProp("poQuantity");
            var purchaseOrderCode = obj.getProp("purchaseOrderCode");

            var postingDate = obj.getProp("postingDate");
            var email = obj.getProp("email");

            var puchaseOrderId = obj.getProp("poId");
            var productId = obj.getProp("productId");
            var supplierId = obj.getProp("supplierId");
            var productName = obj.getProp("name");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 55%;">
                        <span class="text-muted">PO # <a href="#" class="PurchaseOrderUI_selectPurchaseOrder" recordId="${puchaseOrderId}" module="PurchaseOrderUI" tabName="${tabName}">${puchaseOrderId}</a></span>
                    </div>
                    <div style="flex: 45%">
                        <span class="pull-right"><i class="fa fa-calendar"></i> ${postingDate}</span>
                    </div>
                    <div style="flex: 50%;">
                        <span class="text-muted">Supplier: <a href="#" class="PurchaseOrderUI_selectSupplier" recordId="${supplierId}" module="PurchaseOrderUI" tabName="${tabName}">${supplierName}</a></span>
                    </div>
                    <div style="flex: 50%;">
                        <span class="pull-right"><i class="fa fa-email"></i> ${email}</span>
                    </div>
                    <div style="flex: 33%">
                        <span class=""><i class="fa fa-money"></i>Unit Price: ${poPrice}</span><br/>
                    </div>
                    <div style="flex: 33%">
                        <span class="pull-right">Quantity: ${poQuantity}</span><br/>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divSelector).append(str);
            $(".SupplierPurchaseOrderUI_supplierName").html(supplierName);
        });

    }

    loadActivePoForSupplier(obj) {
        var recordId = $(obj).attr("recordId");
        var tabName = $(obj).attr("tabName");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PurchaseOrderUI/getSupplierPO/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            purchaseOrderUI.arrangePurchaseOrderForSupplier(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangePurchaseOrderForSupplier(data, tabName) {
        var divSelector = `.SupplierPurchaseOrderUI_SearchSuppliers[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var supplierName = obj.getProp("supplierName");
            var poPrice = obj.getProp("poPrice");
            var poQuantity = obj.getProp("poQuantity");
            var purchaseOrderCode = obj.getProp("purchaseOrderCode");

            var deliveryDate = obj.getProp("deliveryDate");
            var contactPerson = obj.getProp("contactPerson");

            var puchaseOrderId = obj.getProp("poId");
            var productId = obj.getProp("productId");
            var supplierId = obj.getProp("supplierId");
            var productName = obj.getProp("name");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 33%;">
                        <span class="text-muted">Supplier: <a href="#" class="PurchaseOrderUI_selectSupplier" recordId="${supplierId}" module="PurchaseOrderUI" tabName="${tabName}">${supplierName}</a></span>
                    </div>
                    <div style="flex: 33%;">
                        <span class="text-muted">PO # <a href="#" class="PurchaseOrderUI_selectPurchaseOrder" recordId="${puchaseOrderId}" module="PurchaseOrderUI" tabName="${tabName}">${puchaseOrderId}</a></span>
                    </div>
                    <div style="flex: 33%;">
                        <span class="pull-right"><i class="fa fa-phone"></i> ${contactPerson}</span>
                    </div>
                    <div style="flex: 33%">
                        <span class=""><i class="fa fa-money"></i>Unit Price: ${poPrice}</span><br/>
                    </div>
                    <div style="flex: 33%">
                        <span>Quantity: ${poQuantity}</span><br/>
                    </div>
                    <div style="flex: 33%">
                        <span class="pull-right"><i class="fa fa-calendar"></i> ${deliveryDate}</span>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divSelector).append(str);
            $(".SupplierPurchaseOrderUI_supplierName").html(supplierName);
        });

    }

    loadActivePoForProduct(obj) {
        var recordId = $(obj).attr("recordId");
        var tabName = $(obj).attr("tabName");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PurchaseOrderUI/getProductPO/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            purchaseOrderUI.arrangePurchaseOrderForProduct(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangePurchaseOrderForProduct(data, tabName) {
        var divSelector = `.ProductPurchaseOrderUI_SearchProducts[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var supplierName = obj.getProp("supplierName");
            var poPrice = obj.getProp("poPrice");
            var poQuantity = obj.getProp("poQuantity");
            var purchaseOrderCode = obj.getProp("purchaseOrderCode");

            var deliveryDate = obj.getProp("deliveryDate");
            var contactPerson = obj.getProp("contactPerson");

            var puchaseOrderId = obj.getProp("poId");
            var productId = obj.getProp("productId");
            var supplierId = obj.getProp("supplierId");
            var productName = obj.getProp("name");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 33%;">
                        <span class="text-muted">Supplier: <a href="#" class="PurchaseOrderUI_selectSupplier" recordId="${supplierId}" module="PurchaseOrderUI" tabName="${tabName}">${supplierName}</a></span>
                    </div>
                    <div style="flex: 33%;">
                        <span class="text-muted">PO # <a href="#" class="PurchaseOrderUI_selectPurchaseOrder" recordId="${puchaseOrderId}" module="PurchaseOrderUI" tabName="${tabName}">${puchaseOrderId}</a></span>
                    </div>
                    <div style="flex: 33%;">
                        <span class="pull-right"><i class="fa fa-phone"></i> ${contactPerson}</span>
                    </div>
                    <div style="flex: 33%">
                        <span class=""><i class="fa fa-money"></i>Unit Price: ${poPrice}</span><br/>
                    </div>
                    <div style="flex: 33%">
                        <span>Quantity: ${poQuantity}</span><br/>
                    </div>
                    <div style="flex: 33%">
                        <span class="pull-right"><i class="fa fa-calendar"></i> ${deliveryDate}</span>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divSelector).append(str);
            $(".ProductPurchaseOrderUI_productName").html(productName);
        });

    }
}
