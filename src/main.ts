import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'
import { RolService } from './rol/rol.service';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const rols = app.get(RolService);
  rols.setRoles()
  const config = new DocumentBuilder()
    .addBearerAuth() 
    .setTitle('API Documentation')
    .setDescription('API description blog CABA DAVID')
    .setVersion('1.0')
    .addTag('items')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document,{
    explorer:true,
    swaggerOptions:{
      filter: true,
      showRequestDuration:true,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(8080,'0.0.0.0');
}
bootstrap();
