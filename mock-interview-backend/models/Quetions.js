const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    level: {
        type: String,
        required: true
    },
    questions: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('Question', questionSchema);


