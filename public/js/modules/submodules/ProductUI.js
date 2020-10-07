class ProductUI {
    loadProductProfile(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ProductUI/getProductProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            var recordId = data.getProp("productId");
            var name = data.getProp("name");
            var type = data.getProp("type");
            var quantity = data.getProp("quantity");
            var unitPrice = data.getProp("unitPrice");

            $(".ProductUI_ProductName").html(name);
            $(".ProductUI_Product_Type").html(type);
            $(".ProductUI_Product_UnitPrice").html(quantity);
            $(".ProductUI_Product_Quantity").html(unitPrice);
            $(".ProductUI_ProfilePic").attr("src", `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/ProductUI/${recordId}/${utils.nowString()}`);
            $(".ProductUI_ProfilePic").attr("recordId", recordId);
            $(".ProductUI_ProfilePic").show();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    searchProductFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ProductUI/getFilteredProducts/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            productUI.arrangeSearchedProducts(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadTopProducts(tabName) {
        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ProductUI/getTopProducts`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            console.log(data);
            productUI.arrangeSearchedProducts(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedProducts(data, tabName) {
        var divSelector = `.ProductUI_SearchProducts[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var name = obj.getProp("name");
            var category = obj.getProp("productCategory");
            var unitPrice = obj.getProp("unitPrice");
            var quantity = obj.getProp("quantity");
            var type = obj.getProp("type");
            var productId = obj.getProp("productId");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 50;">
                        <p class="text-muted">
                            <span><a href="#" class="ProductUI_selectProduct" recordId="${productId}" module="ProductUI" tabName="${tabName}">${name}</a></span>
                        </p>
                    </div>
                    <div style="flex: 25%">
                        <span class="pull-right">Unit Price: ${unitPrice}</span><br/>
                    </div>
                    <div style="flex: 25%">
                        <span class="pull-right">Quantity: ${quantity}</span><br/>
                    </div>
                    <div style="flex: 90%">
                        <span>Category: ${category}</span><br/>
                        <span>Prod Type: ${type}</span>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divSelector).append(str);
        });

    }
}