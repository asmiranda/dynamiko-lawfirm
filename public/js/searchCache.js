class SearchCache {
    initSearchCache() {
        var allCache = storage.get("allCache");
        if (allCache == "true") {
            return;
        }
        else {
            storage.set("allCache", "true");
            var url = MAIN_URL + '/api/clientcache/all/search';
            var ajaxRequestDTO = new AjaxRequestDTO(url, "");
            var successCallback = function (data) {
                console.log(data);

                $.each(data, function (index, obj) {
                    var uiName = obj.getProp("key");
                    var clientCache = obj.getProp("value");

                    searchCache.setCacheConfig(uiName, clientCache);
                });
            };
            ajaxCaller.ajaxGet(ajaxRequestDTO, successCallback);
        }
    }

    setCacheConfig(uiName, clientCache) {
        storage.set(uiName + "-SearchCache", clientCache);
    }

    getSearchCache(uiName, uri) {
        searchCache.initSearchCache();
        var searchData = "";
        var canCache = storage.get(uiName + "-SearchCache");
        if (canCache == "true") {
            searchData = storage.get(uri);
        }
        return searchData;
    }

    setNewSearchCache(uiName, uri, searchData) {
        searchCache.initSearchCache();
        var canCache = storage.get(uiName + "-SearchCache");
        if (canCache == "true") {
            storage.set(uri, searchData);
        }
    }
}

$(function () {
    searchCache = new SearchCache();
})