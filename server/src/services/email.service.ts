
const user = 'info@geovistory.org';
const pass = 'jagen731!murre';
import {createTransport} from 'nodemailer';
import {UrlBuilder} from '../utils/url-builder';

export class EmailService {

  constructor() {}

  transporter = createTransport({
    host: 'asmtp.mail.hostpoint.ch',
    port: 465,
    tls: {
      rejectUnauthorized: false,
    },
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  async sendEmailVerificationEmail(
    accountId: number,
    email: string,
    verificationToken: string
  ) {

    const url = new UrlBuilder().getBaseUrl();
    const link = `${url}/verify-email?accountId=${accountId}&verificationToken=${verificationToken}&redirectOnSuccess=${url}/email-verified`

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

    const url = new UrlBuilder().getBaseUrl();
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