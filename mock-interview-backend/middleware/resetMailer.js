const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendPasswordResetEmail = async (userId, userEmail, userName, resetToken) => {

    const resetLink = `http://localhost:8080/new-password?token=${resetToken}&id=${userId}`;

    const msg = {
        to: userEmail,
        from: process.env.FROM_EMAIL,
        subject: "Your Password Reset Link",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Password Reset Request</h2>
            <p>Hi ${userName},</p>
            <p>We received a request to reset your password. 
                Please click <a href="${resetLink}">here to reset your password</a>. 
                This link will expire in 15 minutes.
            </p>

            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thanks,</p>
            <p>The Mock Interview Team</p>
        </div>
        `,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {

        if (error.response) {
            console.error(error.response.body);
        }
        throw new Error("Failed to send password reset email.");
    }
};

module.exports = {
    sendPasswordResetEmail,
};
