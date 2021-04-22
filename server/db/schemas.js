const mongoose = require('mongoose');
const db = require('./db');

const userSchema = new mongoose.Schema({
  name: String,
  tasks: Array, 
});

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskWho: Array,
})

const User = db.model('users', userSchema);
const Task = db.model('tasks', taskSchema)

module.exports = { User, Task }