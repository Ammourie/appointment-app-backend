import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Register global interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // Register global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Appointments API')
    .setDescription('API for managing appointments')
    .setVersion('1.0') // Optional: add tags for grouping
    .build();

  // Create the document (call the function, don't pass it)
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger with the actual document
  SwaggerModule.setup('api', app, document); // ✅ Passing the document object

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api`);
}

void bootstrap();
