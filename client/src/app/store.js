import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import todosSlice from '../features/todosSlice';


export const store = configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
  },
});
