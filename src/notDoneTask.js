// list task not done
const notDoneTask = (Data) => {
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
			let priority = null
			if (parentList.parentNode.classList.contains('important')) {
				priority = 'important'
			} else if (parentList.parentNode.classList.contains('high')) {
				priority = 'high'
			} else if (parentList.parentNode.classList.contains('compulsory')) {
				priority = 'compulsory'
			}
            
            if (hasNotdone) {
                Data.set(listkey, {listKey: listkey, listName: listValue, done: false, notDone: false, catId: catid, priority: priority})
                return hasNotdone.remove()
            } else {
                Data.set(listkey, {listKey: listkey, listName: listValue, done: false, notDone: true, catId: catid, priority: priority})
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

exports.notDoneTask = notDoneTask