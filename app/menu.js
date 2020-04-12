const electron = require("electron");
const {app} = electron;
const createSubWindow = require("./subWindow");

// menu list
mainMenu = [
    {
        label: 'Options',
        submenu: [
            {label: 'Add Category'},
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            },
        ]
    },
    { label: 'Reload'},
    { 
        label: 'About',
        click() {
            createSubWindow();
        }
    }
];

module.exports = mainMenu;
