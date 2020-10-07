class StudentScheduleUI extends AbstractUI {
    changeModule(evt) {
        console.log("Faculty Schedule Loaded.", evt);
    }

    btnJoinVirtualRoom(obj) {
        console.log("Called btnJoinVirtualRoom");
        let scheduleCode = $(obj).attr("code");
        // meetingRoom.join("Join Room", storage.getCompanyCode(), code);
        socketIOP2P.clearConnections();
        socketIOMeetingRoom.join("Join Room", scheduleCode);
    }

    loadedCallback(scheduleCode) {
        let context = this;
        $(document).on('click', `.btnJoinVirtualRoom[module="SchoolUI"]`, function () {
            context.btnJoinVirtualRoom(this);
        });

        personTaskUI.loadTodoList();
        schoolUI.loadFacultyHost(scheduleCode);
        schoolUI.loadActivities(scheduleCode);
        schoolUI.loadAnnouncements(scheduleCode);
        schoolUI.loadStudents(scheduleCode);
    }

}

$(function () {
    studentScheduleUI = new StudentScheduleUI();
});

