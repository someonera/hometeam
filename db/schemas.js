const mongoose = require('mongoose');
const db = require('./db');

const userSchema = new mongoose.Schema({
  name: String
});

const User = db.model('users', userSchema);

module.exports = User;