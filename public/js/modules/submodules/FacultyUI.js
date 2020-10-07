class FacultyUI extends AbstractSubUI {
    constructor() {
        super("FacultyUI");
    }

    changeModule(evt) {
        console.log("changeModule");
        facultyUI.loadTopRecords("Faculty");
        // reportUI.loadReportList("AdmissionUI");
    }

    newRecord() {
        this.clearModuleInputs(this.moduleName);
    }

    formatSearchList(index, obj, tabName) {
        var accountName = obj.getProp("lastName") + ", " + obj.getProp("firstName");
        var email = obj.getPropDefault("email");
        var recordId = obj.getPropDefault("_id");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${recordId}" module="${this.moduleName}" tabName="${tabName}">${accountName}</a></span>
                </div>
                <div style="flex: 100%;">
                    <span style="font-size: 14px;">${email}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    facultyUI = new FacultyUI();
    registeredModules.push("facultyUI");
});
