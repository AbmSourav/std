const electron = require("electron");
const {app} = electron;
const createAboutWindow = require("./tabs/aboutWindow");
const {createCatWindow} = require("./tabs/catWindow");  

// menu list
const mainMenu = [
    {
        label: 'Options',
        submenu: [
            { role: 'reload'},
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            },
        ]
    },
    {
        label: 'Add Category',
        click() {
            createCatWindow();
        }
    },
    { 
        label: 'About STD',
        click() {
            createAboutWindow();
        }
    }
];

module.exports = mainMenu;
