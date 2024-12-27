import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
@ObjectType()
@Directive('@key(fields: "id")')
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
    comment: "Уникальный идентификатор пользователя",
  })
  @Field(() => ID, {
    description: "Уникальный идентификатор пользователя",
  })
  id: string;

  @Column({
    unique: true,
    length: 50,
    comment: "Уникальное имя пользователя",
  })
  @Index({ unique: true })
  @Field({
    description: "Уникальное имя пользователя",
  })
  username: string;

  @Column({
    unique: true,
    length: 100,
    comment: "Электронная почта пользователя",
  })
  @Index({ unique: true })
  @Field({
    description: "Электронная почта пользователя",
  })
  email: string;

  @Column({
    length: 50,
    comment: "Имя пользователя",
  })
  @Field({
    description: "Имя пользователя",
  })
  firstName: string;

  @Column({
    length: 50,
    comment: "Фамилия пользователя",
  })
  @Field({
    description: "Фамилия пользователя",
  })
  lastName: string;

  @Column({
    select: false,
    comment: "Хэшированный пароль",
  })
  password: string;

  @Column({
    default: true,
    comment: "Активен ли пользователь",
  })
  @Field(() => Boolean, {
    description: "Активен ли пользователь",
  })
  isActive: boolean;

  @Column("simple-array", {
    nullable: true,
    comment: "Роли пользователя",
  })
  @Field(() => [String], {
    nullable: true,
    description: "Роли пользователя",
  })
  roles?: string[];

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
    comment: "Дата создания пользователя",
  })
  @Field({
    description: "Дата создания пользователя",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    comment: "Дата последнего обновления",
  })
  @Field({
    description: "Дата последнего обновления",
  })
  updatedAt: Date;
}
