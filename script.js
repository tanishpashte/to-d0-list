document.addEventListener("DOMContentLoaded", () => {
    setTime();

    let taskList = document.querySelector('#task-list');
    let taskInput = document.querySelector("#input-task-field");
    let submitTask = document.querySelector(".task-submit-button");    

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => showTask(task));

    submitTask.addEventListener('click', (event) => {
        event.stopPropagation();
        createTask();
        saveTasks();
    })

    function setTime(){
        const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let currentDate = new Date();
        let day = dayNames[currentDate.getDay()];
        let date = currentDate.getDate();
        let month = monthNames[currentDate.getMonth()];
        const addDate = document.getElementById('date')
        console.log(day, date, month);
        addDate.innerHTML = `<span class="flex justify-center items-center">${month} ${date}, ${day}</span>`
    }

    function createTask(){
        let taskInputText = taskInput.value.trim();
        if(taskInputText === "") return;
        let newTask = {
            id: Date.now(),
            text: taskInputText,
            completed: false
        }
    
        tasks.push(newTask);
        showTask(newTask);
        taskInput.value = ""
    }

    function showTask(task){
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="flex items-center">${task.text}</span>
            <button class="bg-red-600 text-white rounded-md px-2 py-1">Delete</button>
        `
        
        li.classList.add("bg-slate-600", "px-2", "py-1", "list-none" ,"flex", "justify-between", "my-2", "w-5/6", "rounded-md")
        
        taskList.appendChild(li);
    }

    function saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    function clearAllTasks(){
        localStorage.clear();
    }

    document.querySelector('#clear-all').addEventListener('click', ()=>{
        clearAllTasks()
        console.log("tasks cleared");
        window.location.reload()
    })



})









