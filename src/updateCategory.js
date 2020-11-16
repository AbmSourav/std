const updateCategory = (Data) => {
	const catEditIcon = document.querySelectorAll('.cat-edit')

	catEditIcon.forEach( function(value, key) {
		catEditIcon[key].addEventListener('click', function(e) {
			e.preventDefault()

			const listTitle = document.querySelector('.list-title')
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
					listTitle.innerHTML = updateCatInput.value
				})
			}
		})
	})
}

exports.updateCategory = updateCategory