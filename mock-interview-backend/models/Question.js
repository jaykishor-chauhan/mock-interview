const mongoose = require('mongoose');
const subType = require('./subType');

const question = new mongoose.Schema({
  subType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubType',
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'], // restrict difficulty levels
    required: true
  },
  question: {
    type: String,
    required: true
  },
  expectedDuration: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('question', question);
