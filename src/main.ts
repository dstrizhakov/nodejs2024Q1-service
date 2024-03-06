import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();

console.log(Date.now());
