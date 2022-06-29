const Todo = require('../models/Todo.model');
const jwt = require('jsonwebtoken');

module.exports.todosController = {
  // getting todos
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      console.log(error);
    }
  },

  // creating a new todo
  createTodos: async (req, res) => {
    const { text, user } = req.body;

    try {
      const todos = await Todo.create({
        text,
        user,
      });
      res.json(todos);
    } catch (e) {
      return res.status(401).json('Wrong token');
    }
  },

  // deleting todo
  deleteTodos: async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await Todo.findById(id);

      console.log(todo.user.toString(), req.user.id);
      if (todo.user.toString() === req.user.id) {
        await todo.remove();

        return res.status(204).json('Todo deleted');
      }
      return res.status(401).json('Access denied');
    } catch (e) {
      return res.status(401).json('Operation failed: ' + e.toString());
    }
  },

  // change todo
  patchTodos: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          done: req.body.done,
        },
        { new: true },
      );
      return res.json(todo);
    } catch (error) {
      console.log(error);
    }
  },
};
