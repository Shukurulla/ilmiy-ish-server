const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Ilmiy Platforma" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error('Email yuborishda xatolik:', error.message);
    return false;
  }
};

const emailTemplates = {
  publicationSubmitted: (userName, pubTitle) => ({
    subject: 'Ishingiz tekshiruvga yuborildi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a56db;">Ilmiy Platforma</h2>
        <p>Hurmatli ${userName},</p>
        <p>Sizning <strong>"${pubTitle}"</strong> nomli ishingiz tekshiruvga yuborildi.</p>
        <p>Administrator tekshirib chiqgandan so'ng sizga xabar beramiz.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">Bu xabar avtomatik yuborilgan.</p>
      </div>
    `,
  }),

  publicationApproved: (userName, pubTitle) => ({
    subject: 'Ishingiz tasdiqlandi va nashr qilindi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a56db;">Ilmiy Platforma</h2>
        <p>Hurmatli ${userName},</p>
        <p>Sizning <strong>"${pubTitle}"</strong> nomli ishingiz tasdiqlandi va platformada nashr qilindi!</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">Bu xabar avtomatik yuborilgan.</p>
      </div>
    `,
  }),

  publicationRevision: (userName, pubTitle, comment) => ({
    subject: 'Ishingiz qayta ishlashga yuborildi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a56db;">Ilmiy Platforma</h2>
        <p>Hurmatli ${userName},</p>
        <p>Sizning <strong>"${pubTitle}"</strong> nomli ishingiz qayta ishlash uchun qaytarildi.</p>
        <p><strong>Izoh:</strong> ${comment}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">Bu xabar avtomatik yuborilgan.</p>
      </div>
    `,
  }),

  publicationRejected: (userName, pubTitle, comment) => ({
    subject: 'Ishingiz rad etildi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a56db;">Ilmiy Platforma</h2>
        <p>Hurmatli ${userName},</p>
        <p>Sizning <strong>"${pubTitle}"</strong> nomli ishingiz rad etildi.</p>
        <p><strong>Sabab:</strong> ${comment}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">Bu xabar avtomatik yuborilgan.</p>
      </div>
    `,
  }),

  newPublicationForReview: (adminName, authorName, pubTitle) => ({
    subject: 'Yangi ish tekshiruvga yuborildi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a56db;">Ilmiy Platforma - Admin</h2>
        <p>Hurmatli ${adminName},</p>
        <p><strong>${authorName}</strong> tomonidan <strong>"${pubTitle}"</strong> nomli yangi ish tekshiruvga yuborildi.</p>
        <p>Admin paneliga kirib tekshirib chiqing.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">Bu xabar avtomatik yuborilgan.</p>
      </div>
    `,
  }),
};

module.exports = { sendEmail, emailTemplates };
