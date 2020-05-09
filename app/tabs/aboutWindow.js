const electron = require("electron");
const {BrowserWindow} = electron;
const url = require("url");
const path = require("path");

let aboutWin;

function createAboutWindow() {
    aboutWin = new BrowserWindow({
        width: 460,
        height: 280,
        title: 'About STD',
        resizable: false,
        frame: false,
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

}

module.exports = createAboutWindow;
