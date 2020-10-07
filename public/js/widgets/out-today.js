class OutTodayWidget {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    loadData() {
        console.log("LOAD OUT TODAY");

        if ($(".out-today")) {
            var ajaxRequestDTO = new AjaxRequestDTO();
            ajaxRequestDTO.url = "/api/generic/" + storage.getCompanyCode() + "/widget/OutTodayWidget";
            ajaxRequestDTO.data = "";

            var successFunction = function (data) {
                console.log(data);
                console.log("Complete Called.");
                $.each(data, function (i, obj) {
                    //use obj.id and obj.name here, for example:
                    $(".out-today").append('<li><img src="/api/generic/' + storage.getCompanyCode() + '/profilePic/Person/' + obj.employeeId + '" alt="User Image" class="profile-img" data-name="' + obj.firstName + ' ' + obj.lastName + '"><a class="users-list-name" href="#">' + obj.firstName + ' ' + obj.lastName + '</a></li>');
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
