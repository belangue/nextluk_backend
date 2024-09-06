const mysql = require('mysql');

var connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PWD,
    database: process.env.DB_NAME,
})

module.exports = connection;