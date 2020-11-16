const catList = (Data) => {
	const categories = document.querySelector('.categories')
    const data = Data.get()

    let list = ``
    for ( let key of Object.keys(data).sort() ) {
        if (data[key].catKey) {
            const catAnchor = `<a class="cat-item" href="#" data-catkey='${key}'>${data[key].catName}</a>`
            const catEdit = `<a class="cat-edit" href="#" data-catkey='${key}'><img src="./app/assets/icons/edit-white.svg"></a>`
            const catDelete = `<a class="cat-delete" href="#" data-catkey='${key}'><img src="./app/assets/icons/close-white.svg"></a>`
            list += `<li>${catAnchor} ${catEdit} ${catDelete}</li>`
        }
    }
    return categories.innerHTML = list
}

exports.catList = catList