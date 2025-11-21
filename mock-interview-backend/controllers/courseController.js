const Course = require("../models/Course");
const Question = require("../models/Question");

exports.getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve courses", error });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { course, category, status, description } = req.body;
    const newCourse = new Course({
      name: course,
      category,
      status,
      description
    });
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add course", error });
  }
};


