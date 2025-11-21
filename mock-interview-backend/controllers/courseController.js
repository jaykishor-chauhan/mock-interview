const Course = require("../models/Course");
// const Question = require("../models/Question");

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
    if (!course || !category || !status || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("Received data:", { course, category, status, description });

    const existingCourse = await Course.findOne({ name: course });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course already exists"
      });
    }

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

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("Deleting course with ID:", courseId);
    
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course", error });
  }
};

