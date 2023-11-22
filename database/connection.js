const mysql = require('mysql2');
//require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    //User MySQL username,
    user: 'root',
    // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'employee_tracker_db'
});

module.exports = db;