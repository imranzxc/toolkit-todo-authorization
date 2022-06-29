const { Router } = require('express');
const { todosController } = require('../controllers/todos.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.post('/todos', todosController.createTodos);
router.patch('/todos/:id', authMiddleware, todosController.patchTodos);
router.delete('/todos/:id', authMiddleware, todosController.deleteTodos);
router.get('/todos', todosController.getTodos);

module.exports = router;
