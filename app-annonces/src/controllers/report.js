const mailer = require("../utils/mailer");
const { sendEmail } = require('../utils/mailer');

exports.createReport = async (req, res) => {
  try {
    const { message, annonce_id } = req.body;
    const reporter_email = req.user.email;

    const newReport = await Report.create({
      reporter_email,
      message,
      annonce_id,
    });

    await sendEmail(
      process.env.MAIL_ADMIN,
      `NOUVEAU SIGNALEMENT : Annonce #${annonce_id}`,
      `L'utilisateur ${reporter_email} a signalé une annonce.\nMessage : ${message}`
    );

    res
      .status(201)
      .json({ message: "Signalement enregistré et admin notifié" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
