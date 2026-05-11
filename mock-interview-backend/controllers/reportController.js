const InterviewSession = require('../models/InterviewSession');

// ── Full report for a single completed session ─────────────────────────────────
/**
 * GET /api/reports/:sessionId
 * Users can only access their own sessions.
 */
exports.getReport = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await InterviewSession.findOne({
      _id:    sessionId,
      userId: req.user.id,
      status: 'completed',
    }).populate('courseId', 'name category');

    if (!session) {
      return res.status(404).json({
        ok: false,
        error: { code: 'REPORT_NOT_FOUND', message: 'Completed session not found' },
      });
    }

    return res.json({
      ok: true,
      data: {
        sessionId:       session._id,
        course:          session.courseId ? (session.courseId.name || session.courseId.title) : 'Unknown',
        role:            session.role,
        topic:           session.topic,
        overallScore:    session.overallScore,
        recommendations: session.recommendations,
        questions: session.questions.map(q => ({
          question: q.questionText,
          answer:   q.answerText,
          feedback: q.aiFeedback,
          scores:   q.scores,
        })),
        startedAt: session.startedAt,
        endedAt:   session.endedAt,
      },
    });
  } catch (err) {
    console.error('[reportController] getReport error:', err.message);
    return res.status(500).json({
      ok: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve report' },
    });
  }
};

// ── Paginated session history ──────────────────────────────────────────────────
/**
 * GET /api/reports/history?page=1&limit=10
 * Returns the authenticated user's completed sessions, newest first.
 */
exports.getHistory = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const [sessions, total] = await Promise.all([
      InterviewSession.find({ userId: req.user.id, status: 'completed' })
        .sort({ endedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('courseId', 'name category')
        .select('courseId role topic overallScore startedAt endedAt'),
      InterviewSession.countDocuments({ userId: req.user.id, status: 'completed' }),
    ]);

    return res.json({
      ok: true,
      data: {
        sessions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    console.error('[reportController] getHistory error:', err.message);
    return res.status(500).json({
      ok: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve history' },
    });
  }
};
