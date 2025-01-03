import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";

@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const gqlHost = GqlArgumentsHost.create(host);
    return exception;
  }
}
