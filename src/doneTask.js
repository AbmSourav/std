const doneTask = (Data) => {
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

exports.doneTask = doneTask