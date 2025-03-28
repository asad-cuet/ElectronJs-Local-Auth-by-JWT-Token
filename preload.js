const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('authAPI', {
    notify: async (title,body) => ipcRenderer.invoke('notify', { title,body }),
    user: async (token) => ipcRenderer.invoke('user', { token }),
    login: async (email, password) => ipcRenderer.invoke('login', { email, password }),
    register: async (email, password) => ipcRenderer.invoke('register', { email, password }),
});
