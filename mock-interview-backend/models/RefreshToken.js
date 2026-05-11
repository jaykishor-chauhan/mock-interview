const mongoose = require('mongoose');

/**
 * Stores hashed refresh tokens for silent JWT re-authentication.
 * Raw token is a 40-byte random hex string; only the bcrypt hash is persisted.
 * TTL index auto-expires documents after 30 days.
 */
const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  tokenHash: {
    type: String,
    required: true, // bcrypt hash of the raw 40-byte random token
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// MongoDB TTL index — document auto-deleted after expiry
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
