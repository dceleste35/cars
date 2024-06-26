import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({ keys: ['dodo'] }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);

  await displayRoutes(app);
}

async function displayRoutes(app: INestApplication) {
    const server = app.getHttpServer();
    const router = server._events.request._router;
    const availableRoutes: [] = router.stack
        .map(layer => {
            if (layer.route) {
                return {
                route: { path: layer.route?.path, stack: layer.route.stack[0].method }
                };
            }
        })
        .filter(item => item !== undefined);
    console.log(availableRoutes);
}

bootstrap();
