import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "./repositories/user.repository";
import { UsersResolver } from "./resolvers/users.resolver";
import { UsersService } from "./services/users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: "KAFKA_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "users-service",
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "users-consumer",
          },
        },
      },
    ]),
  ],
  providers: [UserRepository, UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
