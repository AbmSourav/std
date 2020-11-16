const createTask = (catItemKey, data) => {
	let lists = ``
	for ( let key of Object.keys(data).sort() ) {
		if (data[key].catId == catItemKey.dataset.catkey) {
			const doneEmoji = (data[key].done == true) ? `<span class="done-emoji"><img src="./app/assets/icons/clap.gif"></span>` : ''
			const notDoneEmoji = (data[key].notDone == true) ? `<span class="notdone-emoji"><img src="./app/assets/icons/facepalm.gif"></span>` : ''

			const listname = `<span class="list-item" href="#" data-listkey="${data[key].listKey}">${data[key].listName}</span>`
			const listDone = `<a class="list-done" href="#" data-listkey="${data[key].listKey}"><img src="./app/assets/icons/done.svg"></a>`
			const listNotDone = `<a class="list-not-done" href="#" data-listkey="${data[key].listKey}"><img src="./app/assets/icons/block.svg"></a>`
			const listEdit = `<a class="list-edit" href="#" data-listkey="${data[key].listKey}"><img src="./app/assets/icons/edit.svg"></a>`
			const listDelete = `<a class="list-delete" href="#" data-listkey="${data[key].listKey}"><img src="./app/assets/icons/close.svg"></a>`
			
			const listOptions = `<div class="list-option">${listDone} ${listNotDone} ${listEdit} ${listDelete} ${doneEmoji} ${notDoneEmoji}</div>`
			lists += `<li data-catid='${data[key].catId}'>${listname} ${listOptions}</li>`
		}
	}
	return lists
}

exports.createTask = createTask