const express = require('express');
const { storeTask , getTodos, showTodo, updateTodo, deleteTodo} = require('../controllers/todoTaskController');
const {checklogin} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/store', checklogin, storeTask);
router.get('/', checklogin, getTodos);
router.get('/show/:id', checklogin, showTodo);
router.put('/update/:id', checklogin, updateTodo);
router.delete('/delete/:id', checklogin, deleteTodo);

module.exports = router;