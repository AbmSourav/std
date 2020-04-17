const electron = require("electron")
const {ipcRenderer} = electron


const catForm = document.querySelector('#catForm')
catInput = document.getElementById('catInput')

if ( catInput ) {
    catForm.addEventListener('submit', submitCat, false)

    function submitCat(e) {
        e.preventDefault()
        const catItem = catInput.value
        ipcRenderer.send('catItem:add', catItem)
    }
}
