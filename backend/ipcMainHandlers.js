// backend/ipcMainHandlers.js
const { ipcMain } = require('electron');
const { loginUser, registerUser } = require('./auth');
const {jwtDecode} = require('jwt-decode');
const { Notification } = require('electron');


let store;

async function importStore()
{
    const StoreModule = await import('electron-store');
    const Store = StoreModule.default || StoreModule; // handles both ESM and fallback cases
    store = new Store();
}

importStore();

module.exports = () => {
    ipcMain.handle('login', async (event, { email, password }) => {
        const result = await loginUser(email, password);
      
        if (result && result.user) {
          // Store user data securely
          store.set('user', {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            token: result.token || null
          });
      
          return { success: true, user: result.user};
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

    ipcMain.handle('logout', () => {
        store.delete('user');
        return { success: true };
    });

    ipcMain.handle('user', async (event) => {
        return store.get('user');
    });

    ipcMain.handle('notify', async (event, { title,body }) => {
        let notification = new Notification({
            title: title,
            body: body,
          });
          
          notification.show();
    });
};
