const { createHTMLElement } = require("./helper")

const createNodes = () => {
	const appNode = document.getElementById('app')

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

	const listWrapper = document.querySelector('.list-wrapper')

	const brand = createHTMLElement({
		element: "div",
		className: "brand",
		attr: {name: 'style', value: 'display: block'}
	})

	const brandDetail = `<div class="brand-detail">Developerd by <span>Keramot UL Islam</spna></span>`
	const brandName = `<h2>STD</h2>`
	brand.innerHTML = brandName + brandDetail
	listWrapper.appendChild(brand)


	const addUL = createHTMLElement({
		element: "ul",
		className: "lists-wrap",
	})
	listWrapper.appendChild(addUL)
	const ul = document.querySelector(".lists-wrap")

	const ListTitle = document.createElement("h2")
	ListTitle.setAttribute("class", "list-title")
	listWrapper.prepend(ListTitle)


	// add a list input
	const addListWrap = createHTMLElement({
		element: "div",
		className: "add-list-wrap",
		attr: {name: 'style', value: 'display: none'}
	})
	listWrapper.appendChild(addListWrap)

	const addListBtn = createHTMLElement({
		element: "a",
		className: "add-list-btn",
		attr: {name: 'href', value: '#'}
	})

	const addListIcon = createHTMLElement({
		element: "img",
		attr: {name: 'src', value: './app/assets/icons/add.svg'}
	})

	addListBtn.appendChild(addListIcon)
	addListWrap.appendChild(addListBtn)
	listWrapper.prepend(addListWrap)

}

exports.createNodes = createNodes