const electron = require("electron");
const {ipcRenderer} = electron;
const Store = require("electron-store")

const app = document.getElementById('app')
const Data = new Store({name: 'std'})

app.innerHTML = `<ul class="categories"></ul>`
const categories = document.querySelector('.categories')

const catList = () => {
    const data = Data.get()
        let list = ``
        for ( let key of Object.keys(data) ) {
            list += `<li data-listkey='${key}'>${data[key].catName}</li>`
            // console.log(item)
        }
        return list
}
categories.innerHTML = catList()

ipcRenderer.on('catItem:add', function(e, catItem) {
    const data = Data.get()
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(catItem));
    li.setAttribute("data-listkey", catItem);
    categories.appendChild(li);
    // console.log(catItem)
})
// console.log(data)