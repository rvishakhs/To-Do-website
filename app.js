const todoinput = document.getElementById("todo-input");
const todobtn = document.getElementById("todo-btn");
const todolist = document.getElementById("todo-list");
let mylists = [];


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
    }
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


