/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { CircuitBreakerService } from './circuit-breaker/circuit-breaker.service';

@Module({
  providers: [CircuitBreakerService],
  exports: [CircuitBreakerService], // Asegúrate de exportar el servicio para su uso en otros módulos
})
export class CircuitBreakerModule {}
