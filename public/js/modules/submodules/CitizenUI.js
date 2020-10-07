class CitizenUI {

    loadCitizenProfile(obj, tabName) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/CitizenUI/getCitizenProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            var citizenName = data.getProp("firstName") + " " + data.getProp("lastName");
            var job = data.getProp("specialization");
            var email = data.getProp("email");
            var contact = data.getProp("contact");

            $(".CitizenUI_CitizenName").html(citizenName);
            $(".CitizenUI_Citizen_Job").html(job);
            $(".CitizenUI_Citizen_Email").html(email);
            $(".CitizenUI_Citizen_Contact").html(contact);
            $(".CitizenUI_ProfilePic").attr("src", `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/CitizenUI/${recordId}/${utils.nowString()}`);
            $(".CitizenUI_ProfilePic").attr("recordId", recordId);
            $(".CitizenUI_ProfilePic").show();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    searchCitizenFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/CitizenUI/filterCitizen/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            citizenUI.arrangeSearchedCitizens(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedCitizens(data, tabName) {
        console.log(data);
        var divName = `.searchCitizens[module="CitizenUI"][tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var citizenName = obj.getProp("firstName") + " " + obj.getProp("lastName");
            var email = obj.getPropDefault("email", "");
            var recordId = obj.getProp("citizenId");
            var str = `
                <a href="#" class="CitizenSelect" module="CitizenUI" tabName="${tabName}" recordId="${recordId}" style="font-weight: bolder;">${citizenName}</a>
                <span class="text-muted">
                    ${email}
                </span>
                <hr>
            `;
            $(divName).append(str);

        });
    }
}

