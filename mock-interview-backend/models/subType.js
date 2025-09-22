const mongoose = require('mongoose');
const interviewType = require('./interviewType');

const subType = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  interviewType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'interviewType',
    required: true
  }
});

module.exports = mongoose.model('SubType', subType);
