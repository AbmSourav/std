const electron = require("electron");
const {BrowserWindow} = electron;
const url = require("url");
const path = require("path");

let catWin;

function createCatWindow() {
    catWin = new BrowserWindow({
        width: 400,
        height: 200,
        title: 'Add Category',
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
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

    catWin.on('closed', () => {
        catWin = null;
    })
    
}

exports.createCatWindow = createCatWindow;
