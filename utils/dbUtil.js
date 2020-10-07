const { Sequelize, QueryTypes } = require('sequelize');

const opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true,
        createdAt: false,
        updateAt: false,
        initialAutoIncrement: 100000
    }
}
const MOCK_USER = 'MOCK_USER';

class DBUtil {
    sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_USER}@${process.env.DB_HOST}:3306/${process.env.DB_USER}`, opts)

    async getConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        return this.sequelize;
    }

    async saveRecord(table, definition, obj, callback) {
        const sequelize = await dbUtil.getConnection();
        const dbTable = sequelize.define(table, definition, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        });
        dbTable.create(obj);
        if (callback) {
            callback(obj);
        }
    }

    async getRecords(sql, callback) {
        const sequelize = await dbUtil.getConnection();
        let records = await sequelize.query(sql, { type: QueryTypes.SELECT });
        if (callback) {
            callback(records);
        }
    }

    async checkIfElseExists(sql, callbackExist, callbackNotExist) {
        const sequelize = await dbUtil.getConnection();
        let records = await sequelize.query(sql, { type: QueryTypes.SELECT });
        let record = records[0];
        if (record["count(*)"] > 0) {
            callbackExist();
        }
        else {
            callbackNotExist();
        }
    }

    async deleteRecords(sql, callback) {
        const sequelize = await dbUtil.getConnection();
        await sequelize.query(sql, { type: QueryTypes.DELETE });
        if (callback) {
            callback();
        }
    }

    async removeMockData(table, callback) {
        const sequelize = await dbUtil.getConnection();
        const sql = `
            delete from ${table} where id!=0 and createdBy='${MOCK_USER}'
        `
        await sequelize.query(sql, { type: QueryTypes.DELETE });
        if (callback) {
            callback();
        }
    }
}

const dbUtil = new DBUtil();
module.exports = dbUtil;
