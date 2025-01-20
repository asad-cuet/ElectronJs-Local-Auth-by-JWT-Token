// backend/ipcMainHandlers.js
const { ipcMain } = require('electron');
const { loginUser, registerUser } = require('./auth');
const {jwtDecode} = require('jwt-decode');

module.exports = () => {
    ipcMain.handle('login', async (event, { email, password }) => {
        const result = await loginUser(email, password);
        if (result) {
            return { success: true, token: result.token };
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

    ipcMain.handle('user', async (event, { token }) => {
        if (token) {
            // Decode the token to get user info
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Current time in seconds
            if (decoded.exp < currentTime) {
                return null;
            } else {
                return decoded;
            }
        } else {
            console.log('No JWT found, user is not logged in');
            return null;
        }
    });
};
