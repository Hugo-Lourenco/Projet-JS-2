const { app, BrowserWindow } = require('electron');
const path = require('path');
const db = require('./database.js');

function createWindow () {
  // Create the window
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false 
    }
  });

  
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// quit when all the windows are shut
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});