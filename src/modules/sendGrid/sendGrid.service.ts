// import { Injectable } from '@nestjs/common';
// import * as fs from 'fs/promises';
// import * as path from 'path';
// import * as sgMail from '@sendgrid/mail';
// import * as handlebars from 'handlebars';
// // import { InformationToSendForEmail } from 'src/utils/mailsInterfaces';
// import * as pdf from 'html-pdf';

// @Injectable()
// export class SendGridService {
//   constructor() {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   }

//   async sendEmail(
//     informationToSend: InformationToSendForEmail,
//     context: any,
//     includeAttachments?: boolean,
//   ): Promise<void> {
//     try {
//       const templatePath = path.join(
//         process.env.NODE_ENV === 'production' ? 'dist' : 'src',
//         'mail',
//         'templates',
//         `${informationToSend.template}.hbs`,
//       );
//       const html = await this.loadTemplate(templatePath, context);

//       const msg: any = {
//         to: informationToSend.to,
//         from: 'aviso@muerdete.com',
//         subject: informationToSend.subject,
//         html,
//       };

//       if (includeAttachments) {
//         const pdfPath = path.join(
//           process.env.NODE_ENV === 'production' ? 'dist' : 'src',
//           'mail',
//           'templates',
//           `${informationToSend.pdfTemplate}.hbs`,
//         );
//         const pdftToAttach = await this.loadTemplate(pdfPath, context)
//         const options = { format: 'A4', border: { top: '0px', right: '0px', bottom: '0px', left: '0px' } };
//         const childProcessOptions = { env: { OPENSSL_CONF: '/dev/null' } };
        
//         const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
//           pdf.create(pdftToAttach, {
//             ...options,
//             childProcessOptions: childProcessOptions
//           }).toBuffer((err, buffer) => {
//             if (err) reject(err);
//             else resolve(buffer);
//           });
//         });

//         msg.attachments = [
//           {
//             content: pdfBuffer.toString('base64'),
//             filename: 'muerdete-gift-card.pdf',
//             type: 'application/pdf',
//             disposition: 'attachment',
//           },
//         ];
//       }

//       await sgMail.send(msg);
//       console.log(`Email enviado a ${informationToSend.to}`);
//     } catch (error) {
//       console.error('Error sending email:', error);
//       throw error;
//     }
//   }

//   private async loadTemplate(
//     templatePath: string,
//     context: Record<string, any>,
//   ): Promise<string> {
//     try {
//       const content = await fs.readFile(templatePath, 'utf-8');

//       const template = handlebars.compile(content);
//       return template(context);
//     } catch (error) {
//       console.error('Error loading template:', error);
//       throw error;
//     }
//   }


// }
