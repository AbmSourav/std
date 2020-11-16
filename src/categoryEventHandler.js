const { deleteTast } = require("./deleteTask");
const { doneTask } = require("./doneTask");
const { updateTask } = require("./updateTask");
const { notDoneTask } = require("./notDoneTask");
const { createTask } = require("./createTask");

const categoryEventHandler = (Data) => {

	const categoryItem = document.querySelectorAll('.cat-item')
	categoryItem.forEach( (value, catItemKey) => {
		
		categoryItem[catItemKey].addEventListener('click', (e) => {
			e.preventDefault()

			const catItemText = categoryItem[catItemKey].innerText
			const hasActive = document.querySelector(".active-cat")
			const addListInput = document.querySelector('.add-list-input')
			const addListWrap = document.querySelector('.add-list-wrap')
			const listTitle = document.querySelector('.list-title')
			const addListBtn = document.querySelector('.add-list-btn')
			const brand = document.querySelector('.brand')
			const ul = document.querySelector(".lists-wrap")

			addListInput.setAttribute("placeholder", 'Add List in ' + catItemText)
			addListWrap.setAttribute('style', 'display: block')
			
			hasActive ? hasActive.classList.remove("active-cat") : ''
			
			listTitle.innerHTML = catItemText
			categoryItem[catItemKey].classList.add("active-cat")
			addListBtn.setAttribute("data-category", categoryItem[catItemKey].dataset.catkey)
			brand.setAttribute("style", "display: none")
			
			ul.innerHTML = createTask(categoryItem[catItemKey], Data.get())
			
			// list edit and update
			updateTask(categoryItem[catItemKey], Data)

			// list delete item
			deleteTast(Data)

			// list done
			doneTask(Data)
			
			// list not done
			notDoneTask(Data)
		})

	})

}

exports.categoryEventHandler = categoryEventHandler