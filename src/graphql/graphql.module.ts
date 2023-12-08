/* eslint-disable prettier/prettier */
// src/app.module.ts o src/graphql/graphql.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql', // Puede ser una ruta a un archivo o true para generación automática
      // Otras configuraciones como playground, context, etc.
    }),
    UserModule,
  ],
  
})
export class AppModule {}
