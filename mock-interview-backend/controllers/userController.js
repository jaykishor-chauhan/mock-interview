const crypto = require("crypto");
const User = require("../models/User");
const Tokens = require("../models/Token");
const RefreshToken = require("../models/RefreshToken");
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
      source: 'email',
      photo:null
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

    await sendVerificationEmail(user._id, user.email, user.name, verificationToken, "user");
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
    if( user.verified === true && user.emailVerified === true){
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
    await User.findByIdAndUpdate(userId, { verified: true, emailVerified: true })
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
    }else if (!user.verified || !user.emailVerified) {
      return res.status(400).json({ message: "Please verify your email before logging in or contact support." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role || 'candidate' }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Issue a refresh token additively alongside the existing access token
    const rawRefresh = crypto.randomBytes(40).toString("hex");
    const tokenHash  = await bcrypt.hash(rawRefresh, 10);
    await RefreshToken.create({ userId: user._id, tokenHash });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      refreshToken: rawRefresh,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'candidate',
        created_at: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ── Refresh token — rotate and issue a new access + refresh pair ───────────────
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    // Scan non-expired refresh token docs
    const docs = await RefreshToken.find({ expiresAt: { $gt: new Date() } });
    let matched = null;
    for (const doc of docs) {
      if (await bcrypt.compare(refreshToken, doc.tokenHash)) {
        matched = doc;
        break;
      }
    }

    if (!matched) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    const user = await User.findById(matched.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Rotate — delete old token, issue a fresh pair
    await RefreshToken.deleteOne({ _id: matched._id });

    const newToken = jwt.sign(
      { id: user._id, role: user.role || 'candidate' },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const rawRefresh = crypto.randomBytes(40).toString("hex");
    const tokenHash  = await bcrypt.hash(rawRefresh, 10);
    await RefreshToken.create({ userId: user._id, tokenHash });

    return res.status(200).json({
      token: newToken,
      refreshToken: rawRefresh,
      user: { id: user._id, name: user.name, email: user.email, role: user.role || 'candidate' },
    });
  } catch (error) {
    console.error("[userController] refreshToken error:", error.message);
    return res.status(500).json({ message: "Server error during token refresh" });
  }
};


// ── Logout — revoke refresh token ─────────────────────────────────────────────
exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    try {
      const docs = await RefreshToken.find({ expiresAt: { $gt: new Date() } });
      for (const doc of docs) {
        if (await bcrypt.compare(refreshToken, doc.tokenHash)) {
          await RefreshToken.deleteOne({ _id: doc._id });
          break;
        }
      }
    } catch (err) {
      console.error("[userController] logout error:", err.message);
    }
  }
  // Idempotent — always 200 even if token not found
  return res.status(200).json({ message: "Logged out successfully" });
};


// ── Get own profile ────────────────────────────────────────────────────────────
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ ok: true, data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ── Update own profile ─────────────────────────────────────────────────────────
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatarUrl } = req.body;
    const updates = {};
    if (name)      updates.name      = name;
    if (avatarUrl) updates.avatarUrl = avatarUrl;
    updates.updatedAt = Date.now();

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json({ ok: true, data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
