const epltrc = require("./EPLTRC")
const demo = require("./DEMO")

class ImportExcel {
    importExcel(uploadType, request, workbook, callback) {
        if (uploadType == 'DEMO') {
            demo.importExcel(request, workbook, callback);
        }
        else if (uploadType == 'EPLTRC') {
            epltrc.importExcel(request, workbook, callback);
        }
    }
}

const importExcel = new ImportExcel();
module.exports = importExcel;
