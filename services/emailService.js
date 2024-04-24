import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendEmail = async (email, subject, text) => {
  const info = await transporter.sendMail({
    from: process.env.MAIL,
    to: 'leonovserhii89@gmail.com',
    subject: `${subject}`,
    text: `${text}`,
    html: `<b>${text}</b>`,
  });

  console.log(info.messageId);
};
