class UploadDataFile {
    displayUploadDataViewer() {
        $("#content-main").empty();
        var str = `
        <div style="padding: 10px; height: 100%; min-height: 100%;">
            <div class="box box-primary" style="height: 100%; min-height: 100%;">
                <div class="box-header with-border">
                    <div class="uploadDataFile">
                        Choose Template for Upload
                    </div>
                    <div class="pull-right box-tools">
                    </div>
                </div>
                <div class="box-body" style="height: 100%; min-height: 100%;">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="btn-group">
                                <button type="button" class="btn btn-info btnChoseTemplate">1a. Choose Template</button>
                                <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <span class="caret"></span>
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu templateList" role="menu" aria-labelledby="dropdownMenu">
                                </ul>
                                <span id="chosenTemplate" style="margin-left: 10px;"></span>
                            </div>
                        </div>
                        <div class="col-md-4 text-center">
                            <button type="button" class="btn downloadTemplate" style="margin-left: 5px;">1b. Download Sample</button>
                            <label class="btn btn-primary">
                                2. Choose File for Upload<input type="file" style="display: none;" id="fileDataUpload">
                            </label>
                            <span id="chosenFileForUpload" style="margin-left: 10px;"></span>
                        </div>
                        <div class="col-md-4">
                            <button type="button" class="btn btn-success pull-right btnUploadDataFile" style="margin-left: 5px;">3. Upload File</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 table-wrapper-scroll-y my-custom-scrollbar">
                            <table id="tblCsvDisplayer" width="100%" class="table table-bordered table-striped mb-0">
                                <caption>Tab Delimited File Displayer</caption>    
                                <thead>
                                    <tr id="tblCsvHeader"></tr>
                                </thead>
                                <tbody id="tblCsvBody" style="height: 300px; overflow-y: auto;">
                                </tbody>
                            </table>
                        </div>
                        <style>
                            .my-custom-scrollbar {
                                position: relative;
                                height: 500px;
                                overflow: auto;
                            }
                            .table-wrapper-scroll-y {
                                display: block;
                            }
                        </style>
                    </div>
                </div>
            </div>
        </div>
        `;
        $("#content-main").append(str);
        uploadDataFile.loadAllUploadDataTemplate();
    }

    displayCsvFile(evt) {
        var file = evt.target.files[0];

        var reader = new FileReader();
        // Closure to capture the file information.
        reader.readAsText(file);
        reader.onload = function () {
            var allRecs = reader.result.split("\n");
            var titles = allRecs[0].split("\t");
            $("#tblCsvHeader").empty();
            $(titles).each(function (index, obj) {
                var colHead = `<th scope="col">${obj}</th>`;
                console.log(colHead);
                $("#tblCsvHeader").append(colHead);
            });
            $("#tblCsvBody").empty();
            $(allRecs).each(function (ind, tmp) {
                if (ind > 0) {
                    var records = tmp.split("\t");
                    var rowData = "<tr>";
                    $(records).each(function (index, obj) {
                        var colData = `<td>${obj}</td>`;
                        rowData += colData;
                    });
                    rowData += "</tr>";
                    $("#tblCsvBody").append(rowData);
                }
            });
        };
    }

    uploadDataFile() {
        var successCallback = function (data) {
            console.log(data);
            showModalAny.show('Processed Records', data);
        };

        var formUploadData = new FormData();
        var file = $("#fileDataUpload").prop('files')[0];
        console.log(file);
        formUploadData.append("file", file);

        ajaxCaller.uploadCSV(successCallback, formUploadData);
    }

    downloadTemplate() {
        window.open(MAIN_URL + '/api/utils/getUploadTemplate/' + storage.getCompanyCode() + '/' + storage.chosenReport, '_blank');
    }

    loadAllUploadDataTemplate() {
        console.log("LOAD ALL REPORTS...");

        var url = MAIN_URL + '/api/utils/getAllTemplate/' + storage.getCompanyCode();
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");
        var successCallback = function (data) {
            console.log(data);
            $("#templateList").empty();
            $(data).each(function (index, obj) {
                var code = obj.getProp("name");
                var name = obj.getProp("title");

                var str = `<li class="useTemplate ${code}" value="${code}" label="${name}"><a href="#" style="padding: 3px 20px;"><i class="fa fa-gears"> ${name}</i></a></li>`;
                $(".templateList").append(str);
            });
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
    }

    useChosenTemplate(chosen) {
        storage.chosenReport = $(chosen).attr("value");
        var chosenReportLabel = $(chosen).attr("label");
        $("#chosenTemplate").html("<b>" + chosenReportLabel + "</b>");
    }
}
