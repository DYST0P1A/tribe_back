const nodemailer = require("nodemailer");
require('dotenv').config();

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

const sendConfirmationEmail = function(name, email, confirmationCode) {
    transport.sendMail({
        from: '"Tribe" trib3.com@gmail.com',
        to: email,
        subject: "Por favor confirma tu cuenta",
        html: `<h1>Confirmación de email</h1>
          <h2>Hola ${name}</h2>
          <p>Gracias por registrarte. Por favor confirma tu cuenta clickando en el siguiente enlace</p>
          <a href=https://tribeback.herokuapp.com/api/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};

module.exports = {
    sendConfirmationEmail,
};