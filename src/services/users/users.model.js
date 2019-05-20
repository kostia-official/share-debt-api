const mongoose = require('mongoose');

const { Schema } = mongoose;

const users = new Schema(
  {
    email: String,
    password: String,
    number: String,
    name: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('users', users);
