import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
  auth: {
    user: "nihal1491@gmail.com",
    pass: "abc123",
  },
});

export const sendEmail = async (name, emailId, pwdRecoveryURL) => {
  //   transport object to send mail
  const messageInfo = await transporter.sendMail({
    from: '"Book Exchange Support" <support@bookexchange.com>',
    to: [{ address: emailId, name }],
    subject: "Password Reset - Book Exchange",
    text: "This is an email for restting password",
    html: `<b>Please click to reset password <a href="${pwdRecoveryURL}">Reset password</a> </b>`
  });
}
