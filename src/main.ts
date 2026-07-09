import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000);

  const url = await app.getUrl();

  Logger.log(`🚀 API running at ${url}`, 'Bootstrap');
}
bootstrap();
