const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const menuItems=[
  {
    label:"Menu",
    submenu:[
      {
        label:"About"
      }
    ]
  },
  {
    label:"File",
    submenu:[
      {
        label:"Learn More",
        click: async ()=> {
          await shell.openExternal('https://www.w3schools.com')
        }
      },
      {
        type:"separator"
      },
      {
        label:"Exit",
        click: ()=> {app.quit()}
      },
      {
        role:'close'
      }
    ]
  },
  {
    label:'Window',
    submenu:[
      {
        label:"Web View Window",
        click: async ()=> {
          const win2=new BrowserWindow({
            height: 300,
            width: 400,
            show: false,
          });

          win2.loadURL('https://www.w3schools.com');
          win2.once("ready-to-show",()=>win2.show());
        }
      },
      {
        label:"Open Camera",
        click: async ()=> {
          const win3=new BrowserWindow({
            height: 300,
            width: 400,
            show: false,
          });

          win3.webContents.openDevTools();
          win3.loadFile(path.join(__dirname, 'camera.html'));
          win3.once("ready-to-show",()=>win3.show());
        }
      },
      {
        role:'minimize'
      },
      {
        role:'close'
      }
    ],
  }
];

const menu=Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
