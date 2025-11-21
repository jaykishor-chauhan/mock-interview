const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

function setupGoogleAuth() {

  const callbackUrl = process.env.GOOGLE_CALLBACK_URL || "https://mockinterview-ymzx.onrender.com/auth/google/callback";
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackUrl,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const admin = await Admin.findOne({ email: profile.emails[0].value });

          if (admin) {
            const isMatch = await bcrypt.compare(profile.id, admin.password);
            if (!isMatch) {
              return done(null, false, {
                message: `We ran into an unexpected issue.`,
              });
            }

            if (!admin.emailVerified) {
              return done(null, false, {
                message: `An unexpected error has occurred. Contact our team to help resolve the issue.`,
              });
            }
            if (!admin.verified) {
              return done(null, false, {
                message: `Access denied for security reasons. Please contact support for assistance.`,
              });
            }

            return done(null, admin);
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(profile.id, salt);
            const newAdmin = new Admin({
              email: profile.emails[0].value,
              name: profile.displayName,
              password: hashedPassword,
              source: profile.provider,
              photo: profile.photos[0].value,
              verified: profile.verified,
              emailVerified: profile.email_verified,
            });
            await newAdmin.save();
            return done(null, newAdmin);
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.findById(id);
      done(null, admin);
    } catch (error) {
      done(error, null);
    }
  });
}

module.exports = setupGoogleAuth;
