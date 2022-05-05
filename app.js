const todoinput = document.getElementById("todo-input");
const todobtn = document.getElementById("todo-btn");
const todolist = document.getElementById("todo-list");
const filtertodo = document.getElementById("filter-todo")
let mylists = [];

document.addEventListener("DOMcontentLoaded", function(){

    let listFromLocal = JSON.parse(localStorage.getItem("mylists"))

    if (listFromLocal){
    mylists = listFromLocal
    mylists.forEach(function(todo) {
        // Todo Div
       const todoDiv = document.createElement("div");
       todoDiv.classList.add("todo");
       todoDiv.setAttribute('id', 'todo');
   
   
       //Create LI
       
       const newTodo = document.createElement("li");
       newTodo.classList.add("todo-item");
       newTodo.setAttribute('id', 'todo-item');
       newTodo.innerText = "My name is ";
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
       })
    }

}) 

todolist.addEventListener("click", function(e){
    let item = e.target;
    if(item.classList[0] === "trash-btn"){
        const element = item.parentElement;
        element.setAttribute('id', 'fall')
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
    localStorage.setItem("localTodos", JSON.stringify(mylists));
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
    mylists.push(todoinput.value);
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
