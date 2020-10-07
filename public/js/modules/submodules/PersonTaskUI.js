class PersonTaskUI {
    showAddTask(obj) {
        $(`input[name="PersonTaskUI_TaskId"]`).val("");
        $(`input[name="PersonTaskUI_TaskName"]`).val("");
        $(`input[name="PersonTaskUI_TaskDate"]`).val("");
    }

    showUpdateTask(obj) {
        var recordId = $(obj).attr("recordId");
        var taskName = $(`.PersonTaskUI_Task[recordId="${recordId}"][name="taskName"]`).html();
        var taskDate = $(`.PersonTaskUI_Task[recordId="${recordId}"][name="taskDate"]`).attr("value");
        $(`input[name="PersonTaskUI_TaskId"]`).val(recordId);
        $(`input[name="PersonTaskUI_TaskName"]`).val(taskName);
        $(`input[name="PersonTaskUI_TaskDate"]`).val(taskDate);
    }

    deleteTask(obj) {
        var taskId = $(obj).attr("recordId");

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PersonTaskUI/deleteTask/${taskId}`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, "");

        var successFunction = function (data) {
            console.log(data);
            personTaskUI.arrangeTodoList(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    saveTask(obj, nextAction) {
        var taskId = $(`input[name="PersonTaskUI_TaskId"]`).val();
        var taskName = $(`input[name="PersonTaskUI_TaskName"]`).val();
        var taskDate = $(`input[name="PersonTaskUI_TaskDate"]`).val();

        var tmp = {};
        tmp["taskId"] = taskId;
        tmp["name"] = taskName;
        tmp["taskDate"] = taskDate;

        var vdata = JSON.stringify(tmp);

        var url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PersonTaskUI/post/saveTask`;
        var ajaxRequestDTO = new AjaxRequestDTO(url, vdata);

        var successFunction = function (data) {
            console.log(data);
            PersonTaskUI.arrangeTodoList(data);
            if (nextAction == "CLOSE") {
                $('#PersonTaskUI_TaskDialog').modal('toggle');
            }
            else {
                $(`input[name="PersonTaskUI_TaskName"]`).val("");
                $(`input[name="PersonTaskUI_TaskDate"]`).val("")
            }
        };
        ajaxCaller.ajaxPost(ajaxRequestDTO, successFunction);
    }

    loadTodoList() {
        console.log("loadTodoList");

        var ajaxRequestDTO = new AjaxRequestDTO();
        ajaxRequestDTO.url = `${MAIN_URL}/api/generic/${storage.getCompanyCode()}/widget/PersonTaskUI/loadTodoList`;
        ajaxRequestDTO.data = "";

        var successFunction = function (data) {
            console.log(data);
            personTaskUI.arrangeTodoList(data);
        };
        ajaxCaller.ajaxGet(ajaxRequestDTO, successFunction);
    }

    arrangeTodoList(data) {
        $(".divToDoList").empty();
        $(data).each(function (index, obj) {
            var personTaskId = obj.getProp("personTaskId");
            var taskDate = obj.getProp("taskDate");
            var taskName = obj.getProp("name");

            var strHtml = `
                <li>
                    <span class="text PersonTaskUI_Task" recordId="${personTaskId}" name="taskName">${taskName}</span>
                    <small class="label label-info PersonTaskUI_Task" recordId="${personTaskId}" name="taskDate" value="${taskDate}"><i class="fa fa-clock-o"></i> ${taskDate}</small>
                    <div class="tools">
                        <i class="fa fa-edit PersonTaskUI_btnShowUpdateTask" recordId="${personTaskId}" module="PersonTaskUI" data-toggle="modal" data-target="#PersonTaskUI_TaskDialog"></i>
                        <i class="fa fa-trash-o PersonTaskUI_btnDeleteTask" recordId="${personTaskId}" module="PersonTaskUI"></i>
                    </div>
                </li>
            `;
            $(".divToDoList").append(strHtml);
        })
        var strModal = `
            <div class="modal fade" id="PersonTaskUI_TaskDialog" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h3 class="modal-title">Task</h3>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" class="form-control displayEdit" name="PersonTaskUI_TaskId" module="PersonTaskUI" mainmodule="PersonTaskUI">
                            <div class="form-group">
                                <label class="control-label">Task</label>
                                <input type="text" class="form-control displayEdit" name="PersonTaskUI_TaskName" placeholder="Title" module="PersonTaskUI" mainmodule="PersonTaskUI">
                            </div>
                            <div class="form-group">
                                <label class="control-label">Task Date</label>
                                <div class="input-group date">
                                    <input type="text" name="PersonTaskUI_TaskDate" placeholder="Task Date" class="form-control calendar displayEdit" module="PersonTaskUI" mainmodule="HrRequisition">
                                    <div class="input-group-addon displayEdit">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary PersonTaskUI_btnAddTaskClose">Save And Close</button>
                            <button type="button" class="btn btn-primary PersonTaskUI_btnAddTaskNew">Save And New</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $(".divToDoList").append(strModal);
    }
}