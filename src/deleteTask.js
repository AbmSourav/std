const deleteTast = (Data) => {
    const listDeleteIcon = document.querySelectorAll('.list-delete')

    if (listDeleteIcon) {
        listDeleteIcon.forEach( (value, key) => {
            listDeleteIcon[key].addEventListener('click', (e) => {
                e.preventDefault()
        
                const listItem = listDeleteIcon[key].parentNode.parentNode
                Data.delete(listItem.firstChild.dataset.listkey)
                listItem.remove()
            })
        })
    }
}

exports.deleteTast = deleteTast