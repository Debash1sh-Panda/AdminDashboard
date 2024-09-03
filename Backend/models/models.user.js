const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  lastLoginDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);