const InterviewType = require('../models/interviewType');
const SubType = require('../models/subType');
const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {

  try {
    const { interviewType, subType, difficulty } = req.body;

    if (!interviewType || !subType || !difficulty) {
      return res.status(400).json({ message: "All fields are required.." });
    }

    // 1. Find category
    const interviewCategory = await InterviewType.findOne({ name: interviewType });
    if (!interviewCategory) {
      return res.status(404).json({ message: "Interview category not found" });
    }

    // 2. Find subcategory under this category
    const subCategory = await SubType.findOne({
      name: subType,
      interviewType: interviewCategory._id
    });

    if (!subCategory) {
      return res.status(404).json({ message: "SubType not found" });
    }


    // 3. Build query for questions
    const query = { subType: subCategory._id };
    if (difficulty) query.difficulty = difficulty;


    // 4. Find questions and populate subType details
    const questions = await Question.find(query)
      .populate({
        path: 'subType',               
        select: 'name interviewType',   
        populate: {                     
          path: 'interviewType',
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
