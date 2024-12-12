document.addEventListener("DOMContentLoaded", () => {
    setTime();

    let taskList = document.querySelector('#task-list');
    let taskInput = document.querySelector("#input-task-field");
    let submitTask = document.querySelector(".task-submit-button");   
    console.log(document.querySelector('#delete-task-button'));
    

    

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
            <span class="flex items-center task-item-text">${task.text}</span>
            <button id="delete-task-button" class="bg-red-600 text-white rounded-md px-2 py-1">Delete</button>
        `
        
        li.classList.add("bg-slate-800", "px-2", "py-1", "list-none" ,"flex", "justify-between", "my-2", "w-5/6", "rounded-md")
        
        // delete event 
        li.addEventListener('click', (event) => {
            if(event.target.id === "delete-task-button"){
                tasks =  tasks.filter((t) => t.id !== task.id)
                saveTasks();
                li.remove();
            }
        })

        //task complete
        li.addEventListener('click', (event) => {
            if(event.target.id !== "delete-task-button"){
                task.completed = !task.completed;
                if(task.completed){
                    li.querySelector('.task-item-text').classList.add("line-through")
                    li.classList.remove("bg-slate-800");
                    li.classList.add("bg-slate-600");
                }else{
                    li.querySelector('.task-item-text').classList.remove("line-through")
                    li.classList.remove("bg-slate-600");
                    li.classList.add("bg-slate-800");
                }
                saveTasks();
                
            }
        })
        
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









