const electron = require("electron");
const {app, BrowserWindow, ipcMain} = electron;
const url = require("url");
const path = require("path");

let aboutWin;

function createAboutWindow() {
    aboutWin = new BrowserWindow({
        width: 450,
        height: 250,
        resizable: false,
        title: 'About STD',
        webPreferences: {
            nodeIntegration: true,
        }
    })

    // and load the index.html of the app.
    aboutWin.loadURL(url.format({
        pathname: path.join(__dirname, '../viewMarkup/about.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // aboutWin.webContents.openDevTools()

    // reset aboutWin to null, when it is closed
    aboutWin.on('closed', () => {
        aboutWin = null;
    })

    // remove main menu on subwindow
    aboutWin.setMenu(null);

    ipcMain.on('APP_VERSION', function(e) {
        e.sender.send('APP_VERSION', { version: app.getVersion() } )
    })

}

module.exports = createAboutWindow;
