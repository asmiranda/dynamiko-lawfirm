class UICache {
    getUIHtml(uiName) {
        var storedHTML = storage.get(uiName + "-HTML");
        return storedHTML;
    }

    setUIHtml(uiName, uiHtml) {
        storage.set(uiName + "-HTML", uiHtml);
    }
}

$(function () {
    uiCache = new UICache();
})