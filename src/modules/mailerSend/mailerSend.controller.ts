import { Controller, Get, Param } from "@nestjs/common";
import { MailerSendService } from "./mailerSend.service";
import { User } from "../user/user.entity";

@Controller('mailerSend')
export class MailerSendController {
    constructor(
        private readonly mailerSendService: MailerSendService
    ) { }


    @Get(':id')
    async sendVerificationMailCode(@Param('id') id: string) {
        const verificationCode = await this.mailerSendService.sendVerificationMailCode(id);
        return verificationCode;
    }

    @Get(':id/:code')
    async verifyCode(
        @Param('id') id: string,
        @Param('code') code: number
    ):Promise<User> {
       return await this.mailerSendService.verifyCode(id, code);
    }


}