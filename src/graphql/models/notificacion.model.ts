/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class NotificacionModel {
  @Field(() => ID)
  id: string;

  @Field()
    titulo: string;

    @Field()
    usuarioId: number;

    @Field()
    tareaId: number;

}