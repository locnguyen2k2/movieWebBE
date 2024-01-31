import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.ENV_DB_HOST,
    user: process.env.ENV_DB_USER,
    database: process.env.ENV_DB_NAME,
});
const connection = pool.promise();

export default connection;