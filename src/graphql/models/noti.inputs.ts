/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CrearNotificacionInput {
    @Field()
    titulo: string;
    
    @Field()
    usuarioId: number;
    
    @Field()
    tareaId: number;
}

