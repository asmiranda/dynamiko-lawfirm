class RealEstatePlumbingPermitUI {
    init() {
        $("#dynamikoMainSearch").hide();
    }

    savePlumbingPermitForCashier(obj) {
        console.log("savePlumbingPermitForCashier called");
        var tmp = utils.collectDataForSaving("editRealEstatePlumbingPermit", "RealEstatePlumbingPermitUI", "0");

        console.log(tmp);
        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstatePlumbingPermitUI/post/savePlumbingPermitForCashier`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            showModalAny.show("Save Plumbing Permit Message", data.value);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    changeValue(obj) {
        var name = $(obj).attr("name");
        var type = $(obj).attr("type");
        var value = $(obj).val();
        if (type == "checkbox") {
            if ($(obj).prop("checked") == true) {
                $(`input.editRealEstatePlumbingPermit[type="text"][name="${name}"]`).val(value);
            }
            else {
                $(`input.editRealEstatePlumbingPermit[type="text"][name="${name}"]`).val("");
            }
        }
        else {
            $(`input.editRealEstatePlumbingPermit[type="checkbox"][name="${name}"]`).val(value);
        }
    }

    loadTopRealEstatePlumbingPermits() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstatePlumbingPermitUI/getTopRealEstatePlumbingPermits`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstatePlumbingPermitUI.arrangeSearchedRealEstatePlumbingPermits(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedRealEstatePlumbingPermits(data) {
        console.log(data);
        var divName = `.searchRealEstatePlumbingPermits[module="RealEstatePlumbingPermitUI"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var RealEstatePlumbingPermitId = obj.getProp("RealEstatePlumbingPermitId");

            var realEstateName = obj.getProp("realEstateName");
            var customerName = obj.getProp("citizenName");
            var years = obj.getProp("startYear") + "-" + obj.getProp("endYear");

            var employeeName = obj.getPropDefault("firstName", "") + " " + obj.getPropDefault("lastName", "");
            var totalAmount = obj.getPropDefault("totalAmount", "");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 90%;">
                        <span><a href="#" class="selectRealEstatePlumbingPermit" recordId="${RealEstatePlumbingPermitId}" module="RealEstatePlumbingPermitUI">${realEstateName}</a></span>
                    </div>
                    <div style="flex: 50%;">
                        <span><a href="#" class="selectRealEstatePlumbingPermit" recordId="${RealEstatePlumbingPermitId}" module="RealEstatePlumbingPermitUI">${customerName}</a></span>
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

    loadRealEstatePlumbingPermitProfile(obj) {
        console.log(`loadRealEstatePlumbingPermitProfile`);
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstatePlumbingPermitUI/getRealEstatePlumbingPermitProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            realEstatePlumbingPermitUI.arrangeRealEstatePlumbingPermitProfile(data, "editRealEstatePlumbingPermit");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeRealEstatePlumbingPermitProfile(data, clsName) {
        dynaAutoComplete.loadDataAndAutoComplete(clsName, data, 0, "RealEstatePlumbingPermitUI");
    }

    selectRealEstatePlumbingPermit(obj) {
        console.log("selectRealEstatePlumbingPermit");
        console.log("Record ID == " + $(obj).attr("recordId"));
        realEstatePlumbingPermitUI.loadRealEstatePlumbingPermitProfile(obj, "RealEstatePlumbingPermit");
    }
}