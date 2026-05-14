import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function send({ email, subject, html }) {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  });
}

function sendActivationEmail(email, token) {
  const href = `${process.env.SERVER_HOST}/activation/${token}`;
  const html = `
  <h2>Activate account</h1>
  <a href="${href}">${href}</a>
  `;

  send({
    email,
    html,
    subject: 'Activate your account!',
  });
}

export const emailService = {
  sendActivationEmail,
  send,
};
