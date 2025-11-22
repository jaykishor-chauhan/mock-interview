const Admin = require("../models/Admin");
const User = require("../models/User");
const Tokens = require("../models/Token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../middleware/verifyMailer");

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminExit = await Admin.findOne({ email });

    if (adminExit) {
      return res.status(400).json({ message: "User already exists, try using another email id." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      source: 'email',
      photo: null,
    });

    //verificaton token sending
    const verificationToken = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    let tokenDocument = await Tokens.findOne({ id: admin._id });

    if (tokenDocument) {
      tokenDocument.token = verificationToken;
      await tokenDocument.save();
    } else {
      await new Tokens({ id: admin._id, token: verificationToken }).save();
    }

    await sendVerificationEmail(admin._id, admin.email, admin.name, verificationToken, 'admin');
    res.status(200).json({ message: "If user with this email exists, a verification email has been sent." })

  } catch (error) {
    res.status(500).json({ message: error.message || "An error occured on the servere." });
  }
};


exports.verifyAdminEmail = async (req, res) => {
  const { userId, token } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ message: "Invalid link..." });
  }

  try {
    const admin = await Admin.findOne({ _id: userId })
    if (admin.verified === true && admin.emailVerified === true) {
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
    await Admin.findByIdAndUpdate(userId, { verified: true, emailVerified: true })
    await Tokens.deleteOne({ id: userId });
    res.status(200).json({ message: "Email verified successfully." });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Email verification link has expired." });
    }
    res.status(500).json({ message: "An error occured on server." });
  }


};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log("Login attempt:", { email, password });

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ email });

    // console.log("admin:", admin);

    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    } else if (!admin.verified || !admin.emailVerified) {
      return res.status(400).json({ message: "Please verify your email before logging in or contact support." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        photo: admin.photo,
        created_at: admin.createdAt,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login with google..
exports.getCurrentAdmin = async (req, res) => {
  try {
    // console.log("Get current admin request:", req.isAuthenticated());

    // Check authentication
    if (!req.isAuthenticated() || !req.user) {
      return res
        .status(401)
        .json({ message: "Authentication request is unauthorized.." });
    }

    const {
      _id,
      name,
      email,
      photo,
      verified,
      emailVerified,
      createdAt,
    } = req.user;

    return res.json({
      id: _id,
      name,
      email,
      photo,
      verified,
      emailVerified,
      createdAt,
    });

  } catch (error) {
    console.error("Error in getCurrentAdmin:", error);
    res.status(500).json({
      message: "Internal server error while fetching current admin",
      error: error.message,
    });
  }
};



exports.getAdminDetails = async (req, res) => {
  try {
    const id = req.query.id;  // get id from query parameter

    if (!id) {
      return res.status(400).json({ message: "ID query parameter is required" });
    }

    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.accountActivationDeactivation = async (req, res) => {
  try {
    const { active, id } = req.body;

    if (!id || active === undefined) {
      return res.status(400).json({ message: "ID and state are required" });
    }

    let entity;
    let role;

    if (active === "admin") {
      entity = await Admin.findById(id);
      role = "Admin";
    } else {
      entity = await User.findById(id);
      role = "User";
    }

    if (!entity) {
      return res.status(404).json({ message: `${role} not found` });
    }

    const newStatus = !(entity.verified && entity.emailVerified);
    entity.verified = newStatus;
    entity.emailVerified = newStatus;

    await entity.save();

    const statusText = newStatus ? "activated" : "deactivated";
    return res.status(200).json({
      message: `${role} account successfully ${statusText}`,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
