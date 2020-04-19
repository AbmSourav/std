const electron = require("electron");
const {ipcRenderer} = electron;
const Store = require("electron-store")

const app = document.getElementById('app')
const Data = new Store({name: 'std'})

app.innerHTML = `<div class="category-wrapper"></div><div class="list-wrapper"></div>`

// category
const categoryWrapper = document.querySelector('.category-wrapper')
categoryWrapper.innerHTML = `<ul class="categories"></ul>`
const categories = document.querySelector('.categories')

// height
app.setAttribute('style', 'height: '+ window.innerHeight + 'px')
categories.setAttribute('style', 'height: '+ window.innerHeight + 'px')
window.addEventListener('resize', function() {
    categories.setAttribute('style', 'height: '+ window.innerHeight + 'px')
    app.setAttribute('style', 'height: '+ window.innerHeight + 'px')
})

// Category
// show all Categories
const catList = () => {
    const data = Data.get()

    let list = ``
    for ( let key of Object.keys(data).sort() ) {
        if (data[key].catKey) {
            list += `<li><a class="cat-item" href="#" data-catkey='${key}'>${data[key].catName}</a></li>`
        }
    }
    return list
}
categories.innerHTML = catList()

// show category from 'Add Category'
ipcRenderer.on('catItem:add', function(e, catItem) {
    const data = Data.get()
    const key = catItem.split(' ').join('')
    const catKey = key.toLowerCase()

    for ( let key of Object.keys(data) ) {
        if (catKey == key && data[key].catKey) {
            const li = document.createElement("li")
            const anchor = document.createElement("a")
            anchor.setAttribute("href", '#')
            anchor.setAttribute("class", 'cat-item')
            anchor.setAttribute("data-catkey", catKey)
            anchor.appendChild(document.createTextNode(catItem))

            li.appendChild(anchor)
            categories.prepend(li)
            electron.remote.getCurrentWindow().reload()
            // console.log(catKey + '|' + key)
        }
    }
})


// create list unorderd list
const listWrapper = document.querySelector('.list-wrapper')
const addUL = document.createElement("ul")
addUL.setAttribute("class", 'lists-wrap')
listWrapper.appendChild(addUL)
const ul = document.querySelector('.lists-wrap')

const ListTitle = document.createElement("h2")
ListTitle.setAttribute("class", 'list-title')
listWrapper.prepend(ListTitle)


// add a list
const addListWrap = document.createElement("div")
addListWrap.setAttribute("class", 'add-list-wrap')
addListWrap.setAttribute("style", 'display: none')
listWrapper.appendChild(addListWrap)

const addListBtn = document.createElement("a")
addListBtn.setAttribute("class", 'add-list-btn')
addListBtn.setAttribute("href", '#')
addListBtn.setAttribute("title", 'Add List');
const addListIcon = document.createElement("img")
addListIcon.setAttribute("src", './app/assets/icons/add.svg')

addListBtn.appendChild(addListIcon)
addListWrap.appendChild(addListBtn)
listWrapper.prepend(addListWrap)

const addListinputWrap = document.createElement("div")
addListinputWrap.setAttribute("class", 'input-wrap')
addListinputWrap.setAttribute("style", 'display: none')

const addList = document.querySelector('.add-list-btn')
const addListForm = document.createElement("form")
addListForm.setAttribute("class", 'add-list-form')
const addListInput = document.createElement("input")
addListInput.setAttribute("class", 'add-list-input')

addListForm.appendChild(addListInput)
addListinputWrap.appendChild(addListForm)
listWrapper.prepend(addListinputWrap)

addList.addEventListener('click', function(e) {
    e.preventDefault()
    if (addListinputWrap.style.display == 'none') {
        addListinputWrap.setAttribute('style', 'display: flex')
        addListInput.setAttribute('autofocus', 'true')
    } else {
        addListinputWrap.setAttribute('style', 'display: none')
    }
})

// show all lists based on category
const categoryItem = document.getElementsByClassName('cat-item')
for (let i = 0; i < categoryItem.length; i++) {
    categoryItem[i].addEventListener('click', function(e) {
        e.preventDefault()
        const catItemText = categoryItem[i].innerText
        
        ListTitle.innerHTML = catItemText
        addListBtn.setAttribute("data-category", this.dataset.catkey)
        addListInput.setAttribute("placeholder", 'Add List in ' + catItemText)
        addListWrap.setAttribute('style', 'display: block')

        const data = Data.get()
        const allLists = () => {
            let lists = ``
            for ( let key of Object.keys(data).sort() ) {
                if (data[key].catId == this.dataset.catkey) {
                    lists += `<li><a class="list-item" href="#" data-listkey='${data[key].listkey}'>${data[key].listValue}</a></li>`
                    // console.log(data[key].listkey + '|' + data[key].listValue)
                }
            }
            return lists
        }
        ul.innerHTML = allLists()
    })
}


// submit a list to database
const getListform = document.querySelector('.add-list-form')
const getListInput = document.querySelector('.add-list-input')

getListform.addEventListener('submit', function(e) {
    e.preventDefault()
    const category = addList.dataset.category
    const list = getListInput.value
    const key = list.split(' ').join('');
    const listKey = key.toLowerCase()

    if (list) {
        Data.set(listKey, { catId: category, listkey: listKey, listValue: list })
        // console.log(list + '|' + listKey)
        const data = Data.get()
        const addNewList = () => {
            let lists = ``
            for ( let key of Object.keys(data) ) {
                if (data[key] == listKey) {
                    lists += `<li><a class="list-item" href="#" data-listkey='${data[key].listkey}'>${data[key].listValue}</a></li>`
                    // console.log(data[key].listkey + '|' + data[key].listValue)
                }
            }
            return lists
        }
        ul.prepend(addNewList())
        getListInput.value = ''
        addListinputWrap.setAttribute('style', 'display: none')

        for (let i = 0; i < categoryItem.length; i++) {
            if (categoryItem[i].dataset.catkey == category) categoryItem[i].click()
        }
    }

})
