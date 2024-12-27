import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { UsersService } from "../services/users.service";

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity, { nullable: true })
  async getUserById(@Args("id") id: string): Promise<UserEntity | null> {
    return this.usersService.findUserById(id);
  }

  @Query(() => UserEntity, { nullable: true })
  async getUserByUsername(@Args("username") username: string): Promise<UserEntity | null> {
    return this.usersService.findUserByUsername(username);
  }

  @Mutation(() => UserEntity)
  async createUser(@Args("createUserInput") createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(createUserDto);
  }
}
