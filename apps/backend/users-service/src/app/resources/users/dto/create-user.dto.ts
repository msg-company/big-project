import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "Password too weak",
  })
  password: string;

  @Field(() => [String], { nullable: true })
  roles?: string[];
}
