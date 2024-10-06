import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(express.static("."))
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("API_Movie")
    .setDescription(`Final Project CyberSoft Academy`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api", app, document);

  await app.listen(8080, '0.0.0.0');
}
bootstrap();
