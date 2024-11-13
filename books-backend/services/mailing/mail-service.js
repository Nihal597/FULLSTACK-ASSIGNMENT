import nodemailer from "nodemailer";

export const sendEmail = async (name, emailId, pwdRecoveryURL) => {

  const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure: process.env.MAILSECURE === 'true',
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASS,
    },
  });

  //   transport object to send mail
  const messageInfo = await transporter.sendMail({
    from: '"Book Exchange Support" <support@bookexchange.com>',
    to: [{ address: emailId, name }],
    subject: "Password Reset - Book Exchange",
    text: "This is an email for restting password",
    html: `<b>Please click to reset password <a href="${pwdRecoveryURL}">Reset password</a> </b>`
  });
}
