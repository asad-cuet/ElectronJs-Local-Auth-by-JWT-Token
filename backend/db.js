const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const ini = require('ini');

const config = ini.parse(fs.readFileSync(path.join(__dirname, '../db_config.ini'), 'utf-8'));

const mysqlHost = config.Database.host;
const mysqlUser = config.Database.username;
const mysqlPassword = config.Database.password;
const mysqlDbName = config.Database.dbname;  // New addition for the database name

const db = mysql.createPool({
    host: mysqlHost,  //localhost
    user: mysqlUser,   //root
    password: mysqlPassword,  //''
    database: mysqlDbName,  //electron_local_auth
});

module.exports = db.promise();
