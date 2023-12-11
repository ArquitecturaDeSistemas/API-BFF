/* eslint-disable prettier/prettier */
import { CircuitBreakerService } from './circuit-breaker.service';
import { throwError, of } from 'rxjs';

describe('CircuitBreakerService', () => {
  let service: CircuitBreakerService;

  beforeEach(() => {
    service = new CircuitBreakerService();
  });

  it('debería capturar errores del observable fuente', done => {
    const sourceObservable = throwError(() => new Error('Error simulado'));
    const circuitBreakerObservable = service.createCircuitBreaker(sourceObservable);

    circuitBreakerObservable.subscribe({
      next: () => {},
      error: (error) => {
        expect(error.message).toBe('Error simulado');
        done();
      }
    });
  });

  it('debería pasar con un observable exitoso', done => {
    const sourceObservable = of('Test exitoso');
    const circuitBreakerObservable = service.createCircuitBreaker(sourceObservable);

    circuitBreakerObservable.subscribe({
      next: (response) => {
        expect(response).toBe('Test exitoso');
        done();
      },
      error: () => {}
    });
  });

  // Aquí puedes añadir más pruebas si es necesario
});
