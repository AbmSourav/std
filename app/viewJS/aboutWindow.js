const electron = require("electron")
const {ipcRenderer} = electron
const os = require('os')

closeIcon = document.querySelector(".about-window-close")
closeIcon.addEventListener('click', (e) => {
    e.preventDefault()

    electron.remote.getCurrentWindow().close()
})

const version = document.querySelector('#version')
const userGreetings = document.querySelector('.user-greetings')
userGreetings.appendChild(document.createTextNode( 'Hello, ' + os.userInfo().username.toUpperCase() + ' 😊' ))

ipcRenderer.send('APP_VERSION')
ipcRenderer.on('APP_VERSION', function(e, arg) {
    version.appendChild(document.createTextNode( arg.version ))
})
