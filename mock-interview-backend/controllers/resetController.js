const User = require("../models/User");
const Admin = require("../models/Admin");
const Tokens = require("../models/Token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendResetMail } = require("../middleware/resetMailer");

exports.resetPassword = async (req, res) => {
  const { email, role } = req.body;
  // console.log("Forget details: ", { email, role });

  if (!email || !role) {
    return res.status(400).json({ message: "Email and role are required." });
  }

  try {
    let user;

    if (role == "user") {
      user = await User.findOne({ email });
    } else if (role == "admin") {
      user = await Admin.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        message: "Please check the email and try again."
      });
    }

    const resetToken = jwt.sign({ id: user._id, email: user.email, role }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });


    let tokenDocument = await Tokens.findOne({ id: user._id });


    if (tokenDocument) {
      tokenDocument.token = resetToken;

      await tokenDocument.save();

    } else {
      await new Tokens({ id: user._id, token: resetToken }).save();
    }

    // console.log("reset details:", { resetToken, userId: user._id , email: user.email});
    await sendResetMail(user._id, user.email, user.name, resetToken);
    res.status(200).json({
      message: "A password reset link has been sent. It will expire in 15 minutes."
    });

  } catch (error) {
    res.status(500).json({ message: "An error occurred on the server." });
  }
};


exports.updatePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // console.log("Updated details: ", { token, newPassword });

  if (!token || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = tokenDecoded.id;
    const role = tokenDecoded.role;

    // console.log("Reset Details: ", { userId, role });

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

    if (role === "admin") {
      await Admin.findByIdAndUpdate(userId, { password: hashedPassword });
    } else {
      await User.findByIdAndUpdate(userId, { password: hashedPassword });
    }

    await Tokens.deleteOne({ id: userId });

    res.status(200).json({ message: "Password has been updated successfully.", user: role });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Password reset link has expired." });
    }
    res.status(500).json({ message: "An error occurred on the server." });
  }
};

