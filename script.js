//Making a list to store tasks
let tasks =[];

//Getting HTML Elements by IDs
const tasklist = document.getElementById('task-list');
const addTaskInput = document.getElementById('input-task');
const taskCOunter = document.getElementById('task-counter');
const addbutton = document.getElementById('add-button');


//Defining a function that adds tasks to the browser page
function addTaskToDOM(task){
    const li = document.createElement('li');

    /*Creating List element to which we add task name, 
    checkbox to know whether task is completed and delete option*/
    li.innerHTML=`
    <div>
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    </div>
    <i class="delete fa-solid fa-circle-xmark" data-id="${task.id}"></i>
    `;
    tasklist.append(li);
}

//This function calls the addTaskToDOM function by passing each task details as argument
function renderList(){
    tasklist.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    taskCOunter.innerHTML=tasks.length;
};
//A function to add tasks to the tasklist
function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        return;
    }
}



//A function to delete individual tasks when user clicks on delete button

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id != Number(taskId);
    })
    tasks=newTasks;
    renderList();
}



//A function to toggle completion of tasks

function toggleTask(taskId){
    const toggleTasks= tasks.filter(function(task){
        return task.id==Number(taskId)
    });
    if(toggleTasks.length>0){
        const currentTask = toggleTasks[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        if(document.getElementById('incomplete').style.color=='black'){
            renderUncompleteList();
        }
        else if(document.getElementById('completed').style.color=='black'){
            renderCompleteList();
        }
        return;
    }
}

//A function to hide the add Task button when there is no input

function typing(){
    if(addTaskInput.value!=""){
        addbutton.classList.replace('add-btn','add-button-active');
    }else{
        addbutton.classList.replace('add-button-active','add-btn');
    }
}



//This function will be triggered when user clicks on incomplete in footer section and display alll incomplete tasks

function renderUncompleteList(){
    tasklist.innerHTML='';
    const incomplete_tasks = tasks.filter(function(task){
        return task.completed != true;
    })
    for(let i=0;i<incomplete_tasks.length;i++){
        addTaskToDOM(incomplete_tasks[i]);
    }
    taskCOunter.innerHTML=incomplete_tasks.length;
}



//This function will be triggered when user clicks on completed in footer section and display alll completed tasks

function renderCompleteList(){
    tasklist.innerHTML='';
    const completed_tasks = tasks.filter(function(task){
        return task.completed == true;
    })
    for(let i=0;i<completed_tasks.length;i++){
        addTaskToDOM(completed_tasks[i]);
    }
    taskCOunter.innerHTML=completed_tasks.length;
}



//This function will mark all tasks as completed when user clicks on complete-all in header section

function completeAllTasks(){
    for(let i=0;i<tasks.length;i++){
        tasks[i].completed=true;
    }
    renderList();
}


//This function will delete all completed task and display on incomplete tasks.

function clearCompletedTasks(){
    const incompleteTasksList = tasks.filter(function(task){
        return task.completed !=true;
    })
    tasks=incompleteTasksList;
    renderList();
}


//This function will update the task object withe task name given by user and also add unique ID.

function handleAddButton(){
    const text = addTaskInput.value;
    const task ={
        title : text,
        id : Date.now(),
        completed : false
    }
    addTaskInput.value="";
    addTask(task);
    typing();
}



//A collective function to handle click events and call respective functions

function handleClickListener(e){
    const target = e.target;
    if(target.className == 'delete fa-solid fa-circle-xmark'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className=='custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
    else if(target.id == 'incomplete'){
        document.getElementById('all').style.color = 'grey';
        document.getElementById('completed').style.color = 'grey';
        document.getElementById('incomplete').style.color = 'black';
        renderUncompleteList();
        return;
    }
    else if(target.id == 'all'){
        document.getElementById('all').style.color = 'black';
        document.getElementById('completed').style.color = 'grey';
        document.getElementById('incomplete').style.color = 'grey';
        renderList();
        return;
    }
    else if(target.id == 'completed'){
        document.getElementById('all').style.color = 'grey';
        document.getElementById('completed').style.color = 'black';
        document.getElementById('incomplete').style.color = 'grey';
        renderCompleteList();
        return;
    }
    else if(target.id == 'complete-all'){
        completeAllTasks();
        return;
    }
    else if(target.id =='clear-complete'){
        clearCompletedTasks();
        return;
    }
}

//Getting the click/keypress input and firing the trigger functions

addbutton.addEventListener('click',handleAddButton);
addTaskInput.addEventListener('keypress',function(event){
    if(event.key==="Enter"){
        addbutton.click();
    }
});
document.addEventListener('click',handleClickListener);
