class SchoolScheduleUI extends AbstractSubUI {
    constructor() {
        super("SchoolScheduleUI");
    }

    changeModule(evt) {
        console.log("changeModule");
        schoolScheduleUI.loadTopRecords("SchoolSchedule");
        // reportUI.loadReportList("SchoolScheduleUI");
    }

    newRecord() {
        this.clearModuleInputs(this.moduleName);
    }

    formatSearchList(index, obj, tabName) {
        let facultyEmail = obj.getPropDefault("facultyEmail", "--");
        let section = obj.getProp("section");
        let subject = obj.getPropDefault("subject", "--");
        let time = obj.getPropDefault("time", "--");
        let id = obj.getPropDefault("_id");
        if (section && subject && time) {
            let str = `
                <div style="display: flex; flex-wrap: wrap;">
                    <div style="flex: 100%;">
                        <span><a href="#" class="${this.selectSearchRecord}" recordId="${id}" module="${this.moduleName}" tabName="${tabName}">${facultyEmail}</a></span>
                        <span class="pull-right"></span><br/>
                    </div>
                    <div style="flex: 100%;">
                        <span><a href="#" class="${this.selectSearchRecord}" recordId="${id}" module="${this.moduleName}" tabName="${tabName}">${section}-${subject}</a></span>
                        <span class="pull-right"></span><br/>
                    </div>
                    <div style="flex: 100%;">
                        <span><a href="#" class="${this.selectSearchRecord}" recordId="${id}" module="${this.moduleName}" tabName="${tabName}">
                            ${time}</a></span>
                    </div>
                </div>
                <hr style="margin-top: 5px; width: 98%">
            `;
            return str;
        }
        else {
            return "";
        }
    }
}

$(function () {
    schoolScheduleUI = new SchoolScheduleUI();
    registeredModules.push("schoolScheduleUI");
});
