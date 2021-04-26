const mongoose = require ("mongoose");
const db = require("./db");

const userSchema = new mongoose.Schema({
  name: String,
  tasks: Array, 
  num_of_tasks: Number, 
  completed_this_game: Number, 
  completed_ever: Number 
});

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskWho: String,
  taskDesc: String, 
  startDate: String,
  interval: Number, 
});

const gameSchema = new mongoose.Schema({
  startDate: String, 
  endDate: String,
  score: Number, 
  gameTasks: Array,
  players: Array, 
  doneTasks: Array,
  notDoneTasks: Array,

});


const User = db.model("users", userSchema);
const Task = db.model("tasks", taskSchema); 
const Game = db.model("games", gameSchema);

module.exports = { User, Task , Game};