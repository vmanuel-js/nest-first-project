import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UsersModule } from './users/users.module.js';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS Project')
    .setDescription('Nestjs API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
