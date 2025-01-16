require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
require('./config/db');
const taskRoutes = require('./routes/tasks');

const app = express();

//use middleware for handling req and res
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;