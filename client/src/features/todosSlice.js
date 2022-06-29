import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// creating initial todo array
const initialState = {
  todos: [],
  loading: false,
  adding: false,
};

// fetching all todos from server
export const fetchTodos = createAsyncThunk('todos/fetch', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  try {
    const res = await fetch('http://localhost:4200/todos', {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });

    const data = await res.json();

    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// adding todo
export const postTodos = createAsyncThunk('todos/post', async ({text, user}, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:4200/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, user }),
    });
    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// deleting todo
export const removeTodo = createAsyncThunk('todos/delete', async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    console.log(token)
    await fetch(`http://localhost:4200/todos/${id}`, {
      method: 'DELETE',
      headers: {Authorization: `Bearer ${token}`}
    });
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// changing todo
export const patchTodo = createAsyncThunk('todos/patch', async (todo, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4200/todos/${todo._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: !todo.done,
      }),
    });
    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// creating slice functionality with all manipulation cases
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTodos.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        state.adding = false;
        state.loading = false;
      })
      .addCase(postTodos.pending, (state, action) => {
        state.adding = true;
        state.loading = true;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
        state.loading = false;
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.todos = state.todos.map((todo) => {
          console.log(action);
          if (todo._id === action.meta.arg) {
            todo.disabled = true;
          }
          return todo;
        });
        state.loading = true;
      })
      .addCase(patchTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return action.payload;
          }
          return todo;
        });
        state.loading = false;
      });
  },
});
export default todosSlice.reducer;
