const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

connectDB();

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL })); // frontend allowed
app.use(express.json());

// ---------------------- SESSION + PASSPORT ----------------------

require("./googleAuth2")(); // loads GoogleStrategy

// When running behind a proxy (Render, Cloudflare), enable trust proxy so
// Express knows the original connection is secure and can set secure cookies.
app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ---------------------- ROUTES ----------------------
app.use("/auth", require("./routes/googleAuth")); // Google login routes
app.use("/api", require("./routes/user")); // your normal APIs
app.use("/api/admin", require("./routes/adminRoutes")); // admin routes
app.use("/api/authentication/", require("./routes/authReset")); // password reset routes


// ---------------------- SERVER ----------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
