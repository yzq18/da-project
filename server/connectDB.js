const mysql = require('mysql2');

require('dotenv').config();
// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// Promise wrapper for the pool to make it easier to use with async/await
const promisePool = pool.promise();

module.exports = promisePool;