// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'financetracker93@gmail.com',      
      pass: 'kwlc njnf dqof kedm',   
    },
  });

  async sendWelcomeEmail(email: string, name: string, uniqueCode: string) {
    await this.transporter.sendMail({
      from: '"Finance Tracker" <financetracker432@gmail.com>',
      to: email,
      subject: '🎉 Welcome to Finance Tracker!',
      html: `
        <h2>Hi ${name},</h2>
        <p>Welcome to Finance Tracker. We're excited to have you!</p>
        <p>Your unique login code is: <strong>${uniqueCode}</strong></p>
        <p>Use this code along with your email and password to log in.</p>
        <br/>
        <p>– The Finance Tracker Team</p>
      `,
    });
  }
  async sendPasswordResetEmail(email: string, resetLink: string) {
    await this.transporter.sendMail({
      to: email,
      subject: 'Reset your password',
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>This link will expire in 30 minutes.</p>

             If you did not request this, simply ignore this email and your password will remain unchanged.

             – Finance Tracker Security Team`,
    });
  }

  async sendLoginInfoEmail(email: string, uniqueCode: string) {
  await this.transporter.sendMail({
    to: email,
    subject: 'Your Account Login Info',
    text: ` Your password has been reset successfully.

    🔐 Your Login Code is ${uniqueCode}

   You can now log in using your email and new password and given Code.

 Regards,
-Finance Tracker Security Team`
  });
}
 async sendPasswordChangedEmail(email: string) {
    await this.transporter.sendMail({
      to: email,
      subject: 'Your password was changed',
      html: `
        <p>Hello,</p>
        <p>This is a confirmation that your password was changed just now.</p>
        <p>If you did not perform this action, please reset your password immediately or contact support.</p>
        <br/>
        <p>— Finance Tracker Security Team</p>
      `,
    });
  }
  
}
