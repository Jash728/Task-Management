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
  },
});


export const {addTask, setTasks} = taskSlice.actions;

export default taskSlice.reducer;