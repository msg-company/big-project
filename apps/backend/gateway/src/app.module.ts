import { GraphQLDataSourceProcessOptions, IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { GraphQLDataSourceRequestKind } from "@apollo/gateway/dist/datasources/types";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { NestGatewayEnvService } from "@repo/env-config";
import * as path from "path";
import { DiscoveryModule } from "@repo/service-discovery";

export class GraphQLDataSource extends RemoteGraphQLDataSource {
  didReceiveResponse({ response, context }): typeof response {
    const cookies = response.http.headers?.raw()["set-cookie"] as string[] | null;
    if (cookies) {
      context?.req.res.append("set-cookie", cookies);
    }
    return response;
  }

  willSendRequest(params: GraphQLDataSourceProcessOptions) {
    const { request, kind } = params;
    if (kind === GraphQLDataSourceRequestKind.INCOMING_OPERATION) {
      const headers = params?.incomingRequestContext.request.http.headers;
      for (const [key, value] of headers) {
        request.http.headers.set(key, String(value));
      }
    }
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}`)],
    }),
    DiscoveryModule.forRoot({
      serviceId: "gateway",
      consulHost: "localhost",
      consulPort: 8500,
      healthCheckServices: ["memory", "nestjs", "disk"],
      healthEndpoint: "http://localhost:4200/health",
      dependencies: ["users-service", "auth-service"],
    }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        formatError: error => {
          // Форматирование ошибки перед отправкой клиенту
          return {
            message: error.message,
            code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
            extensions: {
              code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
              message: error.extensions?.message,
            },
          };
        },
        plugins: [ApolloServerPluginLandingPageLocalDefault({ includeCookies: true })],
        playground: false,
        context: ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res,
        }),
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: "auth-service", url: "http://localhost:4202/graphql" },
            { name: "users-service", url: "http://localhost:4206/graphql" },
          ],
        }),
        buildService: ({ url }) => new GraphQLDataSource({ url }),
      },
    }),
  ],
  controllers: [],
  providers: [NestGatewayEnvService],
})
export class AppModule {}
