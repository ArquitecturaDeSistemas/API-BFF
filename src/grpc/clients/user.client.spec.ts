/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { throwError, of } from 'rxjs';
import { UserClient } from './user.client';
import { CircuitBreakerService } from '../../circuit-breaker/circuit-breaker/circuit-breaker.service';

describe('UserClient Tests', () => {
  let userClient: UserClient;
  let mockUserService;

  beforeEach(async () => {
    mockUserService = {
      getUser: jest.fn().mockImplementation(() => throwError(new Error('Servicio gRPC fallido'))),
      createUser: jest.fn().mockImplementation(() => of({ id: '123', nombre: 'Test', apellido: 'User', correo: 'test@example.com' })),
      // Añadir mocks para otros métodos si es necesario
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserClient,
        CircuitBreakerService,
        { provide: 'USER_SERVICE', useValue: mockUserService },
      ],
    }).compile();

    userClient = module.get<UserClient>(UserClient);
  });

  it('debería activar el circuit breaker en caso de falla del servicio gRPC', done => {
    userClient.getUser({ id: 'test_id' }).subscribe({
      next: () => {},
      error: (error) => {
        expect(error.message).toBe('Servicio gRPC fallido');
        expect(mockUserService.getUser).toBeCalledTimes(1);
        done();
      },
      complete: () => done.fail('No debería completarse exitosamente')
    });
  });

  it('no debería activar el circuit breaker en caso de éxito del servicio gRPC', done => {
    userClient.createUser({ nombre: 'Test', apellido: 'User', correo: 'test@example.com', contrasena: '1234' }).subscribe({
      next: (response) => {
        expect(response.id).toBe('123');
        done();
      },
      error: () => done.fail('No debería fallar'),
    });
  });

  // Aquí puedes añadir más pruebas si es necesario
});
