class LeftMenu {
    latestModule = "";
    latestModuleCode = "";

    init() {
        console.log("LEFT MENU CALLED WITH DASHBOARD...");
        $(document).on('click', '.leftDashboardItem', function () {
            dashboard.load(this);
        });
        $(document).on('click', '.leftMenuItem[report="true"]', function () {
            mainReport.constructMainReport(this);
        });
        $(document).on('click', '.leftMenuItem[report="false"]', function () {
            leftMenu.loadUI(this);
        });

        let person = storage.get("Person");
        let roles = person.roles;
        let str = JSON.stringify(roles);
        if (str.includes("Student")) {
            let schedules = storage.get("Person").schedules;
            $.each(schedules, function (offset, obj) {
                let str = `<li><a href="#" class="btnSchedule" section="${obj.section}" subject="${obj.subject}"><i class="${obj.getProp("icon")}"></i> <span>${obj.section} - ${obj.subject}</span></a></li>`;
                $(".mysidemenu").append(str);
            })
        }
        else if (str.includes("Faculty")) {
            let schedules = storage.get("Person").schedules;
            $.each(schedules, function (offset, obj) {
                let str = `<li><a href="#" class="btnSchedule" section="${obj.section}" subject="${obj.subject}"><i class="${obj.getProp("icon")}"></i> <span>${obj.section} - ${obj.subject}</span></a></li>`;
                $(".mysidemenu").append(str);
            })
        }
        else if (str.includes("SchoolStaff")) {
            let modules = storage.get("Person").modules;
            $.each(modules, function (offset, obj) {
                let str = `<li><a href="#" class="leftMenuItem ${obj.getProp("module")}" data="${obj.getProp("module")}" code="${obj.getProp("code")}" report="false"><i class="${obj.getProp("icon")}"></i> <span>${obj.getProp("label")}</span></a></li>`;
                $(".mysidemenu").append(str);
            })
        }
    };

    addDashboard(data) {
        $.each(data, function (i, obj) {
            if (obj.getProp("dashboard")) {
                $(".mysidemenu").append('<li><a href="#" class="leftDashboardItem" data="' + obj.getProp("name") + '"><i class="' + obj.getProp("icon") + '"></i> <span>' + obj.getProp("label") + '</span></a></li>');
            }
        });
    }

    loadUI(obj) {
        this.latestModule = $(obj).attr("data");
        this.latestModuleCode = $(obj).attr("code");

        $(registeredModules).each(function (index, data) {
            var areEqual = data.toUpperCase() == leftMenu.latestModule.toUpperCase();
            if (areEqual) {
                var objEval = `${data}.loadUI()`;
                eval(objEval);
            }
        });
    }

    loadLatestUI() {
        constructMainForm.construct(leftMenu.latestModule, leftMenu.latestModuleCode);
    }
}

$(function () {
    leftMenu = new LeftMenu();
})