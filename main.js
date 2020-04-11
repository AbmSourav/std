const {app, BrowserWindow} = require("electron");
const path = require("path");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 700,
        height: 500,
        // icon: '',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
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
}

app.on('ready', createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
