let tasks = [];
// Load tasks from localStorage if they exist
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const comList = document.getElementById("comList");
const remList = document.getElementById("remList");
renderTask();
// Load from localStorage here (optional)
// then helper function
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// then addTask(), renderTask(), deleteTask(), etc.
addTaskBtn.addEventListener("click", addTask) 
function addTask(){
    const taskText = taskInput.value;

    if (taskText === "") return;

    // Create a task object
    const task = {
    id: Date.now(), // unique number based on current time
    text: taskText,
    completed: false
};


    // Add to tasks array
    tasks.push(task);

    // Render all tasks
    renderTask();

    // Clear input
    taskInput.value = "";
    saveTasks();
};

function renderTask() {
    // 1. Clear the current list in the DOM
    taskList.innerHTML = "";
    remList.innerHTML = "";
    comList.innerHTML = "";

    // 2. Loop over the tasks array
    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.textContent = task.text;
        
        const completedBtn = document.createElement("button");
        completedBtn.textContent = "Completed";
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        // Add click listener to delete this task
        deleteBtn.addEventListener("click", function() {
            deleteTask(task.id);
        });
        completedBtn.addEventListener("click", function() {
            task.completed = !task.completed;
            renderTask();
            saveTasks();

        });
        if (task.completed === true) {
            const ci = document.createElement("li");
            ci.textContent = task.text;
            comList.appendChild(ci);
            
            
            completedBtn.textContent = "Uncomplete";
            li.style.textDecoration = "line-through";};
        if (task.completed === false) {
            const ri = document.createElement("li");
            ri.textContent = task.text;
            remList.appendChild(ri);};
        
        li.appendChild(completedBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    

}
function deleteTask(id) {
    // Remove the task with matching id from the array
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    // Re-render the updated array
    renderTask();
    saveTasks();
}

