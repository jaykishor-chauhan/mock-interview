const Course = require('../models/Course');
const Question = require('../models/Question');

exports.addQuestion = async (req, res) => {
  try {
    const { course, question, difficulty, tags } = req.body;

    if (!course || !question || !difficulty || !tags || !tags.length) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the course document by name (e.g. "HR")
    const courseDoc = await Course.findOne({ name: course });
    if (!courseDoc) {
      return res.status(400).json({ message: `Course "${course}" not found` });
    }

    const newQuestion = new Question({
      course: courseDoc._id, // store ObjectId
      question,
      difficulty,
      tags,
    });

    await newQuestion.save();
    res.status(201).json({
      message: 'Question added successfully',
      question: newQuestion
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getQuestion = async (req, res) => {
  try {
    // Fetch all questions and populate the course name
    const questions = await Question.find()
      .populate('course', 'name category') // only populate the 'name' field of the course
      .exec();

    res.status(200).json({
      message: 'All questions fetched successfully',
      questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.filterQuestions = async (req, res) => {
  try {
    const { name, category, difficulty } = req.body;
    console.log("Filtering questions with:", { name, category, difficulty });

    if (!name || !category || !difficulty) {
      return res.status(400).json({ message: `All fields are required..` });
    }

    const _course = await Course.findOne({ name, category }); 
    // console.log("Found course:", _course);
    if (!_course) {
      return res.status(404).json({ message: 'Course not found for the selected criteria..' });
    }

    const questions = await Question.find({
      course: _course._id,
      difficulty: { $in: difficulty },
    });

    if (!questions.length) {
      return res.status(404).json({ message: 'No questions found for the selected criteria' });
    }

    res.status(200).json({
      message: 'Questions filtered successfully',
      questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
