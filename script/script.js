const myList = document.querySelector(".tasks");
const form = document.querySelector(".form-task");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let taskValue = Object.fromEntries(formData).task.trim();
    if(!taskValue) return;
    myList.appendChild(createTaskItem(taskValue,["span","button"]));
    cleanAndFocusInput();
    salveTasks();
})

const createTaskItem = (text,elements) => {
    
    const li = document.createElement("li");
    li.classList.add("d-flex", "align-items-center","mb-10");
    let newItem = addElementInsideParent(li,elements,text);
    return newItem;
}

const cleanAndFocusInput = () => {
    const inputTask = form.querySelector('.input-task');
    inputTask.value = ''
    inputTask.focus();
}

const addElementInsideParent = (parenteEl,elements,text) => {
    for(let element of elements){
        let newEl = document.createElement(element);
        if(newEl instanceof HTMLButtonElement){
            newEl.textContent = "🗑️";
            newEl.classList.add("delete-button","w-5");
            newEl.setAttribute("data-action","delete");
        }else{
            newEl.textContent = onlyLetterToUpperCase(0,text);
            newEl.classList.add("task-text", "w-90");
        }
        parenteEl.appendChild(newEl);
    }
    return parenteEl;
}

const deleteTask = (element) => {
    element.parentElement.remove();
    salveTasks();
    console.log(element.parentElement)
}


const salveTasks = () => {
    const myListItemsDOM = document.querySelectorAll('.task-text');
    const listItems = [];
    for(let listItem of myListItemsDOM){
        listItems.push(listItem.innerHTML);
    }
    const listItemsJSON = JSON.stringify(listItems);
    localStorage.setItem("myTasks", listItemsJSON);
}

const onlyLetterToUpperCase = (index, text) => {
    return  text.charAt(index).toUpperCase() + text.slice(1);
}

const reloadStoredTasks = () =>{
    let storedTasks = JSON.parse(localStorage.getItem("myTasks"));
    for(let taskValue of storedTasks){
        myList.appendChild(createTaskItem(taskValue,["span","button"]));
    }
}

window.addEventListener("click", (e) => {
    const deleteButton = e.target;
    if(deleteButton.innerHTML === "🗑️") deleteTask(deleteButton);

});

window.addEventListener("load", reloadStoredTasks());
