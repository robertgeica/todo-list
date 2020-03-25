// create an array to store all todos
let todoItems = [];

// ul for todo li items
let tasksList = document.getElementById('todo-list');

// variable for list node
let listItem;

let warning = document.getElementById('warning');
warning.innerHTML = 'Single click to mark as complete.<br> Double click to delete.';

// get focused on input field
let userInput = document.getElementById('task');
userInput.focus();

// add element on enter key press
userInput.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById('addTask').click();
    }
});



// add todo function
function addTodo() {

    // create an object for todos elements
    let todo = {
        // id,
        task: userInput.value,
        completed: false,
        id: Date.now(),
    };

    

 
    // if todo.task is not empty
    if (todo.task !== "") {
        
        // create a <li> node
        listItem = document.createElement('li');

        // create a text node and store it's value in text_node variable
        let text_node = document.createTextNode(todo.task);

        // append text_node to list node
        listItem.appendChild(text_node);

        // apend listItem to <ul>
        tasksList.appendChild(listItem);

        // push new todo to array
        todoItems.unshift(todo);

        // clear and focus input area
        userInput.value = "";
        userInput.focus();
        
        // output added task in paragraph
        warning.innerHTML = 'Added ' + `<strong>${todo.task}</strong>` + ' to list!';

    } else {
        warning.innerHTML = 'Write something first!';
    }


    // mark item as completed onclick
    listItem.onclick = function() {
        
        // first check if listItem already contain css class taskCompleted
        if(this.classList.contains('taskCompleted')) {
            // remove taskCompleted class
            this.classList.remove('taskCompleted');
            // mark item as uncompleted
            todo.completed = false;
            warning.innerHTML = 'Marked item ' + `<strong>${todo.task}</strong>` + ' as uncompleted.'
        } else {
            // add taskCompleted css class
            this.classList.add('taskCompleted');
            // mark item as completed
            todo.completed = true;
            warning.innerHTML = 'Marked item ' + `<strong>${todo.task}</strong>` + ' as completed.'
        }
    }

    
    // remove item on double click
    listItem.ondblclick = function() {
        this.remove();

        warning.innerHTML = 'Item ' + `<strong>${todo.task}</strong>` + ' was deleted!'
    };


};


// remove all elements and make array empty
function removeAll() {
    // check ul for childNodes
    while (tasksList.hasChildNodes()) {
        tasksList.removeChild(tasksList.firstChild);
    }
    // empty array
    todoItems = [];
    warning.innerHTML = 'Your list is empty!';
}
