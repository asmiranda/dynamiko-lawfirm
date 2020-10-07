class NextHolidayWidget {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    loadData() {
        console.log("LOAD NEXT HOLIDAY");

        if ($(".birthdays")) {
            var ajaxRequestDTO = new AjaxRequestDTO();
            ajaxRequestDTO.url = "/api/generic/" + storage.getCompanyCode() + "/widget/NextHolidayWidget";
            ajaxRequestDTO.data = "";

            var successFunction = function (data) {
                console.log(data);
                console.log("Complete Called.");
                $.each(data, function (i, obj) {
                    //use obj.id and obj.name here, for example:
                    $(".next-holiday").append('<a class="users-list-name" href="#">' + obj.name + '</a><span>' + obj.nextHoliday + '</span>');
                });
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
        }
    }
}
