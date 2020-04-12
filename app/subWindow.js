const electron = require("electron");
const {BrowserWindow} = electron;
const url = require("url");
const path = require("path");

let subWin;

function createSubWindow() {
    subWin = new BrowserWindow({
        width: 400,
        height: 250,
        title: 'About STD'
    })

    // and load the index.html of the app.
    subWin.loadURL(url.format({
        pathname: path.join(__dirname, 'view/about.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // subWin.webContents.openDevTools()

    // reset subWin to null, when it is closed
    subWin.on('closed', () => {
        subWin = null;
    })

    // remove main menu on subwindow
    subWin.setMenu(null);

}

module.exports = createSubWindow;
