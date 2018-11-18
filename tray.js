const electron = require('electron');
const platform = require('os').platform();
const path = require('path');

const {
    Tray,
    Menu
} = electron;

const APP_TITLE = 'YouTube TV';
const ICON_WINDOWS = 'favicon.ico';
const ICON_OSX = 'favicon.png';

let mainWindow;
let tray;

const SysTray = function sysTray() {};

SysTray.prototype.init = function init(_mainWindow) {
    tray = null;
    mainWindow = _mainWindow;
    setupTray();
};

function setupTray() {
    tray = new Tray(getIconFilepathForPlatform());
    tray.setToolTip(APP_TITLE);

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Show app',
        click() {
            mainWindow.setOpacity(1);
            mainWindow.setSkipTaskbar(false);
        }
    }, {
        label: 'Hide app',
        click() {
            mainWindow.setOpacity(0);
            mainWindow.setSkipTaskbar(true);
        }
    }, {
        label: 'Exit',
        click() {
            mainWindow.destroy();
        }
    }]);

    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        if (mainWindow.getOpacity() === 0) {
            mainWindow.setOpacity(1);
            mainWindow.setSkipTaskbar(false);
        } else {
            mainWindow.setOpacity(0);
            mainWindow.setSkipTaskbar(true);
        }
    });
}

function getIconFilepathForPlatform() {
    let filePath;

    if (platform === 'darwin' || platform === 'linux') {
        filePath = path.join(__dirname, ICON_OSX);
    } else if (platform === 'win32') {
        filePath = path.join(__dirname, ICON_WINDOWS);
    }

    return filePath;
}

module.exports = new SysTray();
