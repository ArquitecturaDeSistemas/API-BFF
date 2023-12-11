/* eslint-disable prettier/prettier */

import { Test, TestingModule } from "@nestjs/testing";
import { throwError } from 'rxjs';
import { UserClient } from "./user.client";
import { CircuitBreakerService } from "../../circuit-breaker/circuit-breaker/circuit-breaker.service";

describe('UserClient Tests', () => {
  let userClient: UserClient;
  let mockUserService;

  beforeEach(async () => {
    // Mock del servicio de usuario de gRPC
    mockUserService = {
      getUser: jest.fn().mockImplementation(() => throwError(new Error('Servicio gRPC fallido'))),
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
    const id = 'test_id';
    userClient.getUser({ id }).subscribe({
      next: () => {},
      error: (error) => {
        expect(error.message).toBe('Servicio gRPC fallido');
        expect(mockUserService.getUser).toBeCalledTimes(1);
        done();
      }
    });
  });

  // Aquí puedes añadir más pruebas si es necesario
});
