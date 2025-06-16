const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  transporter.sendMail(
    {
      from: process.env.EMAIL_AUTH_USER, //'"Welcome Mail 👻"<email.com>'
      to,
      subject,
      html,
    },
    (err, info) => {
      if (err) return console.log(err);
      console.log("Email sent successfully", info.response);
    }
  );
};

module.exports = sendEmail;
