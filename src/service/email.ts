import { IAuthProvider } from '../modules/auth/models';

import nodemailer from 'nodemailer';
import { fromString, htmlToText } from 'html-to-text';
import pug from 'pug';
import { environment } from '../environment';

interface IEmail {
  to: string;
  url: string;
  from: string;
  firstName: string;
}

export default class Email implements IEmail {
  to: string;
  url: string;
  from: string;
  firstName: string;
  constructor(user: IAuthProvider, url: string) {
    this.to = user.email;
    // TODO SLUG NAME CAMELCAZE
    this.firstName = user.userName.split(' ')[0];
    this.url = url;
    this.from = `EvoStore ${environment.emailFrom}`;
  }
  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   return nodemailer.createTransport({
    //     service: 'SendGrid',
    //     auth: {
    //       user: process.env.SENDGRID_USERNAME,
    //       pass: process.env.SENDGRID_PASSWORD,
    //     },
    //   });
    // }

    return nodemailer.createTransport({
      host: environment.emailHost,
      port: environment.emailPort,
      auth: {
        user: environment.emailUser,
        pass: environment.emailPass,
      },
    });
  }
  // Send the actual email
  async send(template: string, options: any) {
    // Render HTML based on pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject: options.subject,
        info: options.info,
      }
    );

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: options.subject,
      attachments: options.attachments,
      html,
      text: htmlToText(html),
    };

    //Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome(code: Number) {
    await this.send('welcome', {
      subject: `Welcome to the EvoStore! Your code ${code}`,
    });
  }
  async sendPasswordReset() {
    await this.send('passwordReset', {
      subject: 'Your password reset token (valid for only 10 minutes)',
    });
  }
  // async sendFiles({ items }) {
  //   const files = [];

  //   items.forEach((file) => {
  //     files.push({
  //       filename: file.filename,
  //       path: file.path,
  //     });
  //   });

  //   // TODO subject, Info
  //   await this.send('welcome', { subject: 'Files', attachments: files });
  // }
}
