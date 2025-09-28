const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  tags: {
    type: String, 
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
