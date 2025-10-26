// 📦 mail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuration du transporteur Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

// Fonction d'envoi d'email
async function sendCollaborationNotification(userEmail, description) {
  try {
    const info = await transporter.sendMail({
      from: `"Serveur Node 👨‍💻" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // adresse où tu reçois les notifications
      subject: 'Nouvelle collaboration & demande de CV',
      text: `Tu as reçu une nouvelle demande de collaboration de ${userEmail}`,
      html: `
        <h2>Nouvelle collaboration</h2>
        <p>L'utilisateur <strong>${userEmail}</strong> vient de te contacter.</p>
        <p><em>${description}</em></p>
      `
    });

    console.log('✅ Mail envoyé :', info.messageId);
  } catch (err) {
    console.error('❌ Erreur envoi mail :', err);
  }
}

export default sendCollaborationNotification;
