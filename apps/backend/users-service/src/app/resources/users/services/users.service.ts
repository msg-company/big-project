import { ConflictException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import * as argon from "argon2";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, email, password, ...userData } = createUserDto;

    // Проверка уникальности username и email
    const existingUserByUsername = await this.userRepository.findByUsername(username);
    const existingUserByEmail = await this.userRepository.findByEmail(email);

    if (existingUserByUsername) {
      throw new ConflictException("Username already exists");
    }

    if (existingUserByEmail) {
      throw new ConflictException("Email already exists");
    }

    // Хэширование пароля
    const hashedPassword = await argon.hash(password);

    try {
      const user = await this.userRepository.createUser({
        username,
        email,
        password: hashedPassword,
        ...userData,
      });

      // Отправка события в Kafka о создании пользователя
      this.kafkaClient.emit("user_created", {
        id: user.id,
        username: user.username,
        email: user.email,
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException("Error creating user");
    }
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findByUsername(username);
  }
}
