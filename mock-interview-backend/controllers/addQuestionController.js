const InterviewType = require('../models/interviewType');
const SubType = require('../models/subType');
const Question = require('../models/Question'); 

exports.addQuestion = async (req, res) => {
  
  try {
    const { interviewType, subType, difficulty, question, expectedDuration } = req.body;

    if (!interviewType || !subType || !difficulty || !question || !expectedDuration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. Check if the category exists
    let category = await InterviewType.findOne({ name: interviewType });

    // 2. If category does NOT exist, create it
    if (!category) {
      category = new InterviewType({ name: interviewType });
      await category.save();
    }

    // 3. Check if the SubType exists
    let subTypeExit = await SubType.findOne({ name: subType, interviewType: category._id });

    // 4. If SubType does NOT exist, create it
    if (!subTypeExit) {
      subTypeExit = new SubType({ name: subType, interviewType: category._id });
      await subTypeExit.save();
    }

    // 5. Create the question
    const newQuestion = new Question({
      subType: subTypeExit._id,
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
