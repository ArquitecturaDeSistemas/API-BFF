/* eslint-disable prettier/prettier */
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class TaskModel {
  @Field(() => ID)
  id: string;

  @Field()
  titulo: string;

  @Field()
  descripcion: string;

  @Field()
  fechaInicio: Date; 
  
  @Field()
  fechaTermino: Date;

  @Field()
  userId: string;

}
