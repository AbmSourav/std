const electron = require("electron");
const {ipcRenderer} = electron;
const Store = require("electron-store")

const appNode = document.getElementById('app')
const Data = new Store({name: 'std'})

// category & list wrapper
appNode.innerHTML = `<div class="category-wrapper"></div><div class="list-wrapper"></div>`
const categoryWrapper = document.querySelector('.category-wrapper')
categoryWrapper.innerHTML = `<ul class="categories"></ul>`
const categories = document.querySelector('.categories')

// height
appNode.setAttribute('style', 'height: '+ window.innerHeight + 'px')
categories.setAttribute('style', 'height: '+ window.innerHeight + 'px')
window.addEventListener('resize', function() {
    categories.setAttribute('style', 'height: '+ window.innerHeight + 'px')
    appNode.setAttribute('style', 'height: '+ window.innerHeight + 'px')
})

// reload main window after getting New Category from mainWindow
ipcRenderer.on('NEW_CAT', function(e, cat) {
    electron.remote.getCurrentWindow().reload()
})

// show all Categories
const catList = () => {
    const data = Data.get()

    let list = ``
    for ( let key of Object.keys(data).sort() ) {
        if (data[key].catKey) {
            const catAnchor = `<a class="cat-item" href="#" data-catkey='${key}'>${data[key].catName}</a>`
            const catEdit = `<a class="cat-edit" href="#" data-catkey='${key}'><img src="./app/assets/icons/edit-white.svg"></a>`
            const catDelete = `<a class="cat-delete" href="#" data-catkey='${key}'><img src="./app/assets/icons/close-white.svg"></a>`
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


// add a list input
const addListWrap = document.createElement("div")
addListWrap.setAttribute("class", 'add-list-wrap')
addListWrap.setAttribute("style", 'display: none')
listWrapper.appendChild(addListWrap)

const addListBtn = document.createElement("a")
addListBtn.setAttribute("class", 'add-list-btn')
addListBtn.setAttribute("href", '#')
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

// add list
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
            Data.set(listId, { listKey: listId, listName: listValue, done: false, notDone: false, catId: category })
        
            getListInput.value = ''
            addListinputWrap.setAttribute('style', 'display: none')

            for (let i = 0; i < categoryItem.length; i++) {
                if (categoryItem[i].dataset.catkey == category) categoryItem[i].click()
            }
        }

    })
})


// update list
const listUpdate = (catDom) => {
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
                    const contentElement = parentList.parentNode.firstChild
                    const catID = parentList.parentNode.dataset.catid
                    const listDone = parentList.dataset.listdone
                    const listNotDone = parentList.dataset.listnotdone
                    const updateListForm = document.createElement("form")
                    updateListForm.classList.add("update-listform")

                    const updateListInput = document.createElement("input")
                    updateListInput.classList.add("update-list")
                    updateListInput.setAttribute("style", 'height:' + contentElement.offsetHeight + 'px')
                    updateListForm.appendChild(updateListInput)
                    parentList.parentNode.appendChild(updateListForm)
                    
                    updateListInput.setAttribute('value', contentElement.textContent)
                    updateListInput.focus()

                    const listKey = listEditIcon[key].dataset.listkey
                    updateListForm.addEventListener('submit', (e) => {
                        e.preventDefault()
                        
                        Data.set(listKey, {listKey: listKey, listName: updateListInput.value, done: listDone, notDone: listNotDone, catId: catID})
                        listEditIcon[key].parentNode.firstChild.innerHTML = updateListInput.value
                        updateListForm.remove()
                        catDom.click()
                    })
                }
            })
            
        })
    }
}

// delete List Item
const listDeleteItem = () => {
    const listDeleteIcon = document.querySelectorAll('.list-delete')

    if (listDeleteIcon) {
        listDeleteIcon.forEach( (value, key) => {
            listDeleteIcon[key].addEventListener('click', (e) => {
                e.preventDefault()
        
                const listItem = listDeleteIcon[key].parentNode.parentNode
                Data.delete(listItem.firstChild.dataset.listkey)
                listItem.remove()
            })
        })
    }
}

// list task done
const listDone = () => {
    const listDoneIcon = document.querySelectorAll('.list-done')

    listDoneIcon.forEach( (value, key) => {
        listDoneIcon[key].addEventListener('click', (e) => {
            e.preventDefault()

            const parentList = listDoneIcon[key].parentNode
            const catid = parentList.parentNode.dataset.catid
            const listkey = listDoneIcon[key].dataset.listkey
            const listValue = parentList.parentNode.firstChild.textContent
            const hasDone = parentList.querySelector(".done-emoji")
            const hasNotdone = parentList.querySelector(".notdone-emoji")
            
            if (hasDone) {
                Data.set(listkey, {listKey: listkey, listName: listValue, done: false, notDone: false, catId: catid})
                return hasDone.remove()
            } else {
                Data.set(listkey, {listKey: listkey, listName: listValue, done: true, notDone: false, catId: catid})
                hasNotdone ? hasNotdone.remove() : ''
                const emoji = `<img src="./app/assets/icons/clap.gif">`
                const emojiElement = document.createElement("span")
                emojiElement.classList.add("done-emoji")
                emojiElement.innerHTML = emoji
                return parentList.appendChild(emojiElement)
            }
        })
    })
}

// list task not done
const listNotDone = () => {
    const listNotDoneIcon = document.querySelectorAll('.list-not-done')

    listNotDoneIcon.forEach( (value, key) => {
        listNotDoneIcon[key].addEventListener('click', (e) => {
            e.preventDefault()

            const parentList = listNotDoneIcon[key].parentNode
            const catid = parentList.parentNode.dataset.catid
            const listkey = listNotDoneIcon[key].dataset.listkey
            const listValue = parentList.parentNode.firstChild.textContent
            const hasNotdone = parentList.querySelector(".notdone-emoji")
            const hasdone = parentList.querySelector(".done-emoji")
            
            if (hasNotdone) {
                Data.set(listkey, {listKey: listkey, listName: listValue, done: false, notDone: false, catId: catid})
                return hasNotdone.remove()
            } else {
                Data.set(listkey, {listKey: listkey, listName: listValue, done: false, notDone: true, catId: catid})
                hasdone ? hasdone.remove() : ''
                const emoji = `<img src="./app/assets/icons/facepalm.gif">`
                const emojiElement = document.createElement("span")
                emojiElement.classList.add("notdone-emoji")
                emojiElement.innerHTML = emoji
                return parentList.appendChild(emojiElement)
            }
        })
    })
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
                    const doneEmoji = (data[key].done == true) ? `<span class="done-emoji"><img src="./app/assets/icons/clap.gif"></span>` : ''
                    const notDoneEmoji = (data[key].notDone == true) ? `<span class="notdone-emoji"><img src="./app/assets/icons/facepalm.gif"></span>` : ''

                    const listname = `<span class="list-item" href="#" data-listkey="${data[key].listKey}">${data[key].listName}</span>`
                    const listDone = `<a class="list-done" href="#" data-listkey="${data[key].listKey}"><img src="./app/assets/icons/done.svg"></a>`
                    const listNotDone = `<a class="list-not-done" href="#" data-listkey="${data[key].listKey}"><img src="./app/assets/icons/block.svg"></a>`
                    const listEdit = `<a class="list-edit" href="#" data-listkey="${data[key].listKey}"><img src="./app/assets/icons/edit.svg"></a>`
                    const listDelete = `<a class="list-delete" href="#" data-listkey="${data[key].listKey}"><img src="./app/assets/icons/close.svg"></a>`
                    
                    const listOptions = `<div class="list-option">${listDone} ${listNotDone} ${listEdit} ${listDelete} ${doneEmoji} ${notDoneEmoji}</div>`
                    lists += `<li data-catid='${data[key].catId}'>${listname} ${listOptions}</li>`
                }
            }
            return lists
        }
        ul.innerHTML = allLists()
        
        // list edit and update
        listUpdate(categoryItem[catItemKey])

        // list delete item
        listDeleteItem()

        // list done
        listDone()
        
        // list not done
        listNotDone()
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

        const catKey = catDeleteIcon[key].dataset.catkey
        const data = Data.get()
        for ( let key of Object.keys(data) ) {
            if (data[key].catId == catKey) {
                Data.delete(key)
            }
        }
        if (catDeleteIcon[key].parentNode.firstChild.classList.contains("active-cat")) {
            document.querySelector(".lists-wrap").innerHTML = ''
            document.querySelector(".list-title").innerHTML = ''
            document.querySelector(".brand").setAttribute("style", "display: block")
            document.querySelector(".add-list-wrap").setAttribute("style", "display: none")
        }

        Data.delete(catKey)
        const parentCat = catDeleteIcon[key].parentNode
        parentCat.remove()

    })
})
