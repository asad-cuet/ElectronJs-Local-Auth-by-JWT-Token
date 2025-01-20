const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { loginUser, registerUser } = require('./backend/auth');
const {jwtDecode } = require('jwt-decode');

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

    mainWindow.webContents.openDevTools();

});

ipcMain.handle('login', async (event, { email, password }) => {
    const result  = await loginUser(email, password);
    if (result) {
        return { success: true, token:result.token};
    } else {
        return { success: false, message: 'Invalid email or password' };
    }
});

ipcMain.handle('register', async (event, { email, password }) => {
    try {
        await registerUser(email, password);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
});

ipcMain.handle('user', async (event,{token}) => {
    if (token) {
            // Decode the token to get user info
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Current time in seconds
            if (decoded.exp < currentTime) {
                localStorage.removeItem('jwt');
                return null;
            }
            else
            {
                return decoded;
            }
    } else {
        console.log('No JWT found, user is not logged in');
        return null;

    }
});
