const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String },
  source: { type: String, required: true },
  verified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = mongoose.model("Admin", adminSchema);
