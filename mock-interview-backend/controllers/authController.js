const passport = require("passport");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

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

            // Ensure session is saved to the store before redirecting. This avoids
            // a race where the redirect response is sent before the session is
            // persisted, which can cause subsequent requests (from the frontend)
            // to not find the authenticated session.
            req.session.save((saveErr) => {
                if (saveErr) {
                    console.error('Error saving session before redirect:', saveErr);
                    // Even if saving fails, redirect with token so the flow continues.
                } else {
                    console.log('Session saved before redirect, sessionID:', req.sessionID);
                }
                return res.redirect(`${process.env.FRONTEND_URL}/auth/loader?token=${token}`);
            });
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

// Verify a JWT (sent from the frontend after OAuth redirect) and return admin info.
exports.verifyTokenLogin = async (req, res) => {
    try {
        // Token may be sent in Authorization header or as query param `token`
        const authHeader = req.headers.authorization;
        let token = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (req.query && req.query.token) {
            token = req.query.token;
        }

        if (!token) return res.status(400).json({ message: 'Token is required' });

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const admin = await Admin.findById(payload.id).select('-password');
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        return res.status(200).json({
            id: admin._id,
            name: admin.name,
            email: admin.email,
            photo: admin.photo,
            created_at: admin.createdAt,
        });
    } catch (error) {
        console.error('Error in verifyTokenLogin:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
