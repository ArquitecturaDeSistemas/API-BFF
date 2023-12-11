/* eslint-disable prettier/prettier */

import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CircuitBreakerModule } from 'src/circuit-breaker/circuit-breaker.modules';
import { NotificacionResolver } from 'src/graphql/resolvers/notificacion.resolver';
import { NotificacionClient } from 'src/grpc/clients/notificacion.client';

@Global()
@Module({
  imports: [
    // CircuitBreakerModule,
    // Configuración del cliente gRPC
    ClientsModule.register([
      {
        name: 'NOTIFICACION_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'proto',
          protoPath: join(__dirname, '../../src/grpc/proto/notification.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
    CircuitBreakerModule

  ],
  providers: [NotificacionResolver, NotificacionClient],
  exports: [NotificacionClient],
})
export class NotificacionModule {}