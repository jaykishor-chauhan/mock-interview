/**
 * Factory middleware — checks req.user.role matches the required role.
 * Must be used AFTER verifyJWT (which populates req.user).
 *
 * Usage: router.get('/admin/users', verifyJWT, requireRole('admin'), handler)
 */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        error: { code: 'UNAUTHENTICATED', message: 'Not authenticated' },
      });
    }
    if (req.user.role !== role) {
      return res.status(403).json({
        ok: false,
        error: {
          code: 'FORBIDDEN',
          message: `This endpoint requires the '${role}' role`,
        },
      });
    }
    next();
  };
}

module.exports = requireRole;
