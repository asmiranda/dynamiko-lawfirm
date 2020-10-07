class CommunityTaxCertificateUI {
    selectCommunityTaxCertificate(obj) {
        communityTaxCertificateUI.loadCommunityTaxCertificateProfile(obj, "");
    }

    changeCTCValues(obj) {
        var name = $(obj).attr("name");
        if (name == "amountA" || name == "amountB1" || name == "amountB2" || name == "amountB3") {
            var totalAmount = utils.parseFloatOrZero($(`.editCtc[name="amountA"]`).val());
            totalAmount += utils.parseFloatOrZero($(`.editCtc[name="amountB1"]`).val());
            totalAmount += utils.parseFloatOrZero($(`.editCtc[name="amountB2"]`).val());
            totalAmount += utils.parseFloatOrZero($(`.editCtc[name="amountB3"]`).val());
            $(`.editCtc[name="totalAmount"]`).val(totalAmount);
        }
    }

    saveCTCForCashier(obj) {
        console.log("saveCTCForCashier called");
        var tmp = {};
        $(`.editCtc[module="CommunityTaxCertificateUI"]`).each(function (index, myObj) {
            var name = $(myObj).attr("name");
            var value = $(myObj).val();

            tmp[name] = value;
        });
        console.log(tmp);
        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/CommunityTaxCertificateUI/post/saveCTCForCashier`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            showModalAny.show("Save CTC Message", data.value);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    newCTC(obj) {
        console.log("newCTC called");
    }

    loadTopCommunityTaxCertificate() {
        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/CommunityTaxCertificateUI/getTopCommunityTaxCertificates`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            communityTaxCertificateUI.arrangeSearchedCommunityTaxCertificates(data, "CommunityTaxCertificate");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadCommunityTaxCertificateProfile(obj, tabName) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/CommunityTaxCertificateUI/getCommunityTaxCertificateProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            var CommunityTaxCertificateId = data.getProp("CommunityTaxCertificateId");
            var ctcNumber = data.getProp("ctcNumber");
            var invoiceNumber = data.getProp("invoiceNumber");
            var issuerCode = data.getProp("issuerCode");
            var ctcDate = data.getProp("ctcDate");
            var ctcPurpose = data.getProp("ctcPurpose");
            var citizen = data.getProp("citizen");
            var address = data.getProp("address");
            var amountA = data.getProp("amountA");
            var amountB1 = data.getProp("amountB1");
            var amountB2 = data.getProp("amountB2");
            var amountB3 = data.getProp("amountB3");
            var totalAmount = utils.parseFloatOrZero(amountA) + utils.parseFloatOrZero(amountB1) + utils.parseFloatOrZero(amountB2) + utils.parseFloatOrZero(amountB3);

            $(`.editCtc[name="CommunityTaxCertificateId"]`).val(CommunityTaxCertificateId);
            $(`.editCtc[name="ctcNumber"]`).val(ctcNumber);
            $(`.editCtc[name="invoiceNumber"]`).val(invoiceNumber);
            $(`.editCtc[name="issuerCode"]`).val(issuerCode);
            $(`.editCtc[name="ctcDate"]`).val(ctcDate);
            $(`.editCtc[name="ctcPurpose"]`).val(ctcPurpose);
            $(`.editCtc[name="citizen"]`).val(citizen);
            $(`.editCtc[name="address"]`).val(address);
            $(`.editCtc[name="amountA"]`).val(amountA);
            $(`.editCtc[name="amountB1"]`).val(amountB1);
            $(`.editCtc[name="amountB2"]`).val(amountB2);
            $(`.editCtc[name="amountB3"]`).val(amountB3);
            $(`.editCtc[name="totalAmount"]`).val(totalAmount);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    searchCommunityTaxCertificateFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/CommunityTaxCertificateUI/filterCommunityTaxCertificate/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            communityTaxCertificateUI.arrangeSearchedCommunityTaxCertificates(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedCommunityTaxCertificates(data, tabName) {
        console.log(data);
        var divName = `.searchCommunityTaxCertificates[module="CommunityTaxCertificateUI"][tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var CommunityTaxCertificateName = obj.getProp("firstName") + " " + obj.getProp("lastName");
            var email = obj.getPropDefault("email", "");
            var recordId = obj.getProp("CommunityTaxCertificateId");
            var str = `
                <a href="#" class="CommunityTaxCertificateSelect" module="CommunityTaxCertificateUI" tabName="${tabName}" recordId="${recordId}" style="font-weight: bolder;">${CommunityTaxCertificateName}</a>
                <span class="text-muted">
                    ${email}
                </span>
                <hr>
            `;
            $(divName).append(str);

        });
    }
}

