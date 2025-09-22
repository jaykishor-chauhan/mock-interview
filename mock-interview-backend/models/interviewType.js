const mongoose = require('mongoose');
const interviewType = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // no duplicate category names
  }
});

module.exports = mongoose.model('interviewType', interviewType);
