const path = require('path');
const electron = require('electron');
const tray = require('./tray');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'YouTube TV',
        minWidth: 800,
        width: 800,
        minHeight: 600,
        height: 600,
        icon: path.join(__dirname, '/favicon.ico'),
        show: false,
        backgroundThrottling: true,
        titleBarStyle: 'hiddenInset',
        frame: false
    });

    mainWindow.on('enter-full-screen', () => {
        mainWindow.webContents.send('enter-full-screen');
    });

    mainWindow.on('leave-full-screen', () => {
        mainWindow.webContents.send('leave-full-screen');
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.show();
    tray.init(mainWindow);

    mainWindow.loadURL(path.join(__dirname, 'index.html'));
});

ipcMain.on('minimize-main-window', () => {
    if (mainWindow.getOpacity() === 0) {
        mainWindow.setOpacity(1);
        mainWindow.setSkipTaskbar(false);
    } else {
        mainWindow.setOpacity(0);
        mainWindow.setSkipTaskbar(true);
    }
});

ipcMain.on('maximize-main-window', () => {
    if (mainWindow instanceof BrowserWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    }
});

ipcMain.on('close-main-window', () => {
    mainWindow.destroy();
});
