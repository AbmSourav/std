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
// show category from 'Add Category'
ipcRenderer.on('catItem:add', function(e, cat) {
    electron.remote.getCurrentWindow().reload()
    const [catKey] = cat
    const data = Data.get(catKey)

    const li = document.createElement("li")
    const anchor = document.createElement("a")
    anchor.setAttribute("href", '#')
    anchor.setAttribute("class", 'cat-item')
    anchor.setAttribute("data-catkey", data.catKey)
    anchor.appendChild(document.createTextNode(data.catName))

    li.appendChild(anchor)
    categories.prepend(li)
    
})

// show all Categories
const catList = () => {
    const data = Data.get()

    let list = ``
    for ( let key of Object.keys(data).sort() ) {
        if (data[key].catKey) {
            list += `<li><a class="cat-item" href="#" data-catkey='${key}'>${data[key].catName}</a><a class="cat-edit" href="#" data-catkey='${key}'><img src="./app/assets/icons/edit.svg"></a></li>`
        }
    }
    return list
}
categories.innerHTML = catList()


// create list unorderd list
const listWrapper = document.querySelector('.list-wrapper')

const brand = document.createElement("div")
brand.setAttribute("class", 'brand')
brand.setAttribute("style", 'display: block')

const brandTitle = document.createElement("h2")
brandTitle.appendChild(document.createTextNode("STD"))

const brandDetail = document.createElement("span")
const brandDetailText = 'Developerd by ' + ' Keramot UL Islam'
brandDetail.textContent = brandDetailText
brand.appendChild(brandTitle)
brand.appendChild(brandDetail)
listWrapper.appendChild(brand)


const addUL = document.createElement("ul")
addUL.setAttribute("class", "lists-wrap")
listWrapper.appendChild(addUL)
const ul = document.querySelector(".lists-wrap")

const ListTitle = document.createElement("h2")
ListTitle.setAttribute("class", "list-title")
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

const getListform = document.querySelector('.add-list-form')
const getListInput = document.querySelector('.add-list-input')

addList.addEventListener('click', function(e) {
    e.preventDefault()

    if (addListinputWrap.style.display == 'none') {
        addListinputWrap.setAttribute('style', 'display: block')
        addListInput.focus()
    } else {
        addListinputWrap.setAttribute('style', 'display: none')
    }

    // submit a list to database
    getListform.addEventListener('submit', function(e) {
        e.preventDefault()
        const category = addList.dataset.category
        const listValue = getListInput.value
        const key = listValue.split(' ').join('');
        const listId = Math.random().toString(36).slice(2) + '_' + key.toLowerCase()

        if (listValue) {
            Data.set(listId, { listKey: listId, listName: listValue, listUpdatedName: '', catId: category })
        
            getListInput.value = ''
            addListinputWrap.setAttribute('style', 'display: none')

            for (let i = 0; i < categoryItem.length; i++) {
                if (categoryItem[i].dataset.catkey == category) categoryItem[i].click()
            }
        }

    })
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
        brand.setAttribute("style", "display: none")

        const data = Data.get()
        const allLists = () => {
            let lists = ``
            for ( let key of Object.keys(data).sort() ) {
                if (data[key].catId == this.dataset.catkey) {
                    lists += `<li><a class="list-item" href="#" data-listkey='${data[key].listKey}'>${data[key].listName}</a></li>`
                }
            }
            return lists
        }
        ul.innerHTML = allLists()
    })
}


// // update category
const catEditIcon = document.querySelectorAll('.cat-edit')
catEditIcon.forEach( function(value, key) {
    catEditIcon[key].addEventListener('click', function(e) {
        e.preventDefault()

        hasInput = document.querySelector(".update-cat")
        hasInput ? hasInput.remove() : ''
        const parentCat = catEditIcon[key].parentNode
        const updateListInput = document.createElement("input")
        updateListInput.classList.add("update-cat")
        parentCat.appendChild(updateListInput)
        
        updateListInput.setAttribute('value', parentCat.firstChild.textContent)
        updateListInput.focus()

        // if (getListform.classList.contains('update-category')) {
        //     getListform.addEventListener('submit', function(e) {
        //         e.preventDefault()
        //         console.log('Hello' + addListInput.value)
        //     })
        // }
    })
    
})
