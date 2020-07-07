
const user = 'info@geovistory.org';
const pass = 'jagen731!murre';
import { createTransport } from 'nodemailer'
import { inject } from '@loopback/core';
import { RestServer } from '@loopback/rest';

export class EmailService {

  constructor(
    @inject('servers.RestServer') protected restserver: RestServer
  ) { }

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
    userId: number,
    email: string,
    verificationToken: string
  ) {

    const url = this.restserver.rootUrl
    const link = `${url}/verify-email?userId=${userId}&verificationToken=${verificationToken}&redirectOnSuccess=${url}/email-verified`

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

    const url = this.restserver.rootUrl
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
