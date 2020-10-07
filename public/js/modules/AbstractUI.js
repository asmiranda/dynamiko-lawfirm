class AbstractUI {
    changeMainId(obj) {
    }

    doMainSearchData(evt) {
    }

    changeModule(evt) {
        console.log("testing");
    }

    loadUI() {
        leftMenu.loadLatestUI();
    }

    init() {
        $("#dynamikoMainSearch").hide();
    }

    loadedCallback(data) {
        console.log("loadedCallback not implemented.")
    }
}
