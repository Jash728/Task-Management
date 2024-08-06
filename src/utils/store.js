import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import themeReducer from './themeSlice';
import taskReducer from './taskSlice';

export const store = configureStore({
    reducer : {
        auth : authReducer,
        theme : themeReducer,
        tasks : taskReducer
    }
})