const Course = require('../models/Course');
const Category = require('../models/Category');
const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {

  try {
    const { interviewType, subType, difficulty } = req.body;

    if (!interviewType || !subType || !difficulty) {
      return res.status(400).json({ message: "All fields are required.." });
    }

    // 1. Find course
    const _course = await Course.findOne({ name: interviewType });
    if (!_course) {
      return res.status(404).json({ message: "Interview course not found" });
    }

    // 2. Find subcategory under this course
    const _category = await Category.findOne({
      name: subType,
      course: _course._id
    });

    if (!_category) {
      return res.status(404).json({ message: "Sub category not found" });
    }


    // 3. Build query for questions
    const query = { subType: _category._id };
    if (difficulty) query.difficulty = difficulty;


    // 4. Find questions and populate subType details
    const questions = await Question.find(query)
      .populate({
        path: 'Category',               
        select: 'name Course',   
        populate: {                     
          path: 'Course',
          select: 'name'               
        }
      });


    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    res.status(200).json({ questions });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
