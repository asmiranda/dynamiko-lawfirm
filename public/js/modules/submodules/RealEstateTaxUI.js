class RealEstateTaxUI {
    init() {
        $("#dynamikoMainSearch").hide();
    }

    changeRealEstateTaxTotals(obj) {
        var overAllAmount = 0;
        for (var rowIndex = 1; rowIndex <= 10; rowIndex++) {
            var basicAmount = utils.parseFloatOrZero($(`input.editRealEstateTax[module="RealEstateTaxItemUI"][rowIndex=${rowIndex}][name="basicAmount"]`).val());
            var sefTax = utils.parseFloatOrZero($(`input.editRealEstateTax[module="RealEstateTaxItemUI"][rowIndex=${rowIndex}][name="sefTax"]`).val());
            var discount = utils.parseFloatOrZero($(`input.editRealEstateTax[module="RealEstateTaxItemUI"][rowIndex=${rowIndex}][name="discount"]`).val());
            var interest = utils.parseFloatOrZero($(`input.editRealEstateTax[module="RealEstateTaxItemUI"][rowIndex=${rowIndex}][name="interest"]`).val());

            if (basicAmount > 0) {
                var totalAmount = (basicAmount * ((100 + interest) / 100)) + sefTax - discount;
                $(`input.editRealEstateTax[module="RealEstateTaxItemUI"][rowIndex=${rowIndex}][name="totalAmount"]`).val(totalAmount);

                overAllAmount += totalAmount;
            }
        }
        $(`input.editRealEstateTax[module="RealEstateTaxUI"][rowIndex=${rowIndex}][name="totalAmount"]`).val(overAllAmount);
    }

    changeRealEstateTaxYears(evt) {
        console.log(evt);
        var realEstateCode = $(`.HiddenAutoComplete[name="realEstateCode"]`).val();
        if (realEstateCode != "") {
            var startYear = $(`.editRealEstateTax[name="startYear"]`).val();
            var endYear = $(`.editRealEstateTax[name="endYear"]`).val();
            console.log("changeRealEstateTaxValues - realEstateCode", realEstateCode, startYear, endYear);
            var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateTaxUI/getUpdateForRealEstateTax/${realEstateCode}/${startYear}/${endYear}`;
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");

            var successCallback = function (data) {
                console.log(data);
                realEstateTaxUI.arrangeRealEstateTaxProfile(data);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
    }

    changeRealEstateTax(evt) {
        console.log(evt);
        var realEstateCode = $(`.HiddenAutoComplete[name="realEstateCode"]`).val();
        if (realEstateCode != "") {
            console.log("changeRealEstateTaxValues - realEstateCode", realEstateCode);
            var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateTaxUI/getUpdateForRealEstateTax/${realEstateCode}`;
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");

            var successCallback = function (data) {
                console.log(data);
                realEstateTaxUI.arrangeRealEstateTaxProfile(data);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
    }

    saveRealEstateTaxForCashier(obj) {
        console.log("saveRealEstateTaxForCashier called");
        var tmp = realEstateTaxUI.collectDataForSaving("editRealEstateTax", "RealEstateTaxUI", "0");
        tmp["taxItems"] = realEstateTaxUI.collectSubRecordDataForSaving("editRealEstateTax", "RealEstateTaxItemUI");

        console.log(tmp);
        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateTaxUI/post/saveRealEstateTaxForCashier`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
            showModalAny.show("Save Real Estate Tax Message", data.value);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    collectDataForSaving(clsName, moduleName, rowIndex) {
        var tmp = {};
        $(`.${clsName}[module="${moduleName}"][rowIndex="${rowIndex}"]`).each(function (index, myObj) {
            var name = $(myObj).attr("name");
            var value = $(myObj).val();

            tmp[name] = value;
        });
        return tmp;
    }

    collectSubRecordDataForSaving(clsName, moduleName) {
        var tmp = [];
        for (var i = 1; i <= 10; i++) {
            var rec = realEstateTaxUI.collectDataForSaving(clsName, moduleName, i);
            tmp.push(rec);
        }
        return tmp;
    }

    loadTopRealEstateTaxes() {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateTaxUI/getTopRealEstateTaxes`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateTaxUI.arrangeSearchedRealEstateTaxes(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedRealEstateTaxes(data) {
        console.log(data);
        var divName = `.searchRealEstateTaxes[module="RealEstateTaxUI"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var RealEstateTaxId = obj.getProp("RealEstateTaxId");

            var realEstateName = obj.getProp("realEstateName");
            var customerName = obj.getProp("citizenName");
            var years = obj.getProp("startYear") + "-" + obj.getProp("endYear");

            var employeeName = obj.getPropDefault("firstName", "") + " " + obj.getPropDefault("lastName", "");
            var totalAmount = obj.getPropDefault("totalAmount", "");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 90%;">
                        <span><a href="#" class="selectRealEstateTax" recordId="${RealEstateTaxId}" module="RealEstateTaxUI">${realEstateName}</a></span>
                    </div>
                    <div style="flex: 50%;">
                        <span><a href="#" class="selectRealEstateTax" recordId="${RealEstateTaxId}" module="RealEstateTaxUI">${customerName}</a></span>
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

    loadLastSelectedRealEstateTax() {
        if (storage.latestRealEstateTaxId > 0) {
            realEstateTaxUI.loadRealEstateTaxProfile(storage.latestRealEstateTaxId);
        }
    }

    loadRealEstateTaxProfile(obj) {
        console.log(`loadRealEstateTaxProfile`);
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateTaxUI/getRealEstateTaxProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            realEstateTaxUI.arrangeRealEstateTaxProfile(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeRealEstateTaxProfile(data) {
        var clsName = "editRealEstateTax";
        dynaAutoComplete.loadDataAndAutoComplete(clsName, data, 0, "RealEstateTaxUI");

        $(`.editRealEstateTax[module="RealEstateTaxItemUI"]`).val("");
        var items = data.getProp("taxItems");
        $(items).each(function (index, obj) {
            realEstateTaxUI.arrangeRealEstateTaxItem(clsName, obj, index + 1, "RealEstateTaxItemUI");
        })
    }

    arrangeRealEstateTaxItem(clsName, data, rowIndex, moduleName) {
        dynaAutoComplete.loadDataAndAutoComplete(clsName, data, rowIndex, moduleName);
    }

    selectRealEstateTax(obj) {
        console.log("selectRealEstateTax");
        console.log("Record ID == " + $(obj).attr("recordId"));
        realEstateTaxUI.loadRealEstateTaxProfile(obj, "RealEstateTax");
    }

    selectRealEstateTax(obj) {
        console.log("selectRealEstateTax");
        console.log("Record ID == " + $(obj).attr("recordId"));
        realEstateTaxUI.loadRealEstateTaxProfile(obj, "Sale");
    }
}