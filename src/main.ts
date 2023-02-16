import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({transport: Transport.TCP, options: { port: 3001 }});
  const config = new DocumentBuilder().setTitle('HIRE PROGRAMMERS').setVersion('1.0').addTag('HIRE PROGRAMMERS').addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Bearer', in: 'Header' }, 'access-token',).build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
  await app.listen(3001, () => console.log('Client Microservice is listening port 3001'));
}
bootstrap();
