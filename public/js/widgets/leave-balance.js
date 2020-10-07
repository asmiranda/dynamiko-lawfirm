class LeaveBalanceWidget {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    loadData() {
        console.log("LOAD LEAVE BALANCE");

        if ($(".leave-balance")) {
            var ajaxRequestDTO = new AjaxRequestDTO();
            ajaxRequestDTO.url = "/api/generic/" + storage.getCompanyCode() + "/widget/LeaveBalanceWidget";
            ajaxRequestDTO.data = "";

            var successFunction = function (data) {
                console.log(data);
                console.log("Complete Called.");
                $.each(data, function (i, obj) {
                    //use obj.id and obj.name here, for example:
                    $(".leave-balance").append('<a class="users-list-name" href="#">' + obj.firstName + ' ' + obj.lastName + '</a><span>SL : ' + obj.slBenefitDaysCount + ' - VL : ' + obj.vlBenefitDaysCount + '</span>');
                });
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
        }
    }
}
