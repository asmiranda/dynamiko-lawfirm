const { mongooseUtil } = require('../utils/mongooseUtil')
const excelUtil = require('../utils/excelUtil')
const { Person } = require('../beans/Person')
const { Case } = require('../beans/Case')

class LawFirmDemo {
    async importExcel(request, wb, callback) {
        let uploadFile = request.files.file;
        let fileName = uploadFile.name;

        await this.doCase(wb);
        await this.doRelation(wb);

        callback(`Upload ${fileName} completed`);
    }

}

const lawFirmDemo = new LawFirmDemo();
module.exports = lawFirmDemo;
