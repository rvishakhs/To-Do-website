const todoinput = document.getElementById("todo-input");
const todobtn = document.getElementById("todo-btn");
const todolist = document.getElementById("todo-list");
const filtertodo = document.getElementById("filter-todo")
let mylists = [];

document.addEventListener("DOMContentLoaded", getTodos);
todolist.addEventListener("click", function(e){
    let item = e.target;
    if(item.classList[0] === "trash-btn"){
        const element = item.parentElement;
        element.setAttribute('id', 'fall')
        removeFromLocalStorage(element)  
        element.addEventListener('transitionend', function(){
             element.remove(); 
        })  
    }

    if(item.classList[0] === "complete-btn"){
        const element = item.parentElement;
        element.setAttribute('id', 'completed')
        element.classList.add("completed")

    }
})

filtertodo.addEventListener("click", function(e){
    const todo = todolist.childNodes;
    todo.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";        
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }   
            }          
    })
})

todobtn.addEventListener("click", function(){ 
    event.preventDefault();
    listDiv()
    todoinput.value = ""
})


function listDiv(){
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.setAttribute('id', 'todo');


    //Create LI
    
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.setAttribute('id', 'todo-item');
    newTodo.innerText = todoinput.value;
    // we need to call the  save local storage function because we need to pass the present input field value 
    //  to the existing array
    saveLocalTodos(todoinput.value);
    todoDiv.appendChild(newTodo);
    
    // create check mark Button

    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    newTodo.setAttribute('id', 'todo-item');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(completedButton)

    // Create trash button

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton)

    todolist.append(todoDiv)
}


function saveLocalTodos(todo){    
    let todos;
    //checking if we have anything in the local storage if have something we need to get back to todo variable//
    if(localStorage.getItem("todos") === null ){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //collecting back the local storage and add the values currently we entered in the input feild and
    //save this back to local storage 
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos));

}
/* This function is using for get back the local storage items and show them in the DOM */

function getTodos(){
/* first we need to check if anything has in local storage if exist get it back */
    let todos;
    if(localStorage.getItem("todos") === null ){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
/* and execute the code we are used to show items in DOM */
    todos.forEach(function(todo){
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.setAttribute('id', 'todo');


    //Create LI
    
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.setAttribute('id', 'todo-item');
    // NOW WE NEED TO CHANGE THE INNER TEXT BECAUSE WE ARE USING THE VALUE GET BACK FROM LOCAL sTORAGE
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    
    // create check mark Button

    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    newTodo.setAttribute('id', 'todo-item');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(completedButton)

    // Create trash button

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton)
    
    todolist.append(todoDiv)
    })

}

/* // There is a problem exist ie; after deleting somethings from DOM if we refresh the page the deleted items 
still come to the DOM because we Didn't delete them from local storage  */

    function removeFromLocalStorage(todo){
/* Check any thing exist in Local storage */
    let todos;
    if(localStorage.getItem("todos") === null ){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }    
/*     Then we need to grab the innertext of deleted item to get the index number */
    const todoIndex = todo.children[0].innerText
/*     now we save the inner text to a variable 
    todo comes from the delete button function 
    childer[0] means getting the li from code ( li has the text we entered)
    .innertext for grabbing the text */
    todos.splice(todos.indexOf(todoIndex), 1);
    /* the line execute the delete function from todo array and we are finding the indexof todoIndex and remove 
    on time */
    localStorage.setItem("todos", JSON.stringify(todos));
/*     for saving updated todos into local storage */
    }

