import { Module } from '@nestjs/common';
import { MailerSendService } from './mailerSend.service';

@Module({
  providers: [MailerSendService],
  exports: [MailerSendService],
})
export class MailerSendModule {}
