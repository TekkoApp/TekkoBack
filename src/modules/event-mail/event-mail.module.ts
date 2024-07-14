import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerSendModule } from '../mailerSend/mailerSend.module';
import { InformationToSendForEmail, MailerSendService } from '../mailerSend/mailerSend.service';


export interface InformationForNewUserMail {
    toEmail:string,
    subject:string,
    templateName:string,
    toName:string,
}
@Module({
  imports: [MailerSendModule],
})
export class EventMailModule {
  constructor(
    private readonly mailerSendService: MailerSendService,
  ) {
  }

  @OnEvent('user.created')
  handleUserCreatedEvent(userData: InformationForNewUserMail) {
    const informationToSend: InformationToSendForEmail = {
      to: userData.toEmail,
      subject: 'Tu usuario ha sido creado',
      templateName: 'welcomeUser',
      toName: userData.toName
    };

    this.mailerSendService.sendEmail(informationToSend);
  }

 
}
