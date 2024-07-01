// import { Module } from '@nestjs/common';
// import { OnEvent } from '@nestjs/event-emitter';
// import { format } from 'date-fns';
// import * as sgMail from '@sendgrid/mail';
// import { SendGridModule } from './../sendGrid/sendGrid.module';
// import { SendGridService } from './../sendGrid/sendGrid.service';
// import { InformationToSendForEmail } from './../utils/mailsInterfaces';
// import { formatDate } from 'src/utils/random.codes';
// import { BookingEmailDTO } from 'src/mail/dto/BookingEmailDTO.dto';

// @Module({
//   imports: [SendGridModule],
// })
// export class EventMailModule {
//   constructor(
//     private readonly sendGridService: SendGridService,
//   ) {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   }

//   @OnEvent('user.created')
//   handleUserCreatedEvent(userData: any) {
//     const informationToSend: InformationToSendForEmail = {
//       to: userData.email,
//       subject: 'Tu usuario ha sido creado',
//       template: 'welcomeUser',
//     };

//     const context = {
//       name: userData.name,
//       email: informationToSend.to,
//       password: userData.password,
//     };
//     this.sendGridService.sendEmail(informationToSend, context);
//   }

//   @OnEvent('giftcard.created')
//   handleGiftCardEvent(giftcard: any) {
//     const informationToSend: InformationToSendForEmail = {
//       to: giftcard.emailTo,
//       subject: 'Has recibido un regalo',
//       template: 'giftcard',
//       pdfTemplate:'giftCardPdf',
//     };

//     const context = {
//       to:giftcard.toName,
//       from:giftcard.from,
//       message:giftcard.message,
//       localizador:giftcard.localizador,
//       codigo:giftcard.codigo,
//       quantity:giftcard.quantity,
//       toDate:formatDate(giftcard.to),
//       courseTitle:giftcard.courseTitle,
//       courseMessage:giftcard.courseMessage
//     };

//     this.sendGridService.sendEmail(informationToSend, context,true);
//   }

//   @OnEvent('buy.voucher')
//   handleVoucherCreated(voucher: any,courseInformation:any) {
//     const dateFormat = format(new Date(voucher.expiryDate), 'dd/MM/yyyy');

//     const informationToSend: InformationToSendForEmail = {
//       to: voucher.buyer.email,
//       subject: 'Tu bono esta confirmado',
//       template: 'paymentsuccess',
//       pdfTemplate:'voucherPdf',
//     };

//     const context = {
//       buyerName: voucher.buyer.name,
//       tracker: voucher.tracker,
//       code: voucher.code,
//       expiryDate: dateFormat,
//       courseMessage: courseInformation.courseMessage,
//       courseTitle:courseInformation.courseTitle,
//       quantity:voucher.seatsQty,
//     };

//     if(voucher.buyer.email && context.courseTitle){
//       this.sendGridService.sendEmail(informationToSend, context,true);
//     }
//   }

//   @OnEvent('booking.lesson')
//   handleBooking(bookingDto: any) {
//     const dateFormat = format(
//       new Date(bookingDto.lesson.lessonDate),
//       'dd/MM/yyyy',
//     );

//     const informationToSend: InformationToSendForEmail = {
//       to: bookingDto.client.email,
//       subject: 'Tu reserva ha sido confirmada',
//       template: 'bookingConfirmed',
//     };

//     const context = {
//       name: bookingDto.client.name,
//       course: bookingDto.lesson.course.title,
//       date: dateFormat,
//       startHs: bookingDto.lesson.startHour,
//       finishHs: bookingDto.lesson.finishHour,
//       confirmationText: bookingDto.lesson.course.confirmationText,
//       quantity:bookingDto.voucher.seatsQty
//     };

//     this.sendGridService.sendEmail(informationToSend, context);
//   }

//   @OnEvent('booking.lesson.mail')
//   handleSendMail(bookingDto: BookingEmailDTO) {
 
//     const informationToSend: InformationToSendForEmail = {
//       to: bookingDto.to,
//       subject: 'Tu reserva ha sido confirmada',
//       template: 'bookingConfirmed',
//     };

//     const context = {
//       name: bookingDto.name,
//       course: bookingDto.course,
//       date: bookingDto.date,
//       startHs: bookingDto.startHs,
//       finishHs: bookingDto.finishHs,
//       confirmationText: bookingDto.confirmationText,
//       quantity:bookingDto.quantity
//     };

//     this.sendGridService.sendEmail(informationToSend, context);
//   }


//   @OnEvent('gift.lesson')
//   handleBookingAndGift(bookingDto: any,giftData:any) {
//     const dateFormat = format(
//       new Date(bookingDto.lesson.lessonDate),
//       'dd/MM/yyyy',
//     );

//     const informationToSend: InformationToSendForEmail = {
//       to: giftData.emailTo,
//       subject: 'Has recibido un regalo',
//       template: 'giftLesson',
//       pdfTemplate:'giftCardPdfLesson',
//     };

//     const context = {
//       message:giftData.message,
//       from:giftData.from,
//       name: giftData.toName,
//       course: bookingDto.lesson.course.title,
//       date: dateFormat,
//       startHs: bookingDto.lesson.startHour,
//       tracker:bookingDto.voucher.tracker,
//       code:bookingDto.voucher.code,
//       quantity:giftData.quantity,
//       toDate:formatDate(bookingDto.lesson.lessonDate),
//       courseMessage:giftData.courseMessage,
//       seatsQuantity:giftData.seatsQuantity
//     };

//     this.sendGridService.sendEmail(informationToSend, context,true);
//   }
// }
