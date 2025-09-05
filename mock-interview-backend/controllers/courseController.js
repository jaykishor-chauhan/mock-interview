const Course = require('../models/Course');
const Question = require('../models/Quetions');

// GET /courses/name/:name
const getQuestions = async (req, res) => {
    const courseName = req.params.name;

    try {
        // 1. Find the course by name
        const course = await Course.findOne({ name: courseName });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // 2. Find all questions with courseId referencing this course's _id
        const questions = await Question.find({ courseId: course._id });

        return res.status(200).json({
            course,
            questions
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getQuestions };
