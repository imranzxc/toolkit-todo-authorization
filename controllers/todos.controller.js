const Todo = require('../models/Todo.model.js')

module.exports.todosController = ({
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find()
      res.json(todos)
    } catch (error) {
      console.log(error)
    }
  },
  createTodos: async (req, res) => {
    try {
      const todos = await Todo.create({
        text: req.body.text
      })
      res.json(todos)
    } catch (error) {
      console.log(error)
    }
  },
  deleteTodos: async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id)
     return res.json('deleted')
    } catch (error) {
      res.json(error.message)
    }
  },
  patchTodos: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, {
        done: req.body.done
      }, { new: true })
      return res.json(todo)
    } catch (error) {
      console.log(error)
    }
  }
})