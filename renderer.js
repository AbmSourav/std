const electron = require("electron");
const { ipcRenderer } = electron;
const Store = require("electron-store");
const { catList } = require("./src/catList");
const { addTask } = require("./src/addTask");
const { updateCategory } = require("./src/updateCategory");
const { deleteCategory } = require("./src/deleteCategory");
const { createNodes } = require("./src/createNodes");
const { categoryEventHandler } = require("./src/categoryEventHandler");

const Data = new Store({name: 'std'})

// create necessary DOM elements
createNodes()

// reload main window after getting New Category from mainWindow
ipcRenderer.on('NEW_CAT', function(e, cat) {
    electron.remote.getCurrentWindow().reload()
})

// all list/task in a category
catList(Data)

// add list in category
addTask(Data)

// category event hadler
categoryEventHandler(Data)

// update category
updateCategory(Data)

// delete category
deleteCategory(Data)
