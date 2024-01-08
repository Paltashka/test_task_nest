import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation for all routes
  app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
    .setTitle('Test task Swagger documentation')
    .setDescription('Description of 3 routes of tesk task')
    .setVersion('1.0')
    .build();
		
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
