const mysql = require('mysql2');
const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const ini = require('ini');

// Get user data directory
const userDataDir = app.getPath('userData');  // This will return the AppData path

//in build mode
// const configPath = path.join(userDataDir, 'db_config.ini');

//in dev mode
const configPath = path.join(__dirname, '../db_config.ini');

const config = ini.parse(fs.readFileSync(configPath, 'utf-8'));


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
