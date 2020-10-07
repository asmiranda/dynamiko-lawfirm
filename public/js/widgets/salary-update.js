class SalaryUpdateWidget {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    loadData() {
        console.log("LOAD SALARY UPDATE");

        if ($(".out-today")) {
            var ajaxRequestDTO = new AjaxRequestDTO();
            ajaxRequestDTO.url = "/api/generic/" + storage.getCompanyCode() + "/widget/SalaryUpdateWidget";
            ajaxRequestDTO.data = "";

            var successFunction = function (data) {
                console.log(data);
                console.log("Complete Called.");
                $.each(data, function (i, obj) {
                    //use obj.id and obj.name here, for example:
                    $(".out-today").append('<div class="col-sm-3"><img alt="user image" style="padding: 4px;" class="profile-img img-responsive img-circle" src="/api/generic/profilePic/Person/' + obj.employeeId + '" data-name="' + obj.firstName + ' ' + obj.lastName + '"></div>');
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
