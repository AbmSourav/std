const electron = require("electron")
const {ipcRenderer} = electron


const catForm = document.querySelector('#catForm')
catInput = document.querySelector('#catInput')

if ( catInput ) {
    catForm.addEventListener('submit', submitCat, false)

    function submitCat(e) {
        e.preventDefault()
        const catItem = catInput.value
        catItem ? ipcRenderer.send('catItem:add', catItem) : null
    }
}
