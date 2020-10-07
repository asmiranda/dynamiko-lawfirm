class HospitalUI {
    changeMainId(obj) {
        utils.loadRecordToForm(obj, hospitalUI);
    }

    doMainSearchData(evt) {
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/HospitalUI/quickMainSearcher/${storage.filterText}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $(".quickMainSearcherResult").empty();
            $(data).each(function (index, obj) {
                var recordId = obj.getPropDefault("id", "0");
                var lastName = obj.getPropDefault("lastName", "");
                var firstName = obj.getPropDefault("firstName", "");
                var contact = obj.getPropDefault("contact", "");
                var email = obj.getPropDefault("email", "");

                var str = `
                    <a href="#" class="loadRecordToForm" module="HospitalUI" recordid="${recordId}" style="font-weight: bold;">${firstName} ${lastName}</a>
                    <p class="text-muted">
                        <i class="fa fa-phone margin-r-5"></i>: ${contact}<br/>
                        <i class="fa fa-envelope margin-r-5"></i>: ${email}
                    </p>
                    <hr>
                `
                $(".quickMainSearcherResult").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    changeModule(evt) {
        hospitalUI.init();

        personTaskUI.loadTodoList();
    }

    init() {
        $("#dynamikoMainSearch").hide();
    }
}

