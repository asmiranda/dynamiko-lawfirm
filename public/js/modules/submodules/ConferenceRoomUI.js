class ConferenceRoomUI extends AbstractSubUI {
    constructor() {
        super("ConferenceRoomUI");
        this.ConferenceRoomTenantUI = "ConferenceRoomTenantUI";

        $(document).on('click', `.btnJoinMeetingRoom`, function() {
            var roomName = $(`.editRecord[module="ConferenceRoomUI"][name="name"]`).val();
            var conCompany = $(`.editRecord[module="ConferenceRoomUI"][name="assignedConferenceCompany"]`).val();
            var conRoom = $(`.editRecord[module="ConferenceRoomUI"][name="assignedConferenceRoom"]`).val();
            meetingRoom.join(roomName, conCompany, conRoom);
        });
    }
    
    beforeSave(data) {
        data[this.ConferenceRoomTenantUI] = utils.collectSubRecordDataForSaving("editRecord", this.ConferenceRoomTenantUI);
        return data;
    }

    newRecord() {   
        this.clearModuleInputs(this.moduleName);
        this.clearSubRecordsHolder(this.ConferenceRoomTenantUI);
    }

    arrangeRecordProfileAllSubRecords(data, clsName) {
        this.formatSubRecordsFromMain(this.ConferenceRoomTenantUI, data, clsName);
    }

    formatSearchList(index, obj, tabName) {
        var payeeName = obj.getProp("name");
        var accountName = obj.getProp("hostName");
        var conferenceCode = obj.getPropDefault("conferenceCode","--");
        var totalAmount = obj.getPropDefault("description","--");
        var ConferenceRoomId = obj.getProp("ConferenceRoomId");
        var str = `
            <div style="display: flex; flex-wrap: wrap;">
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${ConferenceRoomId}" module="${this.moduleName}" tabName="${tabName}">${payeeName}</a></span>
                    <span class="pull-right">${accountName}</span><br/>
                </div>
                <div style="flex: 100%;">
                    <span><a href="#" class="${this.selectSearchRecord}" recordId="${ConferenceRoomId}" module="${this.moduleName}" tabName="${tabName}">Conference Code: ${conferenceCode}</a></span>
                </div>
            </div>
            <hr style="margin-top: 5px; width: 98%">
        `;
        return str;
    }
}

$(function () {
    conferenceRoomUI = new ConferenceRoomUI();
});

