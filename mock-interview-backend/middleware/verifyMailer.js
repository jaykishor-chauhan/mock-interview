// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendVerificationEmail = async (userId, userEmail, userName, verificationToken, role) => {
//     const verificationLink = `${process.env.FRONTEND_URL}/verification?token=${verificationToken}&role=${role}&id=${userId}`;

//     const msg = {
//         to: userEmail,
//         from: process.env.FROM_EMAIL,
//         subject: "Verify Your Email Address",
//         html: `
//             <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//                 <h2>Email Verification</h2>
//                 <p>Hi ${userName},</p>
//                 <p>
//                     Thank you for registering. Please click the link below to verify your email address.
//                     <a href="${verificationLink}">Click here to verify your email</a>.
//                     This link will expire in 15 minutes.
//                 </p>
//                 <p>If you did not create an account, please ignore this email.</p>
//                 <p>Thanks,</p>
//                 <p>The Mock Interview Team</p>
//             </div>
//         `,
//     };

//     try {
//         await sgMail.send(msg);
//     } catch (error) {
//         if (error.response) {
//             console.error("SendGrid Error:", error.response.body);
//         } else {
//             console.error("Unexpected Error:", error);
//         }

//         throw new Error("Failed to send verification email.");
//     }
// };

// module.exports = {
//     sendVerificationEmail,
// };


const { sendEmail } = require("./emailClient");

const sendVerificationEmail = async (userId, userEmail, userName, verificationToken, role) => {
    const verificationLink = `${process.env.FRONTEND_URL}/verification?token=${verificationToken}&role=${role}&id=${userId}`;

    const subject = "Verify Your Email Address";
    const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Email Verification</h2>
                <p>Hi ${userName},</p>
                <p>
                    Thank you for registering. Please click the link below to verify your email address:
                </p>
                <p><a href="${verificationLink}">Click here to verify your email</a></p>
                <p>This link will expire in 15 minutes.</p>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Thanks,</p>
                <p>The Mock Interview Team</p>
            </div>
        `;

    try {
        await sendEmail({
            to: { email: userEmail, name: userName },
            subject,
            html,
        });
    } catch (error) {
        if (error?.code === "BREVO_API_ERROR") {
            console.error("[verifyMailer] Brevo API send failed:", {
                status: error?.status,
                responseBody: error?.responseBody,
            });
        } else {
            console.error("[verifyMailer] Email send failed:", {
                message: error?.message,
                code: error?.code,
                command: error?.command,
                responseCode: error?.responseCode,
                response: error?.response,
            });
        }
        throw new Error("Failed to send verification email.");
    }
};

module.exports = {
    sendVerificationEmail,
};
