const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4200;

app.use(cors());
app.use(express.json());
app.use(require('./routes/todo.route'))
app.use(require('./routes/users.route'))

mongoose
  .connect('mongodb+srv://nanoface:mistersea42@cluster0.fhte6.mongodb.net/todo-fullstack')
  .then(() => console.log('Успешно присоединились к серверу MongoDB'))
  .catch(() => console.log('Ошибка при соединении с сервером MongoDB'));

app.listen(port, () => {
  console.log(`hello world http://localhost:${port}`);
});
