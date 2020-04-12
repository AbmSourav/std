const electron = require("electron");
const {app, BrowserWindow, Menu} = electron;
const path = require("path");
const mainMenu = require("./menu");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 700,
        height: 500,
        // icon: '',
        webPreferences: {
            preload: path.join(__dirname, '../preload.js')
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html')

    // Open the DevTools.
    win.webContents.openDevTools()

    // reset win to null, when it is closed
    win.on('closed', () => {
        win = null;
    })

    //menu
    const menu = Menu.buildFromTemplate(mainMenu);
    Menu.setApplicationMenu(menu);

    // quite app when main window is closed
    win.on('closed', () => {
        app.quit()
    })
}

module.exports = createWindow;
