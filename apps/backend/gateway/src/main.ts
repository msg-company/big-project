import { NestFactory } from "@nestjs/core";
import { NestGatewayEnvService } from "@repo/env-config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(NestGatewayEnvService);
  const port = envService.get("PORT");

  await app.listen(port, () => {
    console.log(`Gateway service running on port ${port}`);
  });
}

bootstrap();
