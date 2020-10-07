class ExcelUtil {
    getCellValue(sheet, row, header) {
        let columnOffset = 1;
        let headerRow = sheet.getRow(1);
        headerRow.eachCell({ includeEmpty: false }, function (cell, colNumber) {
            console.log('Cell ' + colNumber + ' = ' + cell.value);
            if (cell.value == header) {
                columnOffset = colNumber;
            }
        });
        if (columnOffset == 0) {
            return "";
        }
        else {
            let value = row.getCell(columnOffset).value;
            if (value == null) {
                return "";
            }
            else if (typeof value == 'number' || typeof value == 'string') {
                return value;
            }
            else if (typeof value == 'object') {
                if (typeof value.getDate != 'undefined') {
                    return value.toLocaleString();
                }
                else {
                    return value.text;
                }
            }
            else {
                return value.text;
            }
        }
    }
}

const excelUtil = new ExcelUtil();
module.exports = excelUtil;
