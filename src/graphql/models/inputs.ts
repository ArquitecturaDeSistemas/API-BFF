/* eslint-disable prettier/prettier */
import { InputType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/grpc/interfaces/user.dto';

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
export class CreateTaskInput {
  @Field()
  titulo: string;

  @Field()
  descripcion: string;

  @Field()
  fechaInicio: string;

  @Field()
  fechaTermino: string;

  @Field({ nullable: true })
  userId?: string;
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
export class UpdateTaskInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  titulo?: string;

  @Field({nullable: true })
  descripcion?:string;

  @Field({ nullable: true })
  fechaInicio?: Date;

  @Field({ nullable: true })
  fechaTermino?: Date;

  @Field({ nullable: true })
  userId?: string;
}

@InputType()
export class DeleteUserInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class DeleteTaskInput {
  @Field(() => ID)
  id: string;
}