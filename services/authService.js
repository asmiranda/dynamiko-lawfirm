const jwt = require("jsonwebtoken");
const { QueryTypes } = require('sequelize');
const config = require('config.json');
const { secret } = config;

const dbUtil = require('../utils/dbUtil')
const { mongooseUtil } = require('../utils/mongooseUtil')
const { Person } = require('../beans/Person')
const BusinessException = require('../utils/businessException')

class AuthService {
    async validateToken(request, callback) {
        let token = request.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, secret);
        if (decoded.username) {
            let username = decoded.username;
            let password = decoded.password;
            await mongooseUtil.findSingleRecord(Person, { "email": username, "password": password }, function (err, record) {
                let person = record;
                if (person != null) {
                    const token = jwt.sign({ username: username, password: password }, secret, { expiresIn: '100d' });
                    person.password = null;
                    callback({
                        username: username,
                        token: token,
                        person: person
                    });
                }
                else {
                    throw new Error(`Token not valid.`)
                }
            })
        }
        else {
            throw new Error(`Token not valid.`)
        }
    }

    async getProfile(request, callback) {
        const sequelize = await dbUtil.getConnection();
        console.log("request", request);
        const username = request.username;
        console.log("username", username);
        callback({
            user: "user",
            roles: "roles",
            person: "person"
        })
    }

    async signin(username, password, callback) {
        await mongooseUtil.findSingleRecord(Person, { "email": username, "password": password }, function (err, record) {
            let person = record;
            if (person != null) {
                const token = jwt.sign({ username: username, password: password, firstName: person.firstName, lastName: person.lastName }, secret, { expiresIn: '100d' });
                person.password = null;
                callback({
                    username: username,
                    token: token,
                    person: person
                });
            }
            else {
                callback(new BusinessException(`Username and password not valid.`, 401));
            }
        })
    }
}

const authService = new AuthService();
module.exports = authService;
