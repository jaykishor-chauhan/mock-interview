const nodemailer = require("nodemailer");

const parseMailFrom = (mailFrom) => {
    if (!mailFrom) return null;

    // Supports:
    // - "Name <email@domain.com>"
    // - "email@domain.com"
    // - '"Name" <email@domain.com>'
    const trimmed = String(mailFrom).trim();
    if (!trimmed) return null;

    const match = trimmed.match(/^\s*"?([^<"]+)"?\s*<\s*([^>\s]+)\s*>\s*$/);
    if (match) {
        return { name: match[1].trim(), email: match[2].trim() };
    }

    // Fallback: treat entire value as email
    return { name: undefined, email: trimmed.replace(/^"|"$/g, "").trim() };
};

const sendEmailViaBrevoApi = async ({
    apiKey,
    from,
    to,
    subject,
    html,
    timeoutMs = 15000,
}) => {
    if (!globalThis.fetch) {
        throw new Error("Global fetch is not available in this Node runtime");
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const payload = {
            sender: {
                email: from.email,
                ...(from.name ? { name: from.name } : {}),
            },
            to: [{ email: to.email, ...(to.name ? { name: to.name } : {}) }],
            subject,
            htmlContent: html,
        };

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": apiKey,
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });

        if (!response.ok) {
            let responseBody;
            try {
                responseBody = await response.json();
            } catch {
                responseBody = await response.text();
            }

            const error = new Error("Brevo API request failed");
            error.code = "BREVO_API_ERROR";
            error.status = response.status;
            error.responseBody = responseBody;
            throw error;
        }

        return await response.json();
    } finally {
        clearTimeout(timer);
    }
};

const sendEmailViaSmtp = async ({ smtp, fromAddress, to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
            user: smtp.user,
            pass: smtp.pass,
        },
    });

    return transporter.sendMail({
        from: fromAddress,
        to: to.email,
        subject,
        html,
    });
};

/**
 * Send email using Brevo API when BREVO_API_KEY is set; otherwise fall back to SMTP.
 */
const sendEmail = async ({ to, subject, html }) => {
    const fromAddressRaw = process.env.MAIL_FROM || process.env.FROM_EMAIL;
    const fromParsed = parseMailFrom(fromAddressRaw);

    if (!fromParsed?.email) {
        const error = new Error("Email service is not configured");
        error.code = "MAILER_NOT_CONFIGURED";
        error.details = ["MAIL_FROM (or FROM_EMAIL)"];
        throw error;
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (brevoApiKey && String(brevoApiKey).trim() !== "") {
        return sendEmailViaBrevoApi({
            apiKey: brevoApiKey,
            from: fromParsed,
            to,
            subject,
            html,
        });
    }

    const smtpMissing = [
        ["SMTP_HOST", process.env.SMTP_HOST],
        ["SMTP_PORT", process.env.SMTP_PORT],
        ["SMTP_USER", process.env.SMTP_USER],
        ["SMTP_PASS", process.env.SMTP_PASS],
    ]
        .filter(([, value]) => !value || String(value).trim() === "")
        .map(([key]) => key);

    if (smtpMissing.length > 0) {
        const error = new Error("Email service is not configured");
        error.code = "MAILER_NOT_CONFIGURED";
        error.details = smtpMissing;
        throw error;
    }

    return sendEmailViaSmtp({
        smtp: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        fromAddress: fromAddressRaw,
        to,
        subject,
        html,
    });
};

module.exports = {
    sendEmail,
    parseMailFrom,
};
