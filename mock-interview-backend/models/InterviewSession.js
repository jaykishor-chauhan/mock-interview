const mongoose = require('mongoose');

/**
 * Sub-document for a single Q&A entry within a session.
 * questionText is denormalised (snapshot at interview time) so edited
 * questions don't retroactively change past session records.
 */
const questionEntrySchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    questionText: String,
    answerText: String,
    aiFeedback: String, // written critique (placeholder until Part 2 AI integration)
    scores: {
      clarity:    { type: Number, min: 1, max: 10 },
      technical:  { type: Number, min: 1, max: 10 },
      confidence: { type: Number, min: 1, max: 10 },
    },
    answeredAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

/**
 * Top-level session document.
 * Holds the full interview transcript, per-question scores, and final result.
 * userId is indexed for fast history lookups.
 */
const interviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  role:  { type: String, required: true }, // e.g. "Backend Engineer"
  topic: { type: String, required: true }, // e.g. "System Design"
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned'],
    default: 'active',
  },
  questions: [questionEntrySchema], // grows with each submitted answer
  overallScore: {
    type: Number,
    min: 0,
    max: 10,
    default: null, // computed when session ends
  },
  recommendations: [String], // AI-generated tips (placeholder until Part 2)
  transcript: {
    type: String,
    default: '', // concatenated Q&A text for full-text search / report
  },
  startedAt: { type: Date, default: Date.now },
  endedAt:   { type: Date, default: null },
});

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
