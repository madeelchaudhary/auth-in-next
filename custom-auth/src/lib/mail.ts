import { createTransport } from "nodemailer";

const host = process.env.MAIL_HOST;
const port = Number(process.env.MAIL_PORT);
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transport = createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transport.sendMail({
    from: "adeelch30@mailtrap.io",
    to,
    subject,
    html,
  });
};

export const sendVerificationEmail = async (to: string, token: string) => {
  const html = `
        <div>
        <h1>Verify your email address</h1>
        <p>Thanks for creating an account with us.</p>
        <p>Please use the following link to verify your email address</p>
        <p>This link will expire in 1 hour.</p>
        <a href="${process.env.NEXT_PUBLIC_URL}/verify-email/${token}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
        </div>
    `;

  await sendEmail(to, "Verify your email address", html);
};

export const sendResetPasswordEmail = async (to: string, token: string) => {
  const html = `
            <div>
            <h1>Reset your password</h1>
            <p>Please use the following link to reset your password</p>
            <p>This link will expire in 1 hour.</p>
            <a href="${process.env.NEXT_PUBLIC_URL}/reset-password/${token}">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            </div>
        `;

  await sendEmail(to, "Reset your password", html);
};
