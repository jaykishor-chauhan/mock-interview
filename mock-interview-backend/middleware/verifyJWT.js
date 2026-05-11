const jwt = require('jsonwebtoken');

/**
 * Express middleware — verifies the Bearer JWT on protected routes.
 * Attaches req.user = { id, email, role } on success.
 * Returns 401 on missing, expired, or invalid token.
 */
function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      ok: false,
      error: { code: 'MISSING_TOKEN', message: 'Authorization token is required' },
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Support both { id } (existing tokens) and { sub } (README spec)
    req.user = {
      id:    payload.id || payload.sub,
      email: payload.email,
      role:  payload.role || 'candidate',
    };
    next();
  } catch (err) {
    const code = err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN';
    return res.status(401).json({
      ok: false,
      error: { code, message: err.message },
    });
  }
}

module.exports = verifyJWT;
