class EnrollmentUI extends AbstractSubUI {
    constructor() {
        super("EnrollmentUI");
        this.EnrollmentScheduleUI = "EnrollmentScheduleUI";

        let context = this;
        $(document).on(`changeAutoComplete[studentEmail][EnrollmentUI]`, function () {
            context.loadStudentEnrollment(this);
        });
        $(document).on("click", `.btnRemoveSchedule`, function () {
            context.btnRemoveSchedule(this);
        });

    }

    btnRemoveSchedule(obj) {
        let studentEmail = $(`input.HiddenAutoComplete[name="studentEmail"]`).val();
        let rowOffset = $(obj).attr("rowIndex")
        let schoolScheduleCode = $(`input.HiddenAutoComplete[rowIndex="${rowOffset}"][name="schoolScheduleCode"]`).val();

        var url = `${MAIN_URL}/api/generic/widget/${this.moduleName}/removeSchedule/${studentEmail}/${schoolScheduleCode}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let context = this;
        var successFunction = function (data) {
            console.log("loadRecordProfile", url, data);
            context.arrangeRecordProfile(data, `editRecord`);
            context.arrangeRecordProfileAllSubRecords(data, `editRecord`);
            autoSaveSubRecord = true;
            context.initFieldListener();
            context.onProfileLoaded(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    loadStudentEnrollment() {
        let studentEmail = $(`input.HiddenAutoComplete[name="studentEmail"]`).val();

        var url = `${MAIN_URL}/api/generic/widget/${this.moduleName}/loadStudentEnrollment/${studentEmail}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        let context = this;
        var successFunction = function (data) {
            console.log("loadRecordProfile", url, data);
            context.arrangeRecordProfile(data, `editRecord`);
            context.arrangeRecordProfileAllSubRecords(data, `editRecord`);
            autoSaveSubRecord = true;
            context.initFieldListener();
            context.onProfileLoaded(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
        this.formatSubRecordsFromMain(this.EnrollmentScheduleUI, data, clsName);
    }

    changeModule(evt) {
        console.log("changeModule");
        enrollmentUI.loadTopRecords("Enrollment");
        this.clearSubRecordsHolder(this.EnrollmentScheduleUI);
        this.appendSubRecordsHolder(this.EnrollmentScheduleUI)
    }

    newRecord() {
        this.clearModuleInputs(this.moduleName);
        this.clearSubRecordsHolder(this.EnrollmentScheduleUI);
        this.appendSubRecordsHolder(this.EnrollmentScheduleUI)
    }

    formatSearchList(index, obj, tabName) {
        var accountName = obj.getProp("lastName") + ", " + obj.getProp("firstName");
        var EnrollmentId = obj.getPropDefault("id");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${EnrollmentId}" module="${this.moduleName}" tabName="${tabName}">${accountName}</a></span>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    enrollmentUI = new EnrollmentUI();
    registeredModules.push("enrollmentUI");
});
