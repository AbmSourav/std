function createHTMLElement(domElement = {
	element: '', 
	textContent: null, 
	className: null, 
	id: null, 
	attr: null
}) {
	// element, textContent = null, className = null, id = null, attr = null
	const {element, textContent, className, id, attr} = domElement
	const el = document.createElement(element)

	textContent ? el.textContent = textContent : null;
	className ? el.setAttribute("class", className) : null;
	id ? el.setAttribute("id", id) : null;
	attr ? el.setAttribute(attr.name, attr.value) : null;

	return el;
}

exports.createHTMLElement = createHTMLElement