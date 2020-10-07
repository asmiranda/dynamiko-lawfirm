class SchoolStaffHome extends FacultyHome {
    initListeners() {
        super.initListeners();
        let context = this;
        $(document).on('change', '#selectAllFacultyModule', function () {
            context.changeModule(this);
        });
    }

    changeModule(obj) {
        let code = $(obj).val();
        let record = storage.get(code);

        this.loadModuleDetail(record.section, record.subject);
        this.loadActivities(record.section, record.subject);
        this.loadStudents(record.section, record.subject);
    }

    loadFacultyModule() {
        let key = "allFacultyModules";
        let context = this;
        let cache_data = storage.get(key);
        if (cache_data) {
            context.arrangeFacultyModules(cache_data);
        }
        else {
            let url = `${MAIN_URL}/api/generic/widget/SchoolUI/getAllFacultyModules`;
            let ajaxRequestDTO = new AjaxRequestDTO(url, "");
            let successFunction = function (data) {
                storage.set(key, data);
                context.arrangeFacultyModules(data);
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
        }
    }

    arrangeFacultyModules(data) {
        console.log(data);
        $("#selectAllFacultyModule").empty();
        let section = "";
        let subject = "";
        $(data).each(function (index, obj) {
            let _id = obj.getPropDefault("_id", "--");
            let facultyEmail = obj.getPropDefault("facultyEmail", "--");
            let time = obj.getPropDefault("time", "--");
            if (facultyEmail) {
                section = obj.getPropDefault("section", "--");
                subject = obj.getPropDefault("subject", "--");
                storage.set(_id, obj);
                let str = `
                    <option value="${_id}">${section}-${subject} - ${time} by ${facultyEmail}</option>
                `;
                $("#selectAllFacultyModule").append(str);
            }
        });
        this.loadModuleDetail(section, subject);
        this.loadActivities(section, subject);
        this.loadStudents(section, subject);
    }

    init() {
        this.saveMode = false;
        this.webinarMode = false;
        this.initListeners();
        if (storage.getToken() && storage.getToken().length > 20) {
            $("#welcome").show();

            this.loadProfile();
            this.loadFacultyModule();
        }
        else {
            $("#welcome").hide();
        }
    }

}


$(function () {
    studentHome = new SchoolStaffHome();
})