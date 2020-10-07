class GovernmentAccountingUI {

    loadGovernmentAccountingProfile(obj, tabName) {
        var recordId = $(obj).attr("recordId");
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/GovernmentAccountingUI/getGovernmentAccountingProfile/${recordId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            var GovernmentAccountingName = data.getProp("firstName") + " " + data.getProp("lastName");
            var job = data.getProp("specialization");
            var email = data.getProp("email");
            var contact = data.getProp("contact");

            $(".GovernmentAccountingUI_GovernmentAccountingName").html(GovernmentAccountingName);
            $(".GovernmentAccountingUI_GovernmentAccounting_Job").html(job);
            $(".GovernmentAccountingUI_GovernmentAccounting_Email").html(email);
            $(".GovernmentAccountingUI_GovernmentAccounting_Contact").html(contact);
            $(".GovernmentAccountingUI_ProfilePic").attr("src", `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/profilePic/GovernmentAccountingUI/${recordId}/${utils.nowString()}`);
            $(".GovernmentAccountingUI_ProfilePic").attr("recordId", recordId);
            $(".GovernmentAccountingUI_ProfilePic").show();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    searchGovernmentAccountingFilter(obj) {
        var value = $(obj).val();
        var tabName = $(obj).attr("tabName");
        console.log(value);

        var recordId = $(mainId).val();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/GovernmentAccountingUI/filterGovernmentAccounting/${value}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successCallback = function (data) {
            GovernmentAccountingUI.arrangeSearchedGovernmentAccountings(data, tabName);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeSearchedGovernmentAccountings(data, tabName) {
        console.log(data);
        var divName = `.searchGovernmentAccountings[module="GovernmentAccountingUI"][tabName="${tabName}"]`;
        $(divName).empty();
        $(data).each(function (index, obj) {
            var GovernmentAccountingName = obj.getProp("firstName") + " " + obj.getProp("lastName");
            var email = obj.getPropDefault("email", "");
            var recordId = obj.getProp("GovernmentAccountingId");
            var str = `
                <a href="#" class="GovernmentAccountingSelect" module="GovernmentAccountingUI" tabName="${tabName}" recordId="${recordId}" style="font-weight: bolder;">${GovernmentAccountingName}</a>
                <span class="text-muted">
                    ${email}
                </span>
                <hr>
            `;
            $(divName).append(str);

        });
    }
}

