import { Module } from '@nestjs/common';
import { MailerSendService } from './mailerSend.service';
import { UserModule } from '../user/user.module';
import { MailerSendController } from './mailerSend.controller';

@Module({
  imports:[UserModule],
  controllers:[MailerSendController],
  providers: [MailerSendService],
  exports: [MailerSendService],
})
export class MailerSendModule {}
