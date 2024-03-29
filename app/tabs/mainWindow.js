const electron = require("electron");
const {app, BrowserWindow, Menu, ipcMain} = electron;
const path = require("path");
const url = require("url");
const mainMenu = require("../menu");
const Store = require("electron-store");


let win;

function createWindow() {
    win = new BrowserWindow({
        width: 850,
        height: 500,
        title: 'STD',
        webPreferences: {
            nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
        }
    })

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../../index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // win.webContents.openDevTools()

    // reset win to null, when it is closed
    win.on('closed', () => {
        win = null;
    })

    //menu
    if (process.platform == 'darwin') {
        mainMenu.unshift({});
    }
    const menu = Menu.buildFromTemplate(mainMenu);
    Menu.setApplicationMenu(menu);

    // quite app when main window is closed
    win.on('closed', () => {
        app.quit()
    })

   ipcMain.on('NEW_CAT', function(e, cat) {
        const [catKey, catItem] = cat

        const abmSourav = new Store({name: 'std'})
        abmSourav.set( catKey, { catKey: catKey, catName: catItem } )
        win.webContents.send('NEW_CAT', cat);
    })

    // app version for about window
    ipcMain.on('APP_VERSION', function(e) {
        e.sender.send('APP_VERSION', { version: app.getVersion() } )
    })

}

exports.createWindow = createWindow;
