const User = require("../models/User");
const Tokens = require("../models/Token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../middleware/verifyMailer");



exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //verificaton token sending
    const verificationToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    let tokenDocument = await Tokens.findOne({ id: user._id });

    if (tokenDocument) {
      tokenDocument.token = verificationToken;
      await tokenDocument.save();
    } else {
      await new Tokens({ id: user._id, token: verificationToken }).save();
    }

    await sendVerificationEmail(user._id, user.email, user.name, verificationToken);
    res.status(200).json({ message: "If user with this email exists, a verification email has been sent." })

  } catch (error) {
    res.status(500).json({ message: error.message || "An error occured on the servere." });
  }
};


exports.verifyEmail = async (req, res) => {
  const { userId, token } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ message: "Invalid link..." });
  }

  try {
    const user = await User.findOne({ _id: userId })
    if( user.status === true ) {
      return res.status(200).json({ message: "You email has already been verified." })
    }

    const verifyRecord = await Tokens.findOne({ id: userId })
  
    if (!verifyRecord) {
      return res.status(400).json({ message: "Invalid or expired verification link." });
    }

    const isTokenMatch = (token === verifyRecord.token);
    if (!isTokenMatch) {
      return res.status(400).json({ message: "Invalid or expired password reset link." });
    }

    jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(userId, { status: true })
    await Tokens.deleteOne({ id: userId });
    res.status(200).json({ message: "Email verified successfully." });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Email verification link has expired." });
    }
    res.status(500).json({ message: "An error occured on server." });
  }

};




exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};