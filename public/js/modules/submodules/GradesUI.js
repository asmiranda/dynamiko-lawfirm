class GradesUI extends AbstractSubUI {
    constructor() {
        super("GradesUI");
        var context = this;
        $(document).on('change', `.HiddenAutoComplete[scheduleCode="sectionCode"][module="GradesPerSectionUI"]`, function() {
            context.changeSchedule(this);
        });
    }

    changeSchedule(obj) {
        console.log("CALLED changeSchedule", obj);
    }

    changeModule(evt) {
        console.log("changeModule");
        gradesUI.loadTopRecords("Grades");
        reportUI.loadReportList("GradesUI");
    }

    newRecord() {   
        this.clearModuleInputs(this.moduleName);
    }

    formatSearchList(index, obj, tabName) {
        var accountName = obj.getProp("lastName") + ", " + obj.getProp("firstName");
        var level = obj.getPropDefault("gradeLevel", "--");
        var accountNumber = obj.getPropDefault("invoiceNumber", "--");
        var email = obj.getPropDefault("email");
        var StudentId = obj.getPropDefault("StudentId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${StudentId}" module="${this.moduleName}" tabName="${tabName}">${accountName}</a></span>
                    <span class="pull-right">Level: ${level}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${StudentId}" module="${this.moduleName}" tabName="${tabName}">
                        Invoice #: ${accountNumber}</a></span>
                    <span class="pull-right" style="font-size: 14px;">${email}</span><br/>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    gradesUI = new GradesUI();
    registeredModules.push("gradesUI");
});
