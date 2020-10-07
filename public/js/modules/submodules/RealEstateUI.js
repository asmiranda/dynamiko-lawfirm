class RealEstateUI {
    constructor() {
        this.lastGeoResult;
    }

    loadRealEstateTransfer(recordId) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateUI/getRealEstateTransfer/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateUI.arrangeSelectedRealEstateTransfer(data, "dashboard");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSelectedRealEstateTransfer(data, tabName) {
        console.log(data);
        var divName = `.RealEstateUI_TransferRecords[tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var transferDate = obj.getPropDefault("transferDate", "--");
            var realEstateTransferId = obj.getPropDefault("realEstateTransferId", "--");
            var transferIssuerName = obj.getPropDefault("transferIssuerName", "--");
            var amountPaid = obj.getPropDefault("amountPaid", "--");
            var personId = obj.getPropDefault("personId", "0");
            var contact = obj.getPropDefault("email", "--");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 50%;">
                        <span>
                            <small class="text-muted"><i class="fa fa-user"> Date: </i>
                                <a href="#" class="RealEstateUI_selectRealEstateTransfer" recordId="${realEstateTransferId}" module="RealEstateUI" tabName="${tabName}">${transferDate}</a>
                            </small>
                        </span>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-user"> Issuer: </i> ${transferIssuerName}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted"><i class="fa fa-money"> Amount Paid: </i> ${amountPaid}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-money"> Contact: </i> ${contact}</small>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divName).append(str);
        });
    }

    loadRealEstateFieldInspection(recordId) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateUI/getRealEstateFieldInspection/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateUI.arrangeSelectedRealEstateFieldInspection(data, "dashboard");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSelectedRealEstateFieldInspection(data, tabName) {
        console.log(data);
        var divName = `.RealEstateUI_FieldInspectionRecords[tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var inspectionDate = obj.getPropDefault("inspectionDate", "--");
            var realEstateFieldInspectionId = obj.getPropDefault("realEstateFieldInspectionId", "--");
            var inspectorName = obj.getPropDefault("inspectorName", "--");
            var amountPaid = obj.getPropDefault("amountPaid", "--");
            var personId = obj.getPropDefault("personId", "0");
            var contact = obj.getPropDefault("email", "--");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 50%;">
                        <span>
                            <small class="text-muted"><i class="fa fa-user"> Date: </i>
                                <a href="#" class="RealEstateUI_selectRealEstateFieldInspection" recordId="${realEstateFieldInspectionId}" module="RealEstateUI" tabName="${tabName}">${inspectionDate}</a>
                            </small>
                        </span>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-user"> Inspector: </i> ${inspectorName}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted"><i class="fa fa-money"> Amount Paid: </i> ${amountPaid}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-money"> Contact: </i> ${contact}</small>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divName).append(str);
        });
    }

    loadRealEstateBuildingPermit(recordId) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateUI/getRealEstateBuildingPermit/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateUI.arrangeSelectedRealEstateBuildingPermit(data, "dashboard");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSelectedRealEstateBuildingPermit(data, tabName) {
        console.log(data);
        var divName = `.RealEstateUI_BuildingPermitRecords[tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var permitDate = obj.getPropDefault("PermitDate", "--");
            var realEstateBuildingPermitId = obj.getPropDefault("realEstateBuildingPermitId", "--");
            var permitIssuerName = obj.getPropDefault("permitIssuerName", "--");
            var amountPaid = obj.getPropDefault("amountPaid", "--");
            var personId = obj.getPropDefault("personId", "0");
            var contact = obj.getPropDefault("email", "--");
            var floorArea = obj.getPropDefault("floorArea", "--");
            var storeyCount = obj.getPropDefault("storeyCount", "--");
            var occupied = obj.getProp("occupied");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 50%;">
                        <span>
                            <small class="text-muted"><i class="fa fa-user"> Date: </i>
                                <a href="#" class="RealEstateUI_selectRealEstateBuildingPermit" recordId="${realEstateBuildingPermitId}" module="RealEstateUI" tabName="${tabName}">${permitDate}</a>
                            </small>
                        </span>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-user"> Issuer: </i> ${permitIssuerName}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted"><i class="fa fa-money"> Amount Paid: </i> ${amountPaid}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-compass"> Floor Area: </i> ${floorArea}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted"><i class="fa fa-money"> Storey: </i> ${storeyCount}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-money"> Contact: </i> ${contact}</small>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divName).append(str);
        });
    }

    loadRealEstateAssessment(recordId) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateUI/getRealEstateAssessment/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateUI.arrangeSelectedRealEstateAssessment(data, "dashboard");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSelectedRealEstateAssessment(data, tabName) {
        console.log(data);
        var divName = `.RealEstateUI_AssessmentRecords[tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var assessmentDate = obj.getPropDefault("assessmentDate", "--");
            var realEstateAssessmentId = obj.getPropDefault("realEstateAssessmentId", "--");
            var assessorName = obj.getPropDefault("assessorName", "--");
            var assessmentAmount = obj.getPropDefault("assessmentAmount", "--");
            var personId = obj.getPropDefault("personId", "0");
            var contact = obj.getPropDefault("contact", "--");
            var zonalValue = obj.getPropDefault("zonalValue", "--");
            var marketValue = obj.getPropDefault("marketValue", "--");
            var occupied = obj.getProp("occupied");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 50%;">
                        <span>
                            <small class="text-muted"><i class="fa fa-user"> Date: </i>
                                <a href="#" class="RealEstateUI_selectRealEstateAssessment" recordId="${realEstateAssessmentId}" module="RealEstateUI" tabName="${tabName}">${assessmentDate}</a>
                            </small>
                        </span>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-user"> Assessor: </i> ${assessorName}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted"><i class="fa fa-money"> Amount: </i> ${assessmentAmount}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-compass"> Zonal Value: </i> ${zonalValue}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted"><i class="fa fa-money"> Market Value: </i> ${marketValue}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-money"> Contact: </i> ${contact}</small>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divName).append(str);
        });
    }

    loadLastSelectedRealEstate() {
        if (storage.latestRealEstateId > 0) {
            realEstateUI.loadRealEstateProfile(storage.latestRealEstateId);
            realEstateUI.loadSelectedRealEstateMap(storage.latestRealEstateId);
            realEstateUI.loadRealEstateAssessment(storage.latestRealEstateId);
            realEstateUI.loadRealEstateBuildingPermit(storage.latestRealEstateId);
            realEstateUI.loadRealEstateFieldInspection(storage.latestRealEstateId);
            realEstateUI.loadRealEstateTransfer(storage.latestRealEstateId);
        }
    }

    loadSelectedRealEstateMap(recordId) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateUI/getRealEstate/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateUI.arrangeSelectedRealEstateMap(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSelectedRealEstateMap(data) {
        var strMap = "realEstateMapDashboard"
        document.getElementById('realEstateMapHolder').innerHTML = `<div id='${strMap}' style='width: 100%; height: 100%;'></div>`;
        var geocodeService = L.esri.Geocoding.geocodeService();

        var latlng = new L.LatLng(data.getProp("latitude"), data.getProp("longitude"));
        var myMap = L.map(strMap).setView(latlng, 13);

        var marker = function (error, result) {
            if (error) {
                return;
            }
            console.log(result.address.Match_addr);
            realEstateUI.lastGeoResult = result;
            var str = `
                <div style="min-width: 300px; padding-bottom: 10px;">
                    <span>${result.address.Match_addr}</span><br/>
                    <a href="#" class="pull-right btnUpdateRealEstateLocation" recordId="${storage.latestRealEstateId}"><i class="fa fa-pencil"></i> Update&nbsp;Location</a>
                </div>
            `;
            L.marker(result.latlng).addTo(myMap).bindPopup(str).openPopup();
        };

        var mapClicked = function (e) {
            geocodeService.reverse().latlng(e.latlng).run(marker);
        }
        myMap.on('click', mapClicked);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);
        L.Control.geocoder().addTo(myMap);
        geocodeService.reverse().latlng(latlng).run(marker);
    }

    updateRealEstateLocation(obj) {
        var recordId = $(obj).attr("recordId");
        console.log("RECORD ID == " + recordId);
        console.log(realEstateUI.lastGeoResult);

        var tmp = {};
        tmp["recordId"] = recordId;
        tmp["location"] = realEstateUI.lastGeoResult;

        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateUI/post/updateRealEstateLocation`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);
        var successCallback = function (data) {
            console.log(data);
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successCallback);
    }

    loadRealEstateProfile(recordId) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateUI/getRealEstateProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            var address = `${data.getPropDefault("streetNumber", "")} ${data.getPropDefault("streetName")} ${data.getPropDefault("zipCode")}`;
            var zipCode = data.getPropDefault("zipCode", "--");
            var latitude = data.getPropDefault("latitude", "--");
            var longitude = data.getPropDefault("longitude", "--");
            var residingCompany = data.getPropDefault("companyName", "--");
            var hqAddress = data.getPropDefault("hqAddress", "--");
            var contact = data.getPropDefault("contact", "--");
            var email = data.getPropDefault("email", "--");

            $(".RealEstateUI_RealEstateAddress").html(address);
            $(".RealEstateUI_RealEstateZipCode").html(zipCode);
            $(".RealEstateUI_RealEstateLatitude").html(latitude);
            $(".RealEstateUI_RealEstateLongitude").html(longitude);
            $(".RealEstateUI_RealEstateResidingCompany").html(residingCompany);
            $(".RealEstateUI_RealEstateHQAddress").html(hqAddress);
            $(".RealEstateUI_RealEstateContact").html(contact);
            $(".RealEstateUI_RealEstateEmail").html(email);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    selectRealEstate(obj) {
        var recordId = $(obj).attr("recordId");
        storage.latestRealEstateId = recordId;
        var tabName = $(obj).attr("tabName");
        console.log(tabName);

        if (tabName == "dashboard") {
            realEstateUI.loadLastSelectedRealEstate();
        }
    }

    searchRealEstateFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateUI/filterRealEstate/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateUI.arrangeSearchedRealEstates(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    loadTopRealEstate() {
        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/RealEstateUI/getTopRealEstates`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            realEstateUI.arrangeSearchedRealEstates(data, "dashboard");
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedRealEstates(data, tabName) {
        console.log(data);
        var divName = `.searchRealEstates[module="RealEstateUI"][tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var RealEstateName = obj.getProp("streetNumber") + " " + obj.getProp("streetName");
            var zipCode = obj.getPropDefault("zipCode", "");
            var companyName = obj.getPropDefault("companyName", "");
            var hqAddress = obj.getPropDefault("hqAddress", "");
            var email = obj.getPropDefault("email", "");
            var citizenName = obj.getPropDefault("citizenName", "");
            var realEstateId = obj.getProp("realEstateId");
            var latitude = obj.getProp("latitude");
            var longitude = obj.getProp("longitude");
            var str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 50%;">
                        <span><a href="#" class="RealEstateUI_selectRealEstate" recordId="${realEstateId}" module="RealEstateUI" tabName="${tabName}">${RealEstateName}</a></span>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-home"></i> ${zipCode}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted"><i class="fa fa-compass"> Lat: </i> ${latitude}</small>
                    </div>
                    <div style="flex: 50%">
                        <small class="text-muted pull-right"><i class="fa fa-compass"> Long: </i> ${longitude}</small>
                    </div>
                    <div style="flex: 50%">
                        <span class="text-muted">Company: ${companyName}</span>
                    </div>
                    <div style="flex: 50%">
                        <span class="text-muted pull-right">HQ: ${hqAddress}</span>
                    </div>
                    <div style="flex: 50%">
                        <span class="text-muted">Contact: ${citizenName}</span>
                    </div>
                    <div style="flex: 50%">
                        <span class="text-muted pull-right">${email}</span>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            $(divName).append(str);
        });
    }
}

