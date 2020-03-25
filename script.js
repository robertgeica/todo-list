let user_input = document.getElementById('task');
user_input.focus();


const addTodo = () => {
    if(user_input.value !== '') {
        const todo = user_input.value.trim();
        localStorage.setItem(`${todo}`, todo);
        
        user_input.value = '';
        renderTodo(todo); // display on addtask click
    }
}
const addButton = document.getElementById('addTask');
addButton.addEventListener('click', addTodo);

// add on enter key press
user_input.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        addButton.click();
    }
});


// render todo list
const list = document.querySelector('.todo-list');
const renderTodo = (key) => {
    const myList = `
        <li>  
            ${localStorage.getItem(key)} 
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    list.innerHTML += myList;
}


// check for localstorage
if(typeof(Storage) !== 'undefined') {
    let key;

    // iterate ls keys
    for (i = 0; i <= localStorage.length-1; i++) {     
        key = localStorage.key(i);    
        // render todo's from localstorage
        renderTodo(key);
    }
}


// delete
list.addEventListener('click', e => {
    const item = e.target;

    if(item.classList.contains('delete')) {
        item.parentNode.remove(); // remove from display

        const key = item.parentNode.textContent.trim();
        localStorage.removeItem(key); // remove from localstorage
    }
});


// mark complete
list.addEventListener('click', e => {
    const item = e.target.classList;
    item.contains('taskCompleted') ? item.remove('taskCompleted') : item.add('taskCompleted');
});


// filter
const filterTodos = () => {
    const filter_input = document.getElementById('filter').value.toUpperCase();
    
    const li = list.getElementsByTagName('li');
    let item;

    for(let i=0; i<li.length; i++) {
        item = li[i].textContent.trim();

        item.toUpperCase().indexOf(filter_input) > -1 ? 
        li[i].style.display = '' : li[i].style.display = 'none';   
    }
}