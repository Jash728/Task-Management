import { createSlice } from "@reduxjs/toolkit";

const loadTasks = (userId) => {
  if (!userId) return []; 
  const storedTasks = localStorage.getItem(`tasks_${userId}`);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasks = (userId, tasks) => {
  if (!userId) return; 
  localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [], 
    userId: null, 
  },
  reducers: {
   
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.tasks = loadTasks(state.userId); 
    },
    addTask: (state, action) => {
      const newTask = action.payload;
      if (state.userId) {
        state.tasks.push(newTask);
        saveTasks(state.userId, state.tasks); 
      }
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      if (state.userId) {
        saveTasks(state.userId, state.tasks); 
      }
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      if (state.userId) {
        const index = state.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
          saveTasks(state.userId, state.tasks); 
        }
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      if (state.userId) {
        state.tasks = state.tasks.filter(task => task.id !== taskId);
        saveTasks(state.userId, state.tasks); 
      }
    },
  },
});

export const { setUserId, addTask, setTasks, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
