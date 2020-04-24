const electron = require("electron")
const {ipcRenderer} = electron


const catForm = document.querySelector('#catForm')
catInput = document.querySelector('#catInput')

if ( catInput ) {
    catForm.addEventListener('submit', submitCat, false)

    function submitCat(e) {
        e.preventDefault()
        const catName = catInput.value
        const key = catName.split(' ').join('');
        const catId = key.toLowerCase() + '_' + Math.random().toString(36).slice(2)
        const cat = [catId, catName]

        catName ? ipcRenderer.send('catItem:add', cat) : null
        catInput.value = ''
        const catWin = electron.remote.getCurrentWindow()
        catWin.close()
    }
}
