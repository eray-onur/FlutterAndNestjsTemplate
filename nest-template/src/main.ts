import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { ClusterService } from './common/services/cluster.service';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors();

  // OpenAPI Integration
  const config = new DocumentBuilder()
  .setTitle('Nest.JS Template')
  .setDescription('Template API Description')
  .setVersion('0.1')
  .build();

  const authDocument = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
    include: [AuthModule, UserModule]
  });
  SwaggerModule.setup('api', app, authDocument);

  await app.listen(3000);
}

// Commented out because of compatibility issues with Swagger.
// In production mode, make sure to comment swagger document builder instead.
//ClusterService.register(bootstrap);

bootstrap();