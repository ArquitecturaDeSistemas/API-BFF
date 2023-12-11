/* eslint-disable prettier/prettier */
// circuit-breaker.service.ts

import { Injectable } from '@nestjs/common';
import * as CircuitBreaker from 'opossum';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class CircuitBreakerService {
  createCircuitBreaker<T>(sourceObservable: Observable<T>): Observable<T> {
    const breaker = new CircuitBreaker(() => sourceObservable.toPromise(), {
      timeout: 5000, // Ejemplo de tiempo de espera
      errorThresholdPercentage: 50, // Porcentaje de error antes de abrir el circuito
      resetTimeout: 30000, // Tiempo para intentar cerrar el circuito
      // Más opciones según sea necesario
    });

    return new Observable<T>(observer => {
      breaker.fire()
        .then(response => observer.next(response))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch(error => observer.error(new CustomError('Servicio no disponible temporalmente')))
        .finally(() => observer.complete());
    }).pipe(
      timeout(5000), // Asegurarse de que la operación no se demore demasiado
      catchError(error => {
        console.error('Error en circuit breaker:', error);
        return throwError(new CustomError('Ha ocurrido un error procesando tu solicitud'));
      })
      // Puedes agregar más operadores RxJS si es necesario
    );
  }
}

// esta clase es para crear un error personalizado
// para que el circuit breaker pueda identificarlo
// y no lo tome como un error de la aplicación,
// sino como un error del servicio
class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}