import { createSlice } from "@reduxjs/toolkit";

const loadTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks?JSON.parse(storedTasks) : [];
};

const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadTasks(),
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = action.payload;
      state.tasks.push(newTask);
      saveTasks(state.tasks);
    },

    setTasks: (state, action) => {
      state.tasks = action.payload;
      saveTasks(state.tasks);
    },

    updateTask : (state, action) => {
      const updatedTask = action.payload;
      console.log(updatedTask.id)
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if(index!==-1){
        state.tasks[index] = updatedTask;
        saveTasks(state.tasks)
      }

    },

    deleteTask : (state, action)=>{
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task=>task.id!=taskId);
      saveTasks(state.tasks)
    }
  },
});


export const {addTask, setTasks, updateTask, deleteTask} = taskSlice.actions;

export default taskSlice.reducer;