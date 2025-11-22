const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.googleLogin = passport.authenticate("google", {
    scope: ["email", "profile"],
});

exports.googleCallback = (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            const errorMessage = encodeURIComponent(info.message);
            return res.redirect(
                `${process.env.FRONTEND_URL}/admin/login?error=${errorMessage}`
            );
        }
        req.logIn(user, (err) => {
            if (err) return next(err);

            // Debug logs to help confirm session creation and cookies in production
            try {
                console.log('Google callback - user:', {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                });
                console.log('Google callback - req.sessionID:', req.sessionID);
                console.log('Google callback - req.session (summary):', {
                    cookie: req.session?.cookie,
                    passport: req.session?.passport,
                });
                console.log('Google callback - request headers cookie:', req.headers.cookie);
            } catch (logErr) {
                console.error('Error logging session info:', logErr);
            }

            const token = jwt.sign(
                { id: user._id, email: user.email, name: user.name, verified: user.verified },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            return res.redirect(`${process.env.FRONTEND_URL}/auth/loader?token=${token}`);
        });
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);

        req.session.destroy((err) => {
            if (err) return next(err);

            res.clearCookie('connect.sid', { path: '/' });

            // Redirect to login page or home
            res.redirect(`${process.env.FRONTEND_URL}/admin/login`);
        });
    });
};
