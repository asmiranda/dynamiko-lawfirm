class LoginJS {
    initialize() {
        if (storage.getToken()) {
            let url = `${MAIN_URL}/api/auth/validateToken`;
            let ajaxRequestDTO = new AjaxRequestDTO(url, "");
            ajaxCaller.ajaxGet(ajaxRequestDTO, function (data) {
                if (data) {
                    console.log(data.token);
                    storage.setToken(data.token);
                    storage.set("Person", data.person);
                    loginJS.redirectHome();
                }
                else {
                    storage.clearToken();
                }
            });
        }
        else {
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%' /* optional */
            });
        }
        $('.logInput').keypress(function (e) {
            if (e.which == 13) {
                login();
            }
        });
        $("#btnLogin").click(function () {
            login();
        });
    }

    token() {
        console.log(session.getToken());
        return session.getToken();
    };

    hasRole(role) {
        var withRole = false;
        let roles = storage.get("RolesObj");
        $(roles).each(function (index, obj) {
            var authority = obj.getPropDefault("authority", "--");
            if (authority.toUpperCase() == role.toUpperCase()) {
                withRole = true;
            }
        })
        console.log(roles);
        return withRole;
    }

    redirectHome() {
        let roles = storage.get("Person").roles;
        let str = JSON.stringify(roles);
        let redUrl = "";
        if (str.includes("Student")) {
            redUrl = "student-home.html"
        }
        else if (str.includes("Faculty")) {
            redUrl = "faculty-home.html"
        }
        else if (str.includes("SchoolStaff")) {
            redUrl = "home.html";
        }
        setTimeout(function () {
            window.location.href = redUrl;
        }, 500);
    }

    login(uname, pword, successFunc) {
        var vdata = JSON.stringify({ "username": uname, "password": pword });
        console.log(vdata);
        $.ajax({
            url: MAIN_URL + '/api/auth/signin',
            type: 'POST',
            data: vdata,
            contentType: 'application/json',
            success: function (data) {
                console.log(data.token);
                storage.setToken(data.token);
                storage.set("Person", data.person);
                if (successFunc) {
                    successFunc(data);
                }
                else {
                    loginJS.redirectHome();
                }
            },
            error: function (data) {
                storage.clearToken();
                console.log(data.responseJSON.message);
                $.toast({
                    text: data.responseJSON.message,
                    icon: "error",
                    position: 'mid-center',
                })
            }
        });
    }

    testLogin(uname, successFunc) {
        var context = this;
        var vdata = JSON.stringify({ "username": uname, "password": "password" });
        console.log(vdata);
        $.ajax({
            url: MAIN_URL + '/api/auth/signin',
            type: 'POST',
            data: vdata,
            contentType: 'application/json',
            success: function (data) {
                console.log(data.token);
                storage.storeAccountToken(uname, data);
                loginJS.loadProfile(sessionStorage.token);
                successFunc();
            },
            error: function (data) {
                storage.clearToken();
                console.log(data.responseJSON.message);
                $.toast({
                    text: data.responseJSON.message,
                    icon: "error",
                    position: 'mid-center',
                })
            }
        });
    }

    register(uname, pword, firstName, lastName) {
        console.log(firstName);
        console.log(lastName);
        var vdata = JSON.stringify({ "username": uname, "password": pword, "name": firstName, "lastName": lastName });
        var redUrl = this.redirectURL;
        console.log(vdata);
        $.ajax({
            url: MAIN_URL + '/api/auth/register',
            type: 'POST',
            data: vdata,
            contentType: 'application/json',
            success: function (data) {
                console.log(data);

            },
            error: function (data) {
                storage.clearToken();
                console.log(data.responseJSON.message);
                $.toast({
                    text: data.responseJSON.message,
                    icon: "error",
                    position: 'mid-center',
                })
            }
        });
    }

    loadProfile(token, successFunc) {
        let url = `${MAIN_URL}/api/auth/getProfile`;
        let ajaxRequestDTO = new AjaxRequestDTO(url, "");
        let successFunction = function (data) {
            storage.setCompanyCode(data.getPropDefault("companyCode", "--"));
            storage.set("UserObj", data.getPropDefault("user", "--"));
            storage.set("PersonObj", data.getPropDefault("person", "--"));
            storage.set("RolesObj", data.getPropDefault("roles", "--"));
            storage.setToken(token);
            if (successFunc) {
                successFunc();
            }
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }
}

$(function () {
    loginJS = new LoginJS();
});
