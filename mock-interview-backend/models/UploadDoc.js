const mongoose = require('mongoose');

/**
 * Metadata + raw text for admin-uploaded knowledge documents.
 * Binary files are not stored here; text is extracted at upload time and
 * stored in rawText for downstream RAG ingestion (Part 2 — Pinecone).
 */
const uploadDocSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filename:  String,
  mimeType:  String,
  rawText:   String,   // extracted text — ready for chunking and embedding
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    default: null,
  },
  ingestedAt: Date,    // set after Pinecone upsert (Part 2)
  chunkCount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UploadDoc', uploadDocSchema);
