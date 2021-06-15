const { createHTMLElement } = require("./helper")

const addTask = (Data) => {

	const categoryItem = document.querySelectorAll('.cat-item')

	const addListinputWrap = createHTMLElement({
		element: 'div',
		className: 'input-wrap',
		attr: { name: 'style', value: 'display: none' }
	})

	const addList = document.querySelector('.add-list-btn')

	const addListForm = createHTMLElement({
		element: 'div',
		className: 'add-list-form'
	})

	const addListInput = createHTMLElement({
		element: 'input',
		className: 'add-list-input'
	})

	const piorityWrap = createHTMLElement({
		element: 'div',
		className: 'piority-wrap'
	})
	const piorityTitle = createHTMLElement({
		element: 'h4',
		className: 'piority-title',
		textContent: 'Priority'
	})
	const piorityBtnImportant = createHTMLElement({
		element: 'button',
		className: 'piority-btn important',
		attr: {name: 'title', value: 'Important'}
	})
	const piorityBtnHigh = createHTMLElement({
		element: 'button',
		className: 'piority-btn high',
		attr: {name: 'title', value: 'High'}
	})
	const piorityBtnCompulsory = createHTMLElement({
		element: 'button',
		className: 'piority-btn compulsory',
		attr: {name: 'title', value: 'Compulsory'}
	})
	piorityWrap.appendChild(piorityTitle)
	piorityWrap.appendChild(piorityBtnImportant)
	piorityWrap.appendChild(piorityBtnHigh)
	piorityWrap.appendChild(piorityBtnCompulsory)

	const submitBtnWrap = createHTMLElement({
		element: 'div',
		className: 'submit-wrap'
	})
	const submitBtn = createHTMLElement({
		element: 'button',
		className: 'add-task-submit',
		textContent: 'Add'
	})
	submitBtnWrap.appendChild(submitBtn)

	addListForm.appendChild(addListInput)
	addListForm.appendChild(piorityWrap)
	addListForm.appendChild(submitBtnWrap)
	addListinputWrap.appendChild(addListForm)

	const listWrapper = document.querySelector('.list-wrapper')
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

		let priorityStatus = null;
		let prevNode = null;
		const priorityBtns = document.querySelectorAll('.piority-btn')
		priorityBtns.forEach( (value, key) => {
			priorityBtns[key].addEventListener('click', (e) => {

				if (prevNode && prevNode !== priorityBtns[key]) {
					if (prevNode.classList.contains('checked') === true) {
						prevNode.classList.remove('checked');
					}
				}
				
				if (priorityBtns[key].classList.contains('checked') === true) {
					priorityBtns[key].classList.remove('checked');
				} else {
					priorityBtns[key].classList.add('checked')
				}

				if (priorityBtns[key].classList.contains('checked')) {
					if (priorityBtns[key].classList.contains('important')) {
						priorityStatus = 'important'
					} else if (priorityBtns[key].classList.contains('high')) {
						priorityStatus = 'high'
					} else if (priorityBtns[key].classList.contains('compulsory')) {
						priorityStatus = 'compulsory'
					}
				}

				prevNode = priorityBtns[key]
			})
		})

		// submit a list to database
		submitBtn.addEventListener('click', (e) => {
			e.preventDefault()
			const category = addList.dataset.category
			const listValue = getListInput.value
			const key = listValue.split(' ').join('');
			const listId = key.toLowerCase() + '_' + Math.random().toString(36).slice(2)

			if (listValue) {
				Data.set(listId, { 
					listKey: listId, 
					listName: listValue, 
					done: false, 
					notDone: false, 
					catId: category,
					priority: priorityStatus
				})
			
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