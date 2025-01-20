const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipcMainHandlers = require('./backend/ipcMainHandlers');


let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true, // Enable nodeIntegration (Not recommended for production)
            contextIsolation: true,
        },
    });

    mainWindow.loadFile('./renderer/login.html');

    // mainWindow.webContents.openDevTools();

    ipcMainHandlers();
});
