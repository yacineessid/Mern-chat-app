const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 200,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 240,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
