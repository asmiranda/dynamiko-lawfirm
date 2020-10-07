class HrNewsWidget {
    constructor() {
        var context = this;
        console.log("HrNewsWidget");

        $(document).on('click', '.showHrNews', function () {
            context.showHrNews(this);
        });
        this.loadTask();
    }

    loadTask() {
        var context = this;
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/pwidget/HrNewsWidget/all';
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $("HrNewsWidgetList").empty();
            $(data).each(function (index, obj) {
                console.log(obj);
                var docId = obj.getProp("hrDocumentId");
                var icon = obj.getProp("icon");
                var title = obj.getProp("title");
                var shortDescription = obj.getProp("shortDescription");
                var description = obj.getProp("description");

                var str = `
                <strong><i class="${icon} margin-r-5"></i> ${title}
                <a class="cursor-pointer showHrEvent" recId="${docId}" data-toggle="modal" data-target="#modalEvent${docId}">
                    [More]
                </a>
                <p class="text-muted ml-5">
                    ${shortDescription}
                </p>

                <div class="modal fade" id="modalEvent${docId}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">${title}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body mx-3">
                            ${description}
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                        <button class="btn btn-default close" data-dismiss="modal" aria-label="Close">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
                `;
                $("#HrNewsWidgetList").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    showHrNews(obj) {
        var recId = $(obj).attr("recId");
        var url = MAIN_URL + '/api/generic/' + storage.getCompanyCode() + '/pwidget/HrNewsWidget/showHrNews/' + recId;
        console.log(url);
    }
}
