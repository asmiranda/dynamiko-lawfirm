class ProductRequestUI {
    searchProductRequestFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ProductUI/getFilteredProductRequest/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            productRequestUI.arrangeProductRequest(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadTopProductRequest() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/ProductUI/getProductRequest`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            productRequestUI.arrangeProductRequest(data, "Dashboard");
            productRequestUI.arrangeProductRequest(data, "NewPO");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeProductRequest(data, tabName) {
        var divSelector = `.ProductUI_SearchProductRequests[tabName="${tabName}"]`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var productRequestId = obj.getProp("productRequestId");
            var productName = obj.getProp("productName");
            var quantity = obj.getProp("quantity");
            var requestDate = obj.getProp("requestDate");
            var requiredDate = obj.getProp("requiredDate");
            var employeeName = obj.getProp("employeeName");
            var locationName = obj.getProp("locationName");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 70%;">
                        <span class="text-muted"><a href="#" class="ProductRequestUI_selectProductRequest" recordId="${productRequestId}" module="ProductRequestUI" tabName="${tabName}">${productName}</a></span>
                    </div>
                    <div style="flex: 30%">
                        <span class="pull-right">Quantity: ${quantity}</span><br/>
                    </div>
                    <div style="flex: 70%;">
                        <span>By: <i class="fa fa-user"></i> ${employeeName}</span>
                    </div>
                    <div style="flex: 30%">
                        <span class="pull-right"><i class="fa fa-home"></i> ${locationName}</span>
                    </div>
                    <div style="flex: 50%">
                        <span>Date Requested: <i class="fa fa-calendar"></i> ${requestDate}</span><br/>
                    </div>
                    <div style="flex: 50%">
                        <span class="pull-right">Required: <i class="fa fa-calendar"></i> ${requiredDate}</span>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divSelector).append(str);
        });
    }
}