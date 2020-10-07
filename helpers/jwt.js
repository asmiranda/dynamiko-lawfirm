const expressJwt = require('express-jwt');
const config = require('config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            { url: '/api-docs' },
            { url: '/api/auth/signin' },
            { url: '/api/auth/validateToken' },
            { url: '/api/pgeneric' },
            { url: '/api/pgeneric/importExcel' },
            { url: /^\/api\/pgeneric\/*/ },
        ]
    });
}

