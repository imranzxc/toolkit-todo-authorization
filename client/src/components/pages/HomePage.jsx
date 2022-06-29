import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import todosSlice, {
  fetchTodos,
  patchTodo,
  postTodos,
  removeTodo,
} from '../../features/todosSlice';
import '../App.css';
import { ImPlus } from 'react-icons/im';
import { MdDoneOutline } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';

const HomePage = () => {
  //creating react hooks
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const adding = useSelector((state) => state.todos.adding);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');


  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // handle todo adder functionality
  const addTodo = () => {
    if (token) {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].text.toUpperCase() === text.toUpperCase()) {
          return false;
        }
      }
      // if/else structure
      if (text) {
        console.log(text);
        dispatch(postTodos({ text, user }));
        setText('');
      }
    } else {
      console.log('no access');
    }
  };
  // handle delete functionality
  const deleteTodo = (id) => {
    dispatch(removeTodo(id));
  };
  // handle patching and changing functionality
  const patchDone = (todo) => {
    dispatch(patchTodo(todo));
  };

  // rendering information
  return (
    <div className="wrapper">
      <h1>Todo</h1>
      <div className="form">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div class="inputField">
            <input
              value={text}
              type="text"
              placeholder="Type your text..."
              onChange={(e) => setText(e.target.value)}
            />
            <div onClick={addTodo}>
              <button className="inp" value={`${adding ? 'Добавляется...' : 'Добавить'}`}>
                <div>
                  <ImPlus />
                  <span className={`back ${text ? 'switch' : ''}`}>
                    <MdDoneOutline />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {todos.map((todo) => {
          // mapping todo list items
          return loading ? (
            // adding some loaders
            <div class="loader">
              <div class="circle"></div>
            </div>
          ) : (
            // changing styles by checking done or not
            <div className={`li todo ${todo.done ? 'done' : ''}`} key={todo._id}>
              <div className={`${todo.done ? 'change' : ''}`}>
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={() => patchDone(todo)}
                  checked={todo.done}></input>
              </div>

              <div className={`${todo.done ? 'text' : ''}`}>{todo.text}</div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className={`${todo.done ? 'display' : ''}`}
                disabled={todo.disabled}>
                <div className="deleteBtn">
                  <FiTrash />
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
