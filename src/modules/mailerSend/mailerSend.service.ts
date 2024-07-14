import { Injectable } from '@nestjs/common';
import { MailerSend, Recipient, EmailParams, Sender } from 'mailersend';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as handlebars from 'handlebars';

export interface InformationToSendForEmail {
    to:string,
    toName:string,
    subject:string,
    templateName:string,
}

@Injectable()
export class MailerSendService {
  private mailersend: MailerSend;

  constructor() {
    this.mailersend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });
  }

  async sendEmail(informationToSend:InformationToSendForEmail): Promise<void> {
    const recipients = [new Recipient(informationToSend.to, informationToSend.toName)];

    const templatePath = path.join(
        process.env.NODE_ENV === 'production' ? 'dist' : 'src',
        'modules',
        'mail',
        'templates',
        `${informationToSend.templateName}.hbs`,
      );
    const htmlContent = await this.loadTemplate(templatePath, {name:informationToSend.toName});

    
    const sender: Sender = {
      email: 'contact@tekko.com.ar',
      name: 'Tekko',
    };

    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject(informationToSend.subject)
      .setHtml(htmlContent)

    try {
      await this.mailersend.email.send(emailParams);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }


  private async loadTemplate(
    templatePath: string,
    context: Record<string, any>,
  ): Promise<string> {
    try {
      const content = await fs.readFile(templatePath, 'utf-8');

      const template = handlebars.compile(content);
      return template(context);
    } catch (error) {
      console.error('Error loading template:', error);
      throw error;
    }
  }
}
