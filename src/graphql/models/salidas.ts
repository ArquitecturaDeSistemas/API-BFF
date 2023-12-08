/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class RespuestaEliminacion {
  @Field(() => ID)
  mensaje: string;

}
