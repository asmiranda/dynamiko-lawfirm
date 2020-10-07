class ShowModalAny {
    show(title, helpHtml) {
        var context = this;
        alertConfirmActiveModal = $.alert({
            title: title,
            content: helpHtml,
        });
    }
}

class ShowModalAny1200 {
    show(title, helpHtml, callback) {
        var context = this;
        alertConfirmActiveModal = $.alert({
            title: title,
            content: helpHtml,
            boxWidth: '1200px',
            useBootstrap: false,
            dragWindowBorder: false,
            onContentReady: callback,
        });
    }
}

class ShowModalAny1200NoButtons {
    show(title, helpHtml, callback) {
        var context = this;
        alertConfirmActiveModal = $.alert({
            title: title,
            content: helpHtml,
            boxWidth: '1200px',
            useBootstrap: false,
            onContentReady: callback,
            draggable: true,
            dragWindowBorder: false,
            buttons: []
        });
    }
}

class ShowModalAny500 {
    show(title, helpHtml, callback) {
        var context = this;
        $.alert({
            title: title,
            content: helpHtml,
            boxWidth: '500px',
            useBootstrap: false,
            onContentReady: callback,
        });
    }
}

class ShowModuleHelp {
    show(title, helpHtml) {
        var context = this;
        if (helpHtml.indexOf('Expired') != -1) {
            // window.location.href = "login.html";
        }
        else {
            $.alert({
                title: title,
                content: helpHtml,
            });
        }
    }
}

class ShowAutoCompleteFieldHelp {
    show(title, field, objDefault, obj) {
        var context = this;
        var defaultHtml = $(this.objDefault).html();
        var html = $(this.obj).html();
        var fieldValue = $(this.field).val();
        if (fieldValue) {
            var completeText = "<h4>" + defaultHtml + "</h4><b>[" + fieldValue + "]</b><br><br>" + html;
            //            var completeText = "<h4>" + fieldValue + "</h4>" + html;
            $.alert({
                title: title,
                content: completeText,
            });
        }
        else {
            var completeText = "<h4>" + defaultHtml + "</h4>Please choose a value for more help";
            $.alert({
                title: title,
                content: completeText,
            });
        }
    }
}

class ShowFieldHelp {
    show(title, field, obj) {
        var context = this;
        var fieldTitle = $(this.field).attr("title");
        var html = $(this.obj).html();
        var completeText = "<h4>" + fieldTitle + "</h4>" + html;
        $.alert({
            title: title,
            content: completeText,
        });
    }
}

class NoSelectedRecordEdit {
    alert() {
        $.alert({
            title: 'No Record Selected',
            content: 'Please select a record to edit',
        });
    }
}

class NoSelectedRecordDelete {
    alert() {
        $.alert({
            title: 'No Record Selected',
            content: 'Please select a record to delete',
        });
    }
}

class DeleteRecordConfirm {
    confirm(confirmFunc) {
        var context = this;
        $.confirm({
            title: 'Delete Record',
            content: 'Continue delete selected record?',
            buttons: {
                confirm: confirmFunc,
                cancel: function () {
                    //                   $.alert('Canceled!');
                }
            }
        });
    }
}

class ShowConfirmAny {
    confirm(title, content, confirmFunc) {
        var context = this;
        $.confirm({
            title: title,
            content: content,
            boxWidth: '500px',
            useBootstrap: false,
            buttons: {
                confirm: confirmFunc,
                cancel: function () {
                    //                   $.alert('Canceled!');
                }
            }
        });
    }
}

class ShowUploadAttachment {
    show(title, moduleName, recordId, uploadType, successCallback) {
        var context = this;
        var content = `<input type="file" name="popupUploader"/>`;

        var successUpload = function () {
            console.log("testing confirm only");

            var data = new FormData();
            var file = $('input[name="popupUploader"]').prop('files')[0];
            console.log("Received File");
            console.log(file);
            data.append("file", file);
            ajaxCaller.uploadFile(successCallback, moduleName, recordId, uploadType, data);
        }

        $.confirm({
            title: title,
            content: content,
            boxWidth: '500px',
            useBootstrap: false,
            buttons: {
                confirm: successUpload,
                cancel: function () {
                    //                   $.alert('Canceled!');
                }
            }
        });
    }
}

$(function () {
    alertConfirmActiveModal = null;

    showModalAny = new ShowModalAny();
    showModalAny500 = new ShowModalAny500();
    showModalAny1200 = new ShowModalAny1200();
    showModalAny1200NoButtons = new ShowModalAny1200NoButtons();
    showModuleHelp = new ShowModuleHelp();
    showAutoCompleteFieldHelp = new ShowAutoCompleteFieldHelp();
    showFieldHelp = new ShowFieldHelp();
    noSelectedRecordEdit = new NoSelectedRecordEdit();
    noSelectedRecordDelete = new NoSelectedRecordDelete();
    deleteRecordConfirm = new DeleteRecordConfirm();
    showConfirmAny = new ShowConfirmAny();
    showUploadAttachment = new ShowUploadAttachment();
});

