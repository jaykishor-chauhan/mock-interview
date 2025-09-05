const User = require("../models/User");
const Tokens = require("../models/Token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendPasswordResetEmail } = require("../middleware/resetMailer");

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "If a user with that email exists, a password reset link has been sent." });
    }
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    console.log("resetToken: ", resetToken)


    let tokenDocument = await Tokens.findOne({ id: user._id });

    if (tokenDocument) {
      tokenDocument.token = resetToken;

      await tokenDocument.save();
      console.log("Token updated successfully.");

    } else {
      await new Tokens({ userId: user._id, token: resetToken }).save();
      console.log("New token created successfully.");
    }

    await sendPasswordResetEmail(user._id, user.email, user.name, resetToken);
    res.status(200).json({ message: "If a user with that email exists, a password reset link has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ message: "An error occurred on the server." });
  }
};


exports.updatePassword = async (req, res) => {
  const { userId, token, newPassword } = req.body;

  if (!userId || !token || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const passwordResetRecord = await Tokens.findOne({ id: userId });

    if (!passwordResetRecord) {
      return res.status(400).json({ message: "Invalid or expired password reset link." });
    }

    const isTokenMatch = (token === passwordResetRecord.token);
    if (!isTokenMatch) {
      return res.status(400).json({ message: "Invalid or expired password reset link." });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    await Tokens.deleteOne({ userId });

    res.status(200).json({ message: "Password has been updated successfully." });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Password reset link has expired." });
    }
    res.status(500).json({ message: "An error occurred on the server." });
  }
};