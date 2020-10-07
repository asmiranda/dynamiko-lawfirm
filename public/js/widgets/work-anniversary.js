class WorkAnniversaryWidget {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    loadData() {
        console.log("LOAD WORK ANNIVERSARY");

        if ($(".birthdays")) {
            var ajaxRequestDTO = new AjaxRequestDTO();
            ajaxRequestDTO.url = "/api/generic/" + storage.getCompanyCode() + "/widget/WorkAnniversaryWidget";
            ajaxRequestDTO.data = "";

            var successFunction = function (data) {
                console.log(data);
                console.log("Complete Called.");
                $.each(data, function (i, obj) {
                    //use obj.id and obj.name here, for example:
                    $(".work-anniversary").append('<li><img src="/api/generic/' + storage.getCompanyCode() + '/profilePic/Person/' + obj.personId + '" alt="User Image" class="profile-img" data-name="' + obj.firstName + ' ' + obj.lastName + '"><a class="users-list-name" href="#">' + obj.firstName + ' ' + obj.lastName + '</a><span class="users-list-date">' + obj.annivCount + '</span></li>');
                });
                $('.profile-img').on('error', function () {
                    /* Fire your image resize code here */
                    console.log("Images Not Loaded");
                    $(this).initial({
                        charCount: 2,
                    });
                });
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
        }
    }
}
