class DynamikoFullScreen {
    fullScreen(obj) {
        var forFullScreen = $(obj).attr("forFullScreen");
        $(forFullScreen).fullScreen(true);
    }
}
