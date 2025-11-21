const Admin = require("../models/Admin");
const User = require("../models/User");
const Course = require("../models/Course");
const Question = require("../models/Question");

// Return aggregated stats and recent activity for admin dashboard
const getDashboard = async (req, res) => {
	try {
		const totalUsers = await User.countDocuments();
		const totalCourses = await Course.countDocuments();
		const totalQuestions = await Question.countDocuments();
		const totalAdmins = await Admin.countDocuments();

		// recent activity: last 5 users, admins, courses, and questions
		const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt verified emailVerified');
		const recentAdmins = await Admin.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt verified emailVerified');
		const recentCourses = await Course.find().sort({ createdAt: -1 }).limit(5).select('name status createdAt');
		const recentQuestions = await Question.find().sort({ createdAt: -1 }).limit(5).populate('course', 'name').select('question difficulty createdAt');

		// counts by course status
		const courseStatusAgg = await Course.aggregate([
			{ $group: { _id: '$status', count: { $sum: 1 } } }
		]);
		const courseStatusCounts = {};
		courseStatusAgg.forEach((c) => { courseStatusCounts[c._id] = c.count; });

		// counts by question difficulty
		const questionDiffAgg = await Question.aggregate([
			{ $group: { _id: '$difficulty', count: { $sum: 1 } } }
		]);
		const questionDifficultyCounts = {};
		questionDiffAgg.forEach((d) => { questionDifficultyCounts[d._id] = d.count; });

		// user active/inactive counts (consider emailVerified or verified)
		const userActiveCount = await User.countDocuments({ $or: [{ emailVerified: true }, { verified: true }] });
		const userInactiveCount = totalUsers - userActiveCount;

		// admin active/inactive counts
		const adminActiveCount = await Admin.countDocuments({ $or: [{ emailVerified: true }, { verified: true }] });
		const adminInactiveCount = totalAdmins - adminActiveCount;

		return res.status(200).json({
			stats: {
				totalUsers,
				totalCourses,
				totalQuestions,
				totalAdmins,
				userActiveCount,
				userInactiveCount,
				adminActiveCount,
				adminInactiveCount
			},
			recentUsers,
			recentAdmins,
			recentCourses,
			recentQuestions,
			courseStatusCounts,
			questionDifficultyCounts
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Failed to fetch dashboard data' });
	}
}

module.exports = { getDashboard };