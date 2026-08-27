import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");
  app.enableCors({
    origin: [
      process.env.NEXT_PUBLIC_STOREFRONT_URL ?? "http://localhost:3000",
      process.env.NEXT_PUBLIC_PORTAL_URL ?? "http://localhost:3001",
    ],
  });

  const port = process.env.API_PORT ?? 4000;
  await app.listen(port);
  console.log(`Legacy Hosting API running on http://localhost:${port}`);
}

bootstrap();
