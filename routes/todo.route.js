const { Router } = require('express')
const { todosController } = require('../controllers/todos.controller')



const router = Router()

router.post('/todos', todosController.createTodos)
router.patch('/todos/:id', todosController.patchTodos)
router.delete('/todos/:id', todosController.deleteTodos)
router.get('/todos', todosController.getTodos)

module.exports = router