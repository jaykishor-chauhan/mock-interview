const Course = require('../models/Course');
const Category = require('../models/Category');
const Question = require('../models/Question'); 

exports.addQuestion = async (req, res) => {
  
  try {
    const { interviewType, subType, difficulty, question, expectedDuration } = req.body;

    if (!interviewType || !subType || !difficulty || !question || !expectedDuration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. Check if the category exists
    let _course = await Course.findOne({ name: interviewType });

    // 2. If category does NOT exist, create it
    if (!_course) {
      _course = new Course({ name: interviewType });
      await _course.save();
    }

    // 3. Check if the SubType exists
    let _categoryExit = await Category.findOne({ name: subType, interviewType: _course._id });

    // 4. If SubType does NOT exist, create it
    if (!_categoryExit) {
      _categoryExit = new Category({ name: subType, interviewType: _course._id });
      await _categoryExit.save();
    }

    // 5. Create the question
    const newQuestion = new Question({
      category: _categoryExit._id,
      difficulty,
      question,
      expectedDuration
    });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully" });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
