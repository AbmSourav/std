const updateTask = (catDom, Data) => {
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

exports.updateTask = updateTask