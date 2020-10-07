class FacultyMeetingUI extends AbstractUI {
    constructor() {
        super("FacultyMeetingUI");
        this.links = [
            {
                "bgcolor": "#03A9F4",
                "icon": "+"
            },
            {
                "url": "http://plus.google.com",
                "bgcolor": "#DB4A39",
                "color": "#fffff",
                "icon": "<i class='fa fa-google-plus'></i>",
                "target": "_blank"
            },
            {
                "url": "http://www.facebook.com",
                "bgcolor": "#3B5998",
                "color": "#fffff",
                "icon": "<i class='fa fa-facebook'></i>",
                "target": "_blank"
            },
            {
                "url": "https://www.jqueryscript.net",
                "bgcolor": "#263238",
                "color": "white",
                "icon": "<i class='fa fa-home'></i>"
            }
        ]

        var context = this;

        // $(document).on('click', `.btnChooseMeetingRoom`, function () {
        //     context.chooseMeetingRoom(this);
        // });
    }

    chooseMeetingRoom(obj) {
        var roomName = $(obj).attr("name");
        var conCompany = $(obj).attr("conCompany");
        var conRoom = $(obj).attr("conRoom");
        $("#roomNameDisplay").html(roomName);
        meetingRoom.joinNoPopup(roomName, conCompany, conRoom);
    }

    loadMeetings(moduleName) {
        utils.showSpin();
        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/${moduleName}/getMeetings`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var context = this;
        var successCallback = function (data) {
            console.log("loadMeetings", url, data);
            context.arrangeMeetingRecords(data, moduleName);
            $(".myMeetingButtonGroup").show();
            utils.hideSpin();
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    arrangeMeetingRecords(data, moduleName) {
        var context = this;
        var divSelector = `#myMeetings`;
        $(divSelector).empty();
        $(data).each(function (index, obj) {
            var conCompany = obj.getProp("conCompany");
            var conRoom = obj.getProp("conRoom");
            var name = obj.getProp("name");
            var str = `<li><a href="#" class="btnChooseMeetingRoom ${moduleName}" conCompany="${conCompany}" conRoom="${conRoom}" module="${moduleName}" name="${name}">${name}</a></li>`;
            $(divSelector).append(str);
        });
    }

    changeModule(evt) {
        facultyMeetingUI.loadMeetings('FacultyMeetingUI');
        this.initFab();
    }

    initFab() {
        $('.btn-group-fab').on('click', '.btn', function () {
            $('.btn-group-fab').toggleClass('active');
        });
        $('has-tooltip').tooltip();
    }
}

$(function () {
    facultyMeetingUI = new FacultyMeetingUI();
});

