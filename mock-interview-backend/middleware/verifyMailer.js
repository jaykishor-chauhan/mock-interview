const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (userId, userEmail, userName, verificationToken) => {
    const verificationLink = `http://localhost:8080/verification?token=${verificationToken}&id=${userId}`;

    const msg = {
        to: userEmail,
        from: process.env.FROM_EMAIL,
        subject: "Verify Your Email Address",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Email Verification</h2>
                <p>Hi ${userName},</p>
                <p>
                    Thank you for registering. Please click the link below to verify your email address.
                    <a href="${verificationLink}">Click here to verify your email</a>.
                    This link will expire in 15 minutes.
                </p>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Thanks,</p>
                <p>The Mock Interview Team</p>
            </div>
        `,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        if (error.response) {
            console.error("SendGrid Error:", error.response.body);
        } else {
            console.error("Unexpected Error:", error);
        }

        throw new Error("Failed to send verification email.");
    }
};

module.exports = {
    sendVerificationEmail,
};
