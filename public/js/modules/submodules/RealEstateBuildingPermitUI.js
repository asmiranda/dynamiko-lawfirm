class RealEstateBuildingPermitUI {
    init() {
        $("#dynamikoMainSearch").hide();
    }

    saveBuildingPermitForCashier(obj) {
        console.log("saveBuildingPermitForCashier called");
        var tmp = utils.collectDataForSaving("editRealEstateBuildingPermit", "RealEstateBuildingPermitUI", "0");

        console.log(tmp);
        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateBuildingPermitUI/post/saveBuildingPermitForCashier`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            showModalAny.show("Save Building Permit Message", data.value);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    changeValue(obj) {
        var name = $(obj).attr("name");
        var type = $(obj).attr("type");
        var value = $(obj).val();
        if (type == "checkbox") {
            if ($(obj).prop("checked") == true) {
                $(`input.editRealEstateBuildingPermit[type="text"][name="${name}"]`).val(value);
            }
            else {
                $(`input.editRealEstateBuildingPermit[type="text"][name="${name}"]`).val("");
            }
        }
        else {
            $(`input.editRealEstateBuildingPermit[type="checkbox"][name="${name}"]`).val(value);
        }
    }

    loadTopRealEstateBuildingPermits() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateBuildingPermitUI/getTopRealEstateBuildingPermits`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateBuildingPermitUI.arrangeSearchedRealEstateBuildingPermits(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedRealEstateBuildingPermits(data) {
        console.log(data);
        var divName = `.searchRealEstateBuildingPermits[module="RealEstateBuildingPermitUI"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var RealEstateBuildingPermitId = obj.getProp("RealEstateBuildingPermitId");

            var realEstateName = obj.getProp("realEstateName");
            var customerName = obj.getProp("citizenName");
            var years = obj.getProp("startYear") + "-" + obj.getProp("endYear");

            var employeeName = obj.getPropDefault("firstName", "") + " " + obj.getPropDefault("lastName", "");
            var totalAmount = obj.getPropDefault("totalAmount", "");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 90%;">
                        <span><a href="#" class="selectRealEstateBuildingPermit" recordId="${RealEstateBuildingPermitId}" module="RealEstateBuildingPermitUI">${realEstateName}</a></span>
                    </div>
                    <div style="flex: 50%;">
                        <span><a href="#" class="selectRealEstateBuildingPermit" recordId="${RealEstateBuildingPermitId}" module="RealEstateBuildingPermitUI">${customerName}</a></span>
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

    loadRealEstateBuildingPermitProfile(obj) {
        console.log(`loadRealEstateBuildingPermitProfile`);
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateBuildingPermitUI/getRealEstateBuildingPermitProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            realEstateBuildingPermitUI.arrangeRealEstateBuildingPermitProfile(data, "editRealEstateBuildingPermit");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeRealEstateBuildingPermitProfile(data, clsName) {
        dynaAutoComplete.loadDataAndAutoComplete(clsName, data, 0, "RealEstateBuildingPermitUI");
    }

    selectRealEstateBuildingPermit(obj) {
        console.log("selectRealEstateBuildingPermit");
        console.log("Record ID == " + $(obj).attr("recordId"));
        realEstateBuildingPermitUI.loadRealEstateBuildingPermitProfile(obj, "RealEstateBuildingPermit");
    }
}