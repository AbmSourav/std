const electron = require("electron");
const {BrowserWindow, ipcMain} = electron;
const url = require("url");
const path = require("path");

let catWin;

function createCatWindow() {
    catWin = new BrowserWindow({
        width: 400,
        height: 200,
        title: 'Add Category',
        webPreferences: {
            nodeIntegration: true,
        }
    })

    // and load the index.html of the app.
    catWin.loadURL(url.format({
        pathname: path.join(__dirname, '../viewMarkup/cat.html'),
        protocol: 'file:',
        slashes: true
    }))

    // remove main menu on catWindow
    catWin.setMenu(null);

    // catWin.webContents.openDevTools()

    ipcMain.on('catItem:add', function(e, catItem) {
        catWin.close();
    })

    // reset catWin to null, when it is closed
    catWin.on('closed', () => {
        catWin = null;
    })

}

exports.createCatWindow = createCatWindow;