import { Injectable } from '@nestjs/common';
import { MailerSend, Recipient, EmailParams, Sender } from 'mailersend';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { UserService } from '../user/user.service';

export interface InformationToSendForEmail {
    to:string,
    toName:string,
    subject:string,
    templateName:string,
    context?:any,
}

@Injectable()
export class MailerSendService {
  private mailersend: MailerSend;

  constructor(
    private readonly userService : UserService
  ) {
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
    const htmlContent = await this.loadTemplate(templatePath,  
      informationToSend.context
      // {name:informationToSend.toName}
    );

    
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


  async sendVerificationMailCode(userId: string):Promise<number>{
    try {
      const userToVerify = await this.userService.findOne(userId);
      if(userToVerify){
        const verificationCode = this.generateRandomCode();
        userToVerify.verificationCode = verificationCode;
        await this.userService.updateUserById(userId,userToVerify);
        const informationForEmail : InformationToSendForEmail = {
          subject:'Tu código de verificación de Tekko',
          templateName :'verificationEmail',
          to:userToVerify.email,
          toName:userToVerify.firstName,
          context:{
            name:userToVerify.firstName,
            verificationCode: verificationCode
          }
        }
        await this.sendEmail(informationForEmail);
        return verificationCode;
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  generateRandomCode():number{
    return Math.floor(1000+ Math.random()*9000);
  }

  async verifyCode(id: string, code: number): Promise<boolean> {
    try {
      const userToVerify = await this.userService.findOne(id);
      if (!userToVerify) {
        throw new Error(`User with ID ${id} doesn't exist`);
      }
      return userToVerify.verificationCode === +code;
    } catch (error) {
      throw new Error(`Error fetching user with ID ${id}: ${error.message}`);
    }
  }
  
  
}
