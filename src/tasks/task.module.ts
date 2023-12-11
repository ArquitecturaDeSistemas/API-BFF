/* eslint-disable prettier/prettier */

import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TaskResolver } from 'src/graphql/resolvers/task.resolver';
import { TaskClient } from 'src/grpc/clients/task.client';
//import { TypeOrmModule } from '@nestjs/typeorm';

//export class DatabaseModule {}

@Global()
@Module({
  imports: [
    // CircuitBreakerModule,
    // Configuración del cliente gRPC
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'proto',
          protoPath: join(__dirname, '../../src/grpc/proto/task.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  providers: [TaskResolver, TaskClient],
  exports: [TaskClient],
})
export class TaskModule {}