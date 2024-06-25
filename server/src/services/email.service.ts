
import {createTransport} from 'nodemailer';
import {env} from '../utils/env-vars';

export class EmailService {

  constructor() { }

  transporter = createTransport({
    host: process.env.GEOV_EMAIL_HOST,
    port: parseInt(process.env.GEOV_EMAIL_PORT ?? ''),
    tls: {
      rejectUnauthorized: false,
    },
    secure: true,
    auth: {
      user: process.env.GEOV_EMAIL_ADDRESS,
      pass: process.env.GEOV_EMAIL_PASSWORD,
    },
  });

  async sendEmailVerificationEmail(
    accountId: number,
    email: string,
    verificationToken: string
  ) {

    const serverUrl = env.SERVER_URL;
    const clientUrl = env.CLIENT_URL;
    const link = `${serverUrl}/verify-email?accountId=${accountId}&verificationToken=${verificationToken}&redirectOnSuccess=${clientUrl}/email-verified`

    // send mail with defined transport object
    return this.transporter.sendMail({
      from: '"Geovistory" <noreply@geovistory.com>', // sender address
      to: email, // list of receivers
      subject: "Geovistory – Please verify your email address", // Subject line
      text: `Please open this link to verify your email address: ${link}`, // plain text body
      html: `Please open this link to verify your email address: <a href="${link}">verify email</a>`, // html body
    });

  }


  async sendResetPaswortEmail(
    email: string,
    passwordResetToken: string
  ) {

    const url = env.CLIENT_URL;
    const link = `${url}/reset-password?access_token=${passwordResetToken}`

    // send mail with defined transport object
    return this.transporter.sendMail({
      from: '"Geovistory" <noreply@geovistory.com>', // sender address
      to: email, // list of receivers
      subject: "Geovistory – Password reset", // Subject line
      text: `Open this link to reset your password: ${link}`, // plain text body
      html: `Click <a href="${link}">here</a> to reset your password.`, // html body
    });

  }
}
