import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  // Interceptor en la configuración global (@Exclude)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      // Elimina del payload los atributos que no esten definidos en el dto
      whitelist: true,
      // Rechaza la petición indicando que se envía un atributo que no es esperado
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
