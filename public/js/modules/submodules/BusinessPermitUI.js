class BusinessPermitUI {

    saveBusinessPermitForCashier(obj) {
        console.log("saveBusinessPermitForCashier called");
        var tmp = {};
        $(`.editBusinessPermit[module="BusinessPermitUI"]`).each(function (index, myObj) {
            var name = $(myObj).attr("name");
            var value = $(myObj).val();

            tmp[name] = value;
        });
        console.log(tmp);
        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/BusinessPermitUI/post/saveBusinessPermitForCashier`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            showModalAny.show("Save Business Permit Message", data.value);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    changeBusinessPermitValues(obj) {
        var totalAmount = utils.parseFloatOrZero($(`.editBusinessPermit[name="sanitaryPermitFee"]`).val());
        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="fireInspectionFee"]`).val());
        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="medicalCertificateFee"]`).val());
        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="solidWaterFee"]`).val());
        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="franchiseFee"]`).val());
        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="healthCertificateFee"]`).val());

        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="occupationalTax"]`).val());
        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="miscellaneousFee"]`).val());
        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="businessPermitPlate"]`).val());
        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="professionalTax"]`).val());
        totalAmount += utils.parseFloatOrZero($(`.editBusinessPermit[name="businessPermitPlateSticker"]`).val());
        $(`.editBusinessPermit[name="totalAmount"]`).val(totalAmount);
    }

    loadTopBusinessPermit() {
        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/BusinessPermitUI/getTopBusinessPermits`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            businessPermitUI.arrangeSearchedBusinessPermits(data, "BusinessPermit");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadBusinessPermitProfile(obj) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/BusinessPermitUI/getBusinessPermitProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            $(".editBusinessPermit").each(function (index, obj) {
                var key = $(obj).attr("name");
                var value = data.getProp(key);
                console.log(key + " -> " + value);
                $(`.editBusinessPermit[name="${key}"]`).val(value);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    searchBusinessPermitFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/BusinessPermitUI/filterBusinessPermit/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            businessPermitUI.arrangeSearchedBusinessPermits(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedBusinessPermits(data, tabName) {
        console.log(data);
        var divName = `.searchBusinessPermits[module="BusinessPermitUI"][tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var businessName = obj.getProp("businessName");
            var email = obj.getPropDefault("email", "");
            var recordId = obj.getProp("BusinessPermitId");
            var str = `
                <a href="#" class="BusinessPermitSelect" module="BusinessPermitUI" tabName="${tabName}" recordId="${recordId}" style="font-weight: bolder;">${businessName}</a>
                <span class="text-muted">
                    ${email}
                </span>
                <hr>
            `;
            $(divName).append(str);

        });
    }
}

