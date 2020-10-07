const mongoose = require('mongoose');
// const conn = mongoose.createConnection('mongodb://dynamikosoft.com/school', { useNewUrlParser: true });

class MongooseUtil {
    conn;

    getConn() {
        if (!this.conn) {
            this.conn = mongoose.createConnection('mongodb://dynamiko:dynamiko@dynamikosoft.com:27702/dynamiko', { useNewUrlParser: true });
        }
        return this.conn;
    }

    async findRecords(model, filter, sort, callback) {
        await model.find(filter, function (err, record) {
            if (err) {
                console.log(err);
            }
            callback(err, record)
        }).sort(sort);
    }

    async findSingleRecord(model, filter, callback) {
        await model.findOne(filter, function (err, record) {
            if (err) {
                console.log(err);
            }
            callback(err, record)
        });
    }

    async saveRecord(model, filter, data, callback) {
        await model.findOneAndUpdate(filter, data, {
            useFindAndModify: false,
            new: true,
            upsert: true
        }, function (err, doc, res) {
            callback(err, doc, res);
        });
    }

    async getRecords(sql, callback) {
    }

    async checkIfElseExists(model, callbackExist, callbackNotExist) {
    }

    async deleteRecords(sql, callback) {
    }

    async removeMockData(table, callback) {
    }
}

const mongooseUtil = new MongooseUtil();
module.exports = { mongooseUtil }
