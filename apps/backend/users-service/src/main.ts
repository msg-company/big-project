import { AppModule } from "./app/app.module";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 4206;
  await app.listen(port);

  const logger = new Logger("Bootstrap");
  logger.log(`🚀 Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();
