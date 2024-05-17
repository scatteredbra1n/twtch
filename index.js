const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const fs = require('fs');


const url = "https://twitch.tv";

// Function to create a new browser window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 11 },
    titleBarOverlay: true,
    icon: path.join(__dirname, 'Twtch.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    },
  });

  // Load twitch.tv
  win.loadURL(url);

  process.env.isDev  && win.webContents.openDevTools();

  // Inject CSS after the content has loaded
  win.webContents.on('did-finish-load', () => {
        // Read the external JavaScript file
        fs.readFile(path.join(__dirname, 'overrides.css'), 'utf-8', (err, data) => {
            if (err) {
              console.error('Failed to read custom.css:', err);
              return;
            }
      
            // Inject the JavaScript code
            win.webContents.insertCSS(data).then(result => {
              console.log('Custom JavaScript executed successfully.');
            }).catch(err => {
              console.error('Failed to execute custom CSS:', err);
            });
          });

    // Read the external JavaScript file
    fs.readFile(path.join(__dirname, 'overrides.js'), 'utf-8', (err, data) => {
        if (err) {
          console.error('Failed to read custom.js:', err);
          return;
        }
  
        // Inject the JavaScript code
        win.webContents.executeJavaScript(data).then(result => {
          console.log('Custom JavaScript executed successfully.');
        }).catch(err => {
          console.error('Failed to execute custom JavaScript:', err);
        });
      });
  });
  ipcMain.on('minimize-window', () => {
    if (win) {
      win.minimize();
    }
  });
  
  ipcMain.on('toggle-maximize-window', () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  });
  
  ipcMain.on('close-window', () => {
    if (win) {
      win.close();
    }
  });
  ipcMain.on('show-notification', (event, { title, body }) => {
    new Notification({ title, body }).show();
  });
  
  ipcMain.handle('get-os', () => {
    return process.platform;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});