import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      name: "Neuzy",
      link: "http://localhost:8888",
      copyright: "Copyright © 2024 Neuzy. All rights reserved.",
    },
  });

  const emailHTML = mailGenerator.generate(options.mailgenContent);
  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_MAIL_HOST,
      port: process.env.NODEMAILER_MAIL_PORT,
      auth: {
        user: process.env.NODEMAILER_MAIL_USER,
        pass: NODEMAILER_MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.NODEMAILER_MAIL_HOST,
      to: options.email,
      subject: options.subject,
      text: emailText,
      html: emailHTML,
    });
  } catch (error) {
    console.log("Email not send");
  }
};

const forgotPasswordMailgenContent = (username, resetPasswordURL) => {
  return {
    body: {
      name: username,
      intro:
        "You have received this email because a password reset request for your account was received.",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#EE3266",
          text: "Reset your password",
          link: resetPasswordURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { sendEmail, forgotPasswordMailgenContent };
