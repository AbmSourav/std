const addTask = (Data) => {

	const categoryItem = document.querySelectorAll('.cat-item')

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

	const listWrapper = document.querySelector('.list-wrapper')
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

}

exports.addTask = addTask