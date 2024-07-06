import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto']) {
      req.protocol = req.headers['x-forwarded-proto'] as string;
    }
    next();
  });

  await app.listen(3000);
}
bootstrap();
