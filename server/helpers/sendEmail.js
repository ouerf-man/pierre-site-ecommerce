const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const secrets = require("../utils/secrets");

const { SECRET_KEY, PASSWORD, FROM_EMAIL } = secrets.SMTP;

if (!SECRET_KEY || !PASSWORD) {
  console.log("Envirnoment not found!");
  return;
}

//const bytes = CryptoJS.AES.decrypt(PASSWORD, SECRET_KEY);
//const password = bytes.toString(CryptoJS.enc.Utf8);
const password = PASSWORD;
function sendEmail(to, subject, body, htmlBody) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.fr",
    port: 587,
    auth: {
      user: FROM_EMAIL,
      pass: password,
    },
  });

  const mailOptions = {
    from: `"Pierre Gassin" <${FROM_EMAIL}>`,
    to,
    subject,
    text: body,
    html: htmlBody,
  };

  return new Promise((resolve) => {
    transporter
      .sendMail(mailOptions)
      .then((info) => {
        console.log("Message sent: %s", info.messageId);
        return resolve(true);
      })
      .catch((err) => {
        console.log("Mail sending failed", err);
        return resolve(false);
      });
  });
}

module.exports = {
  sendEmail,
};
