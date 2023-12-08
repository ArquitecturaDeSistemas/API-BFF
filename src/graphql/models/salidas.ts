/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class RespuestaEliminacion {
  @Field(() => ID)
  mensaje: string;

}

@ObjectType()
export class UserUpdate{
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  nombre: string;

  @Field(() => ID)
  apellido: string;

  @Field(() => ID)
  correo: string;

  @Field(() => ID)
  contrasena: string;
}