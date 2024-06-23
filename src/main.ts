import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

const logger: Logger = new Logger('Main');
const port = process.env.PORT || 8001;
dotenv.config();

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(bodyParser.json({ limit: '150mb' }));
  app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));

  app.enableCors({
    origin: [
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // si necesitas enviar cookies u otros headers de autenticación
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (): BadRequestException => new BadRequestException('Validation error'),
    }),
  );

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
