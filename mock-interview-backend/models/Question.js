const mongoose = require('mongoose');
const Category = require('./Category');

const question = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
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
