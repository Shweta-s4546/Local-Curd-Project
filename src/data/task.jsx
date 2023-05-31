import { toast } from "react-toastify";

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const randId = ()=>{
    return Math.floor(Math.random()*10000);
}


const createTask = async (task)=>{
      try {
        const extTask = tasks.find((item)=>item.title === task.title);
        if(extTask){
            toast.warning(`task already exists`);
        }else{
            const newTask = {
                id : randId(),
                ...task
            }
            tasks.push(newTask);
            saveTask(tasks);
            toast.success('new task created successfully');
            window.location.href = "/";
        }
        
      } catch (err) {
        toast.error(err.message);
      }
}
//read all data
const readAllTask = ()=>{
    return tasks;
}

// read single task
const readSingleTask = (id)=>{
    const data = tasks.find((item)=>item.id == id);
    return data;
}

// update logic
const updateTask = (id,task)=>{
    try {
        const extTaskIndex = tasks.findIndex((item)=>item.id == id);
        tasks.splice(extTaskIndex,1,task);
        saveTask(tasks);
        toast.success("Updated successfully");
        window.location.href='/'
    } catch (err) {
        toast.error(err.message)
    }
}
const deleteTask = (id) =>{
    try {
        const taskIndex = tasks.findIndex((item)=>item.id == id);
        tasks.splice(taskIndex,1);
        saveTask(tasks);
        toast.success("Deleted successfully");
        window.location.href='/'
    } catch (err) {
        toast.error(err.message)
    }
}


// save Task
const saveTask = (data)=>{
localStorage.setItem("tasks",JSON.stringify(data));
}


export {createTask , readAllTask,readSingleTask , updateTask, deleteTask} ;