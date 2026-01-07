const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: parseInt(process.env.MAILER_PORT) || 1025,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: process.env.MAILER_USERNAME
    ? {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD,
      }
    : null,
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    console.log("Email envoyé avec succès ! ID: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Erreur détaillée du Mailer:", error);
    return false;
  }
};

module.exports = { sendEmail };
