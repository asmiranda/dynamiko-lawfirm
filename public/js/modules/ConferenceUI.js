class ConferenceUI extends AbstractUI { 
    constructor() {
        super("ConferenceUI");
        var context = this;

    }

    changeModule(evt) {
        conferenceRoomUI.loadTopRecords("ConferenceRoom");
    }
}

$(function () {
    conferenceUI = new ConferenceUI();
});

