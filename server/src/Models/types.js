import mongoose from "mongoose";
import { db } from "../db/db.js";

const userSchema = new mongoose.Schema({
  name: String,
  tasks: Array,
  num_of_tasks: Number,
  completed_this_game: Number,
  completed_ever: Number,
});

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskWho: String,
  taskDesc: String,
  startDate: String,
  interval: Number,
  done: Boolean,
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

export const User = db.model("users", userSchema);
export const Task = db.model("tasks", taskSchema);
export const Game = db.model("games", gameSchema);
