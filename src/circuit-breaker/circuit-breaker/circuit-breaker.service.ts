// src/circuit-breaker/circuit-breaker.service.ts

import { Injectable } from '@nestjs/common';
import * as CircuitBreaker from 'opossum';

@Injectable()
export class CircuitBreakerService {
  createCircuitBreaker(func, options = {}) {
    return new CircuitBreaker(func, {
      timeout: 3000, // Si la llamada no se completa en 3 segundos, abre el circuito
      errorThresholdPercentage: 50, // Si el 50% de las solicitudes fallan, abre el circuito
      resetTimeout: 10000, // Después de 10 segundos, intenta cerrar el circuito
      ...options,
    });
  }
}
