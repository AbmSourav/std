const Store = require("electron-store");

class DataStore extends Store {
    constructor(settings) {
        super(settings)
        this.name = settings.catName
        this.todos = this.get(name) || {}
        // this.addCat(catKey)
    }

    // addCat(name) {
    //     if ( ! this.has(catKey) ) {
    //         const catKey = name.split(' ').join('')
    //         catKey = {}
    //         return this.saveTodos()
    //     }
    // }

    saveTodos() {
        this.set(this.name, this.todos)
        return this
    }

    getTodos() {
        this.todos = this.get(this.name) || {}
        return this
    }

    addTodo(todo, key = todo.split(' ').join('')) {
        this.todos[key] = todo
        return this.saveTodos()
    }

    // deleteTodo(catName, catItem) {
    //     this.todos = this.todos.filter(obj => obj.id !== todo)
    //     return this.saveTodos()
    // } 

}

exports.DataStore = DataStore;
