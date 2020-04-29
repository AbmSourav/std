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
    // const [catKey] = cat
    // const data = Data.get(catKey)

    // const li = document.createElement("li")
    // const catAnchor = `<a class="cat-item" href="#" data-catkey='${catKey}'>${data.catName}</a>`
    // const catEdit = `<a class="cat-edit" href="#" data-catkey='${catKey}'><img src="./app/assets/icons/edit.svg"></a>`
    // const catDelete = `<a class="cat-delete" href="#" data-catkey='${catKey}'><img src="./app/assets/icons/close.svg"></a>`

    // li.innerHTML = catAnchor + catEdit + catDelete
    // categories.prepend(li)
    
})

// show all Categories
const catList = () => {
    const data = Data.get()

    let list = ``
    for ( let key of Object.keys(data).sort() ) {
        if (data[key].catKey) {
            const catAnchor = `<a class="cat-item" href="#" data-catkey='${key}'>${data[key].catName}</a>`
            const catEdit = `<a class="cat-edit" href="#" data-catkey='${key}'><img src="./app/assets/icons/edit.svg"></a>`
            const catDelete = `<a class="cat-delete" href="#" data-catkey='${key}'><img src="./app/assets/icons/close.svg"></a>`
            list += `<li>${catAnchor} ${catEdit} ${catDelete}</li>`
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

const brandDetail = `<div class="brand-detail">Developerd by <span>Keramot UL Islam</spna></span>`
const brandName = `<h2>STD</h2>`
brand.innerHTML = brandName + brandDetail
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

addList.addEventListener('click', (e) => {
    e.preventDefault()

    if (addListinputWrap.style.display == 'none') {
        addListinputWrap.setAttribute('style', 'display: block')
        addListInput.focus()
    } else {
        addListinputWrap.setAttribute('style', 'display: none')
    }

    // submit a list to database
    getListform.addEventListener('submit', (e) => {
        e.preventDefault()
        const category = addList.dataset.category
        const listValue = getListInput.value
        const key = listValue.split(' ').join('');
        const listId = key.toLowerCase() + '_' + Math.random().toString(36).slice(2)

        if (listValue) {
            Data.set(listId, { listKey: listId, listName: listValue, catId: category })
        
            getListInput.value = ''
            addListinputWrap.setAttribute('style', 'display: none')

            for (let i = 0; i < categoryItem.length; i++) {
                if (categoryItem[i].dataset.catkey == category) categoryItem[i].click()
            }
        }

    })
})


// update list
const listUpdate = () => {
    const listEditIcon = document.querySelectorAll('.list-edit')
    
    if (listEditIcon) {
        listEditIcon.forEach( (value, key) => {
            listEditIcon[key].addEventListener('click', (e) => {
                e.preventDefault()

                const hasForm = document.querySelector(".update-listform")
                if (hasForm) {
                    hasForm.remove()
                } else {
                    const parentList = listEditIcon[key].parentNode
                    const updateListForm = document.createElement("form")
                    updateListForm.classList.add("update-listform")

                    const updateListInput = document.createElement("input")
                    updateListInput.classList.add("update-list")
                    updateListForm.appendChild(updateListInput)
                    parentList.parentNode.appendChild(updateListForm)
                    
                    updateListInput.setAttribute('value', parentList.parentNode.firstChild.textContent)
                    updateListInput.focus()

                    const listKey = listEditIcon[key].dataset.listkey
                    updateListForm.addEventListener('submit', (e) => {
                        e.preventDefault()
                        Data.set(listKey, {listKey: listKey, listName: updateListInput.value, catId: parentList.parentNode.dataset.catid})
                        listEditIcon[key].parentNode.firstChild.innerHTML = updateListInput.value
                        updateListForm.remove()
                    })
                }

            })
            
        })
    }
}

// show all lists based on category
const categoryItem = document.querySelectorAll('.cat-item')
categoryItem.forEach( (value, catItemKey) => {
    
    categoryItem[catItemKey].addEventListener('click', (e) => {
        e.preventDefault()
        const catItemText = categoryItem[catItemKey].innerText
        const hasActive = document.querySelector(".active-cat")
        hasActive ? hasActive.classList.remove("active-cat") : ''
        
        ListTitle.innerHTML = catItemText
        categoryItem[catItemKey].classList.add("active-cat")
        addListBtn.setAttribute("data-category", categoryItem[catItemKey].dataset.catkey)
        addListInput.setAttribute("placeholder", 'Add List in ' + catItemText)
        addListWrap.setAttribute('style', 'display: block')
        brand.setAttribute("style", "display: none")

        const data = Data.get()
        const allLists = () => {
            let lists = ``
            for ( let key of Object.keys(data).sort() ) {
                if (data[key].catId == categoryItem[catItemKey].dataset.catkey) {
                    const listAnchor = `<a class="list-item" href="#" data-listkey='${data[key].listKey}'>${data[key].listName}</a>`
                    const listEdit = `<a class="list-edit" href="#" data-listkey='${data[key].listKey}'><img src="./app/assets/icons/edit.svg"></a>`
                    const listDelete = `<a class="list-delete" href="#" data-listkey='${data[key].listKey}'><img src="./app/assets/icons/close.svg"></a>`
                    const listOptions = `<div class="list-option">${listEdit} ${listDelete}</div>`
                    lists += `<li data-catid='${data[key].catId}'>${listAnchor} ${listOptions}</li>`
                }
            }
            return lists
        }
        ul.innerHTML = allLists()

        // list edit and update
        listUpdate()
    })

})


// update category
const catEditIcon = document.querySelectorAll('.cat-edit')
catEditIcon.forEach( function(value, key) {
    catEditIcon[key].addEventListener('click', function(e) {
        e.preventDefault()

        const hasForm = document.querySelector(".update-catform")
        if (hasForm) {
            hasForm.remove()
        } else {
            const parentCat = catEditIcon[key].parentNode
            const updateCatForm = document.createElement("form")
            updateCatForm.classList.add("update-catform")

            const updateCatInput = document.createElement("input")
            updateCatInput.classList.add("update-cat")
            updateCatForm.appendChild(updateCatInput)
            parentCat.appendChild(updateCatForm)
            
            updateCatInput.setAttribute('value', parentCat.firstChild.textContent)
            updateCatInput.focus()

            const catKey = catEditIcon[key].dataset.catkey
            updateCatForm.addEventListener('submit', function(e) {
                e.preventDefault()
                Data.set(catKey, {catKey: catKey, catName: updateCatInput.value})
                catEditIcon[key].parentNode.firstChild.innerHTML = updateCatInput.value
                updateCatForm.remove()
                parentCat.firstChild.click()
                ListTitle.innerHTML = updateCatInput.value
            })
        }

    })
    
})

// delete category
const catDeleteIcon = document.querySelectorAll('.cat-delete')
catDeleteIcon.forEach( (value, key) => {
    catDeleteIcon[key].addEventListener('click', (e) => {
        e.preventDefault()

        Data.delete(catDeleteIcon[key].dataset.catkey)
        const parentCat = catDeleteIcon[key].parentNode
        parentCat.remove()
    })
})
