import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);
  const port = appService.getPort();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('URL-SHORTENER')
    .setDescription('A simple URL shortener API built with NestJS, Mongoose, and MongoDB. The API offers user registration, login, URL encoding (shortening), and decoding.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
