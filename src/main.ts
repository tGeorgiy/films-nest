import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Films API')
    .setDescription('The films API description')
    .setVersion('1.0')
    .addTag('films')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
