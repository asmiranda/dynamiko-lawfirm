class FacultyScheduleUI extends AbstractUI {
    changeModule(evt) {
        console.log("Faculty Schedule Loaded.", evt);
    }

    btnJoinVirtualRoom(obj) {
        console.log("Called btnJoinVirtualRoom");
        let code = $(obj).attr("code");
        // meetingRoom.join("Join Room", storage.getCompanyCode(), code);
        socketIOP2P.clearConnections();
        socketIOMeetingRoom.join("Join Room", code);
    }

    loadedCallback(data) {
        let context = this;
        $(document).on('click', `.btnJoinVirtualRoom[module="SchoolUI"]`, function () {
            context.btnJoinVirtualRoom(this);
        });

        personTaskUI.loadTodoList();
        schoolUI.loadFacultyHost(data);
        schoolUI.loadActivities(data);
        schoolUI.loadAnnouncements(data);
        schoolUI.loadStudents(data);
    }
}

$(function () {
    facultyScheduleUI = new FacultyScheduleUI();
});

