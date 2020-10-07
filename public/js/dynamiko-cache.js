class DynamikoCache {
    setLastRecordId(recordId) {
        lStorage.set(constructMainForm.moduleName+"_RECORDID", recordId);
    }

    getLastRecordId() {
        var recordId = lStorage.get(constructMainForm.moduleName+"_RECORDID");
        return recordId;
    }
}
