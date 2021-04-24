const mongoose = require("mongoose");
const db = require("./db");

const userSchema = new mongoose.Schema({
  name: {type: String, required: true },
  tasks: {type: Array, required: true }, 
  num_of_tasks: Number, 
  completed_this_game: Number, 
  completed_ever: Number 
});

const taskSchema = new mongoose.Schema({
  task_name:{type: String, required: true },
  task_who: {type: Array, required: true },
  task_desc: String, 
  do_days: Number, 
});

const gameSchema = new mongoose.Schema({
  current_score: {type: Number, required: true },
  home_goals: {type: Number, required: true }, 
  away_goals: {type: Number, required: true },
  game_tasks: {type: Array, required: true},
  goals_by: Array, 
  players: {type: Array, required: true}

});


const User = db.model("users", userSchema);
const Task = db.model("tasks", taskSchema); 
const Game = db.model("games", gameSchema);

module.exports = { User, Task , Game};