class RealEstateElectricalPermitUI {
    init() {
        $("#dynamikoMainSearch").hide();
    }

    saveElectricalPermitForCashier(obj) {
        console.log("saveElectricalPermitForCashier called");
        var tmp = utils.collectDataForSaving("editRealEstateElectricalPermit", "RealEstateElectricalPermitUI", "0");

        console.log(tmp);
        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateElectricalPermitUI/post/saveElectricalPermitForCashier`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            showModalAny.show("Save Electrical Permit Message", data.value);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    changeValue(obj) {
        var name = $(obj).attr("name");
        var type = $(obj).attr("type");
        var value = $(obj).val();
        if (type == "checkbox") {
            if ($(obj).prop("checked") == true) {
                $(`input.editRealEstateElectricalPermit[type="text"][name="${name}"]`).val(value);
            }
            else {
                $(`input.editRealEstateElectricalPermit[type="text"][name="${name}"]`).val("");
            }
        }
        else {
            $(`input.editRealEstateElectricalPermit[type="checkbox"][name="${name}"]`).val(value);
        }
    }

    loadTopRealEstateElectricalPermits() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateElectricalPermitUI/getTopRealEstateElectricalPermits`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateElectricalPermitUI.arrangeSearchedRealEstateElectricalPermits(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedRealEstateElectricalPermits(data) {
        console.log(data);
        var divName = `.searchRealEstateElectricalPermits[module="RealEstateElectricalPermitUI"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var RealEstateElectricalPermitId = obj.getProp("RealEstateElectricalPermitId");

            var realEstateName = obj.getProp("realEstateName");
            var customerName = obj.getProp("citizenName");
            var years = obj.getProp("startYear") + "-" + obj.getProp("endYear");

            var employeeName = obj.getPropDefault("firstName", "") + " " + obj.getPropDefault("lastName", "");
            var totalAmount = obj.getPropDefault("totalAmount", "");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 90%;">
                        <span><a href="#" class="selectRealEstateElectricalPermit" recordId="${RealEstateElectricalPermitId}" module="RealEstateElectricalPermitUI">${realEstateName}</a></span>
                    </div>
                    <div style="flex: 50%;">
                        <span><a href="#" class="selectRealEstateElectricalPermit" recordId="${RealEstateElectricalPermitId}" module="RealEstateElectricalPermitUI">${customerName}</a></span>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-calendar"></i> ${years}</small>
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

    loadRealEstateElectricalPermitProfile(obj) {
        console.log(`loadRealEstateElectricalPermitProfile`);
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateElectricalPermitUI/getRealEstateElectricalPermitProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            realEstateElectricalPermitUI.arrangeRealEstateElectricalPermitProfile(data, "editRealEstateElectricalPermit");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeRealEstateElectricalPermitProfile(data, clsName) {
        dynaAutoComplete.loadDataAndAutoComplete(clsName, data, 0, "RealEstateElectricalPermitUI");
    }

    selectRealEstateElectricalPermit(obj) {
        console.log("selectRealEstateElectricalPermit");
        console.log("Record ID == " + $(obj).attr("recordId"));
        realEstateElectricalPermitUI.loadRealEstateElectricalPermitProfile(obj, "RealEstateElectricalPermit");
    }
}