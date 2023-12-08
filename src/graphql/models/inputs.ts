/* eslint-disable prettier/prettier */
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  correo: string;

  @Field()
  contrasena: string;
}


@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  apellido?: string;

  @Field({ nullable: true })
  correo?: string;
}

@InputType()
export class DeleteUserInput {
  @Field(() => ID)
  id: string;
}