const schoolScheduleUI = require('./SchoolScheduleUI')
const facultyUI = require('./FacultyUI')
const studentUI = require('./StudentUI')
const enrollmentUI = require('./EnrollmentUI')
const personUI = require('./PersonUI')
const schoolUI = require('./SchoolUI')
const enrollmentScheduleUI = require('./EnrollmentScheduleUI')

class ModuleHelper {
    allUI = [];

    constructor() {
        this.allUI.push(schoolScheduleUI)
        this.allUI.push(facultyUI)
        this.allUI.push(studentUI)
        this.allUI.push(enrollmentUI)
        this.allUI.push(personUI)
        this.allUI.push(schoolUI)
        this.allUI.push(enrollmentScheduleUI)
    }

    async getAutoComplete(request, callback) {
        let widgetFound = false;
        let widget = null;
        for (let ui of this.allUI) {
            const widgetName = request.params.widget;
            if (ui.constructor.name == widgetName) {
                widgetFound = true;
                widget = ui;
                break;
            }
        }
        if (widgetFound) {
            widget.getAutoComplete(request, callback)
        }
        else {
            throw new Error(`Widget not found [${request.query.widget}] `)
        }
    }

    async getAutoCompleteLabel(request, callback) {
        let widgetFound = false;
        let widget = null;
        for (let ui of this.allUI) {
            const widgetName = request.params.widget;
            if (ui.constructor.name == widgetName) {
                widgetFound = true;
                widget = ui;
                break;
            }
        }
        if (widgetFound) {
            widget.getAutoCompleteLabel(request, callback)
        }
        else {
            throw new Error(`Widget not found [${request.query.widget}] `)
        }
    }

    async getPWidget(request, callback) {
        let widgetFound = false;
        let widget = null;
        for (let ui of this.allUI) {
            const widgetName = request.query.widget;
            if (ui.constructor.name == widgetName) {
                widgetFound = true;
                widget = ui;
                break;
            }
        }
        if (widgetFound) {
            widget.getPWidget(request, callback)
        }
        else {
            throw new Error(`Widget not found [${request.query.widget}] `)
        }
    }

    async getWidget(request, callback) {
        let widgetFound = false;
        let widget = null;
        for (let ui of this.allUI) {
            const widgetName = request.params.widget;
            if (ui.constructor.name == widgetName) {
                widgetFound = true;
                widget = ui;
                break;
            }
        }
        if (widgetFound) {
            widget.getWidget(request, callback)
        }
        else {
            throw new Error(`Widget not found [${request.params.widget}] `)
        }
    }

    async getLeftMenu(user, callback) {
        let leftMenus = [];
        const roles = JSON.stringify(user.roles)

        if (roles.includes("SCHOOL STAFF")) {
            leftMenus.push(facultyUI.getLeftMenu(user))
            leftMenus.push(studentUI.getLeftMenu(user))
            leftMenus.push(schoolScheduleUI.getLeftMenu(user))
            leftMenus.push(enrollmentUI.getLeftMenu(user))
        }
        callback(leftMenus)
    }
}

const moduleHelper = new ModuleHelper();
module.exports = moduleHelper;
