const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const InterviewSession = require('../models/InterviewSession');
const Question = require('../models/Question');
const Course = require('../models/Course');

// ── Start session ──────────────────────────────────────────────────────────────
/**
 * POST /api/interview/start
 * Body: { courseId, role, topic }
 * Finds a random question from the question bank for the given course,
 * creates the session document, and returns the first question.
 *
 * AI-generated first questions will replace the random-pick in Part 2.
 */
exports.startSession = async (req, res) => {
  try {
    const { courseId, role, topic } = req.body;

    if (!courseId || !role || !topic) {
      return res.status(400).json({
        ok: false,
        error: { code: 'VALIDATION_ERROR', message: 'courseId, role, and topic are required' },
      });
    }

    // Validate the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        ok: false,
        error: { code: 'COURSE_NOT_FOUND', message: 'Course not found' },
      });
    }

    // Pick a random question from the question bank for this course
    const questions = await Question.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      { $sample: { size: 1 } },
    ]);

    if (!questions.length) {
      return res.status(404).json({
        ok: false,
        error: { code: 'NO_QUESTIONS', message: 'No questions found for this course' },
      });
    }

    const firstQuestion = questions[0];

    // Create the session document
    const session = await InterviewSession.create({
      userId:   req.user.id,
      courseId,
      role,
      topic,
      status: 'active',
    });

    return res.status(201).json({
      ok: true,
      data: {
        sessionId: session._id,
        question: {
          id:   firstQuestion._id,
          text: firstQuestion.question,
        },
      },
    });
  } catch (err) {
    console.error('[interviewController] startSession error:', err.message);
    return res.status(500).json({
      ok: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to start interview session' },
    });
  }
};

// ── Submit answer ──────────────────────────────────────────────────────────────
/**
 * POST /api/interview/answer
 * Body: { sessionId, questionId?, questionText, answerText }
 *
 * Appends the Q&A pair to the session document with a placeholder scorecard.
 * Returns the scorecard and a next question picked at random from the bank.
 *
 * Part 2 will replace the placeholder scorecard with Gemini evaluation and
 * will generate the next question dynamically based on conversation history.
 */
exports.submitAnswer = async (req, res) => {
  try {
    const { sessionId, questionId, questionText, answerText } = req.body;

    if (!sessionId || !questionText || !answerText) {
      return res.status(400).json({
        ok: false,
        error: { code: 'VALIDATION_ERROR', message: 'sessionId, questionText, and answerText are required' },
      });
    }

    const session = await InterviewSession.findOne({
      _id:    sessionId,
      userId: req.user.id,
      status: 'active',
    });

    if (!session) {
      return res.status(404).json({
        ok: false,
        error: { code: 'SESSION_NOT_FOUND', message: 'Active session not found' },
      });
    }

    // ── Placeholder AI evaluation (Part 2 will replace this) ─────────────────
    const placeholderScorecard = {
      scores: { clarity: 7, technical: 7, confidence: 7 },
      feedback: 'Your answer has been recorded. AI evaluation will be available in Part 2.',
      strengths:    ['Answer submitted successfully'],
      improvements: ['AI-powered analysis coming soon'],
      nextQuestionHint: null,
    };
    // ─────────────────────────────────────────────────────────────────────────

    // Append Q&A to session
    session.questions.push({
      questionId:   questionId || null,
      questionText,
      answerText,
      aiFeedback:   placeholderScorecard.feedback,
      scores:       placeholderScorecard.scores,
    });

    // Update full-text transcript
    session.transcript += `\nQ: ${questionText}\nA: ${answerText}\n`;
    await session.save();

    // Pick next random question for the same course (exclude already-asked ones)
    const askedIds = session.questions
      .filter(q => q.questionId)
      .map(q => new mongoose.Types.ObjectId(q.questionId));

    const matchStage = { course: session.courseId };
    if (askedIds.length) {
      matchStage._id = { $nin: askedIds };
    }

    const nextQuestions = await Question.aggregate([
      { $match: matchStage },
      { $sample: { size: 1 } },
    ]);

    const nextQuestion = nextQuestions.length
      ? { id: nextQuestions[0]._id, text: nextQuestions[0].question }
      : null; // null signals the frontend that the bank is exhausted

    return res.json({
      ok: true,
      data: {
        feedback:     placeholderScorecard,
        nextQuestion,
      },
    });
  } catch (err) {
    console.error('[interviewController] submitAnswer error:', err.message);
    return res.status(500).json({
      ok: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to process answer' },
    });
  }
};

// ── End session ────────────────────────────────────────────────────────────────
/**
 * POST /api/interview/end
 * Body: { sessionId }
 *
 * Computes overallScore as the average of per-question scores,
 * marks the session completed, and persists endedAt.
 */
exports.endSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        ok: false,
        error: { code: 'VALIDATION_ERROR', message: 'sessionId is required' },
      });
    }

    const session = await InterviewSession.findOne({
      _id:    sessionId,
      userId: req.user.id,
      status: 'active',
    });

    if (!session) {
      return res.status(404).json({
        ok: false,
        error: { code: 'SESSION_NOT_FOUND', message: 'Active session not found' },
      });
    }

    // Compute overall score as average across all per-question averages
    let overallScore = 0;
    if (session.questions.length > 0) {
      const questionAverages = session.questions.map(q => {
        const s = q.scores || {};
        const vals = [s.clarity, s.technical, s.confidence].filter(v => v != null);
        return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
      });
      overallScore = parseFloat(
        (questionAverages.reduce((a, b) => a + b, 0) / questionAverages.length).toFixed(1)
      );
    }

    // Placeholder recommendations (Part 2 will generate via Gemini)
    const recommendations = [
      'Review your answers and identify areas for improvement.',
      'Practice articulating technical concepts with concrete examples.',
      'AI-powered personalised recommendations coming in Part 2.',
    ];

    session.status      = 'completed';
    session.overallScore = overallScore;
    session.recommendations = recommendations;
    session.endedAt     = new Date();
    await session.save();

    return res.json({
      ok: true,
      data: { overallScore, recommendations },
    });
  } catch (err) {
    console.error('[interviewController] endSession error:', err.message);
    return res.status(500).json({
      ok: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to end session' },
    });
  }
};
