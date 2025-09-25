const mongoose = require('mongoose');
const course = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // no duplicate course names
  }
});

module.exports = mongoose.model('Course', course);
