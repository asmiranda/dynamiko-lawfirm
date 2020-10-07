class AllNotificationUI extends AbstractUI { 
    changeModule(evt) {
        // personTaskUI.loadTodoList();
        notificationUI.loadTopRecords("Notification");
    }
}

$(function () {
    allNotificationUI = new AllNotificationUI();
    registeredModules.push("allNotificationUI");
});

