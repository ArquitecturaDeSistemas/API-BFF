/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './users/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CircuitBreakerModule } from './circuit-breaker/circuit-breaker.modules';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    CircuitBreakerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
