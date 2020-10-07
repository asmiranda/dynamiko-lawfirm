class MainInitializer {
    profilePicDropZone;
    uploadFileDropZone;

    initialize() {
        console.log("Initializer")
        let context = this;
        if (storage.getToken()) {
            leftMenu.init();
            uiService.initHome();
            $(".userProfile").attr("src", `${MAIN_URL}/api/pgeneric/profilePic/${storage.get("Person").email}/${storage.get("Person").gender}`)
            context.sidebarToggle();

            this.profilePicDropZone = new Dropzone("div#profileDropZone",
                {
                    url: "/api/generic/uploadProfilePic",
                    acceptedFiles: "image/*",
                    capture: "camera",
                    headers: { "Authorization": 'Bearer ' + storage.getToken() },
                    complete: function (file) {
                        $(".userProfile").attr("src", `${MAIN_URL}/api/pgeneric/profilePic/${storage.get("Person").email}/${storage.get("Person").gender}?any=${Math.random()}`)
                        context.profilePicDropZone.removeFile(file)
                        $("div#profileDropZoneModal").dialog("close");
                        $.toast({
                            text: 'Profile Pic Uploaded!',
                            icon: "success",
                            position: 'bottom-center',
                        })
                    }
                });

            this.uploadFileDropZone = new Dropzone("div#uploadFileDropZone",
                {
                    url: "/api/generic/uploadFile",
                    headers: { "Authorization": 'Bearer ' + storage.getToken() },
                    complete: function (file) {
                        context.uploadFileDropZone.removeFile(file)
                        $("div#uploadFileDropZoneModal").dialog("close");
                        $.toast({
                            text: 'File Uploaded!',
                            icon: "success",
                            position: 'bottom-center',
                        })
                    }
                });

            $(document).on('click', '.btnUploadProfilePic', function () {
                context.btnUploadProfilePic();
            });
            $(document).on('click', '.btnUploadProfilePic', function () {
                context.btnUploadProfilePic();
            });
            $(document).on('click', '.sidebar-toggle', function () {
                setTimeout(function () {
                    context.sidebarToggle();
                }, 500);
            });

        }
        else {
            // window.location.href = "login.html";
        }
        $(document).on('click', '.btnLogout', function () {
            context.btnLogout(this);
        });
    }

    sidebarToggle() {
        let transform = "-" + $(".main-sidebar").css("transform");
        console.log(`transform == (${transform})`);
        if (transform.includes("-230")) {
            $(".bottomButtons").animate({ marginLeft: 0 });
        }
        else if (transform.includes("-50")) {
            $(".bottomButtons").animate({ marginLeft: 0 });
        }
        else {
            let width = "-" + $(".main-sidebar").css("width");
            console.log(width);
            $(".bottomButtons").animate({ marginLeft: width });
        }
    }

    btnLogout() {
        storage.clearToken();
        window.location.href = "loginNoRedirect.html";
    }

    btnUploadProfilePic() {
        $("div#profileDropZoneModal").dialog({
            modal: true
        });
    }

}

$(function () {
    mainInitializer = new MainInitializer();
    mainInitializer.initialize();
})