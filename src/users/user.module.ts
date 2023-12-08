/* eslint-disable prettier/prettier */

import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserResolver } from 'src/graphql/resolvers/user.resolver';
import { UserClient } from 'src/grpc/clients/user.client';

@Global()
@Module({
  imports: [
    // CircuitBreakerModule,
    // Configuración del cliente gRPC
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'proto',
          protoPath: join(__dirname, '../../src/grpc/proto/user.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  providers: [UserResolver, UserClient],
  exports: [UserClient],
})
export class UserModule {}