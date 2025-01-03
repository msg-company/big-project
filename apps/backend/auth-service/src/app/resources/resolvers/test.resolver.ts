import { Query, Resolver } from "@nestjs/graphql";
import { LoggerService } from "@repo/service-logger";

@Resolver()
export class TestResolver {
  constructor(private readonly logger: LoggerService) {}

  @Query(() => String)
  async test(): Promise<string> {
    this.logger.info("Test query executed", {
      timestamp: new Date().toISOString(),
      additionalInfo: "This is a test log",
    });
    return "Hello from auth-service!";
  }
}
