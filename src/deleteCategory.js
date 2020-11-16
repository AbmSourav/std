const deleteCategory = (Data) => {

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

}

exports.deleteCategory = deleteCategory