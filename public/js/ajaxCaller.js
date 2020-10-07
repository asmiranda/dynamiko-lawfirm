class AjaxCaller {
    beforeSend(xhr) {
        if (storage.getToken()) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + storage.getToken());
            // console.log("Sending token headers " + 'Authorization', 'Bearer ' + storage.getToken());
        }
    }

    errFunction(jqXHR, textStatus, errorThrown) {
        if ("Access Denied" == jqXHR.responseJSON.message) {
            // window.location.href = "login.html";
        }
        else {
            if (jqXHR.responseJSON) {
                showModuleHelp.show("Information", jqXHR.responseJSON.message);
            }
            else {
                showModuleHelp.show("Information", jqXHR.responseText);
            }
        }
    }

    ajaxGetErr(dto, callback, errorCallback) {
        $.ajax({
            type: 'GET',
            url: dto.url,
            data: dto.data,
            contentType: 'application/json',
            beforeSend: ajaxCaller.beforeSend,
            error: errorCallback,
            success: callback
        });
    }
    ajaxGet(dto, callback) {
        $.ajax({
            type: 'GET',
            url: dto.url,
            data: dto.data,
            contentType: 'application/json',
            beforeSend: ajaxCaller.beforeSend,
            error: ajaxCaller.errFunction,
            success: callback
        });
    }
    ajaxPost(dto, callback) {
        $.ajax({
            type: 'POST',
            url: dto.url,
            data: dto.data,
            contentType: 'application/json',
            beforeSend: ajaxCaller.beforeSend,
            error: ajaxCaller.errFunction,
            success: callback
        });
    }
    uploadCSV(callback, formUploadData) {
        var vurl = MAIN_URL + '/api/utils/uploadData/' + storage.getCompanyCode() + '/' + storage.chosenReport;

        console.log(vurl);
        $.ajax({
            url: vurl,
            type: "POST",
            data: formUploadData,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            beforeSend: ajaxCaller.beforeSend,
            success: callback,
        });
    }
    getAllFiles(callback, moduleName, recordId) {
        $.ajax({
            type: 'GET',
            url: `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/attachment/${moduleName}/${recordId}`,
            data: "",
            contentType: 'application/json',
            beforeSend: ajaxCaller.beforeSend,
            success: callback
        });
    }
    displayReport(reportName, vdata) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/report/${reportName}`, true);
        xhr.responseType = 'arraybuffer';
        xhr.setRequestHeader('Authorization', 'Bearer ' + storage.getToken());

        xhr.onload = function (e) {
            if (this.status == 200) {
                var file = new Blob([xhr.response], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                $("#reportContent").attr("data", fileURL);
            }
        };
        xhr.send(vdata);
    }
    displayDynamicReport(entity, selectedValue) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/report/dynamic/${entity}/${selectedValue}`, true);
        xhr.responseType = 'arraybuffer';
        xhr.setRequestHeader('Authorization', 'Bearer ' + storage.getToken());

        xhr.onload = function (e) {
            if (this.status == 200) {
                var file = new Blob([xhr.response], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                $("#reportDynamicContent").attr("data", fileURL);
            }
        };
        xhr.send(vdata);
    }
    uploadFile(callback, moduleName, moduleCode, uploadType, formUploadData) {
        var vurl = `${MAIN_URL}/api/generic/attachment/upload/${uploadType}/${moduleName}/${moduleCode}`;
        console.log(vurl);
        $.ajax({
            url: vurl,
            type: "POST",
            data: formUploadData,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            beforeSend: ajaxCaller.beforeSend,
            success: callback,
        });
    }
    deleteFile(callback, fileUploadId) {
        $.ajax({
            url: MAIN_URL + "/api/generic/attachment/delete/" + fileUploadId,
            type: "GET",
            data: "",
            contentType: 'application/json',
            beforeSend: ajaxCaller.beforeSend,
            success: callback,
        });
    }
    loadGetBytes(callback, url) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.onload = function () {
            if (this.readyState === this.DONE) {
                if (this.status === 200) {
                    // this.response is a Blob, because we set responseType above
                    var data_url = URL.createObjectURL(this.response);
                    callback(data_url);
                } else {
                    console.error('no pdf :(');
                }
            }
        };
        xhr.responseType = 'blob';
        xhr.setRequestHeader('Authorization', 'Bearer ' + storage.getToken());
        xhr.send();
    }
    loadPostBytes(callback, url, vdata) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', url);
        xhr.onload = function () {
            if (this.readyState === this.DONE) {
                if (this.status === 200) {
                    // this.response is a Blob, because we set responseType above
                    var data_url = URL.createObjectURL(this.response);
                    callback(data_url);
                } else {
                    console.error('no pdf :(');
                }
            }
        };
        xhr.responseType = 'blob';
        xhr.setRequestHeader('Authorization', 'Bearer ' + storage.getToken());
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(vdata);
    }
}

$(function () {
    ajaxCaller = new AjaxCaller();
});
