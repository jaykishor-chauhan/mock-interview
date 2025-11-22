// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendResetMail = async (userId, userEmail, userName, resetToken) => {
//     console.log("Sending Reset Email:", { userId, userEmail, userName });

//     const resetLink = `https://aipoweredmockinterview.netlify.app/new-password?token=${resetToken}&id=${userId}`;

//     const msg = {
//         to: userEmail,
//         from: process.env.FROM_EMAIL,
//         subject: "Password Reset Request",
//         html: `
//             <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//                 <h2>Password Reset Request</h2>
//                 <p>Hi ${userName},</p>

//                 <p>
//                     We received a request to reset your password. Click the link below to reset it:<br><br>
//                     <a href="${resetLink}" style="color: #1a73e8;">Reset Password</a>
//                 </p>

//                 <p>This link will expire in <strong>15 minutes</strong>.</p>

//                 <p>If you did not request a password reset, you can safely ignore this email.</p>

//                 <p>Thanks,<br>The Mock Interview Team</p>
//             </div>
//         `,
//     };

//     try {
//         await sgMail.send(msg);
//         console.log("Reset email sent successfully.");
//     } catch (error) {
//         console.error("SendGrid Error:", error.message);

//         if (error.response) {
//             console.error("SendGrid Response:", error.response.body);
//         }

//         throw new Error("Failed to send password reset email.");
//     }
// };

// module.exports = {
//     sendResetMail,
// };



const nodemailer = require("nodemailer");

const smtpHost = process.env.SMTP_HOST;
const smtpPort = parseInt(process.env.SMTP_PORT, 10) || 587;
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpHost) {
    console.warn("[resetMailer] WARNING: SMTP_HOST is not set. Mail may fail in production.");
}
if (!smtpUser || !smtpPass) {
    console.warn("[resetMailer] WARNING: SMTP_USER or SMTP_PASS not set. Attempting connection without auth (may be rejected).");
}

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure, // true for 465, false for other ports
    auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
    tls: {
        // In non-production environments you may need to allow self-signed certs.
        rejectUnauthorized: process.env.NODE_ENV === "production",
    },
});

// Verify transporter connectivity and auth at startup — this logs helpful info for debugging.
transporter.verify((err, success) => {
    if (err) {
        console.error("[resetMailer] SMTP verification failed:", err && err.message ? err.message : err);
    } else {
        console.log("[resetMailer] SMTP transporter verified");
    }
});

const sendResetMail = async (userId, userEmail, userName, resetToken) => {
    // console.log("ENV CHECK:", {
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     secure: process.env.SMTP_SECURE,
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS ? "SET" : "NOT SET",
    // });

    // console.log("Sending Reset Email via SMTP:", { userId, userEmail, userName });

    const resetLink = `${process.env.FRONTEND_URL}/new-password?token=${resetToken}`;

    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: userEmail,
        subject: `Password Reset Request - ${userId}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #333;">
                <p>Hi ${userName},</p>

                <p>
                    We received a request to reset your account password.  
                    Please use the link below to create a new one:
                </p>

                <p>
                    <a href="${resetLink}" style="color: #1a73e8; font-weight: 600;">
                        Reset Password
                    </a>
                </p>

                <p>
                    This link will remain valid for <strong>15 minutes</strong>.
                </p>

                <p>
                    If you did not request this, please ignore this message.  
                    Your account will remain secure.
                </p>

                <p style="margin-top: 25px;">
                    Regards,<br>
                    The Mock Interview Team
                </p>
            </div>
        `,

    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("[resetMailer] Reset Email Sent:", info && info.messageId ? info.messageId : info);
        return info;
    } catch (error) {
        console.error("[resetMailer] SMTP Error sending reset email:", error && error.message ? error.message : error);
        // Some providers include a response or response.body with details
        if (error.response) {
            console.error("[resetMailer] SMTP Response:", error.response);
        }
        if (error.stack) {
            console.error(error.stack);
        }
        throw new Error("Failed to send password reset email.");
    }
};

module.exports = { sendResetMail, transporter };
