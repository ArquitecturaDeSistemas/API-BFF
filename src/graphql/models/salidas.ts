/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserModel } from './user.model';

@ObjectType()
export class RespuestaEliminacion {
  @Field()
  mensaje: string;

}

@ObjectType()
export class UserUpdate{
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  correo: string;

  @Field()
  contrasena: string;
}

@ObjectType()
export class PayloadModel {

  @Field()
  token: string;

  @Field()
  user: UserModel; 

}

@ObjectType()
export class LogoutMensaje {
  @Field()
  mensaje: string;

}
