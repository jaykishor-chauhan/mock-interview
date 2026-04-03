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







const nodemailer = require("nodemailer");

const fromAddress = process.env.MAIL_FROM || process.env.FROM_EMAIL;

const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "FRONTEND_URL"];

const getMissingEnvVars = () =>
    requiredEnvVars.filter((key) => !process.env[key] || String(process.env[key]).trim() === "");

const assertMailerConfigured = () => {
    const missingEnvVars = getMissingEnvVars();
    if (!fromAddress || String(fromAddress).trim() === "") {
        missingEnvVars.push("MAIL_FROM (or FROM_EMAIL)");
    }

    if (missingEnvVars.length > 0) {
        const message = `[verifyMailer] Email service misconfigured. Missing: ${missingEnvVars.join(", ")}`;
        console.error(message);
        const error = new Error("Email service is not configured");
        error.code = "MAILER_NOT_CONFIGURED";
        error.details = missingEnvVars;
        throw error;
    }
};

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,  
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // true for port 465
    auth: {
        user: process.env.SMTP_USER,   
        pass: process.env.SMTP_PASS,   
    },
});

const sendVerificationEmail = async (userId, userEmail, userName, verificationToken, role) => {
    assertMailerConfigured();
    const verificationLink = `${process.env.FRONTEND_URL}/verification?token=${verificationToken}&role=${role}&id=${userId}`;

    const mailOptions = {
        from: fromAddress,
        to: userEmail,
        subject: "Verify Your Email Address",
        html: `
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
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        // console.log("Verification email sent successfully.");
    } catch (error) {
        console.error("[verifyMailer] Nodemailer sendMail failed:", {
            message: error?.message,
            code: error?.code,
            command: error?.command,
            responseCode: error?.responseCode,
            response: error?.response,
        });
        throw new Error("Failed to send verification email.");
    }
};

module.exports = {
    sendVerificationEmail,
};
