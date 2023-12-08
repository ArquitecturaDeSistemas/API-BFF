/* eslint-disable prettier/prettier */
/*

  - Configuraciones de gRPC en NestJS
  - Define el cliente gRPC para comunicarse con 
  el servicio de usuario
  - Es utilizado por el user.service.ts para
  llamar a operaciones específicas del microservicio de
  usuario.

*/
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  ListUsersRequest,
  ListUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '../interfaces/user.dto';

interface IUserService {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
  getUser(request: GetUserRequest): Observable<GetUserResponse>;
  updateUser(request: UpdateUserRequest): Observable<UpdateUserResponse>;
  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;
  listUsers(request: ListUsersRequest): Observable<ListUsersResponse>;
}

@Injectable()
export class UserClient implements OnModuleInit {
  public userService: IUserService;

  constructor(
    // private circuitBreakerService: CircuitBreakerService,
    @Inject('USER_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  createUser(data: CreateUserRequest): Observable<CreateUserResponse> {
    console.log(data)
    return this.userService.createUser(data);
  }

  updateUser(data: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.userService.updateUser(data);
  }
  deleteUser(data: DeleteUserRequest): Observable<DeleteUserResponse> {
    return this.userService.deleteUser(data);
  }
  listUsers(data: ListUsersRequest): Observable<ListUsersResponse> {
    return this.userService.listUsers(data);
  }
  getUser(data: GetUserRequest): Observable<GetUserResponse> {
    return this.userService.getUser(data);
  }
  // createUser(data: CreateUserRequest): Observable<CreateUserResponse> {
  //   const createUserCircuitBreaker =
  //     this.circuitBreakerService.createCircuitBreaker(() =>
  //       this.userService.createUser(data),
  //     );
  //   console.log(data);
  //   return createUserCircuitBreaker.fire();
  // }

  // updateUser(data: UpdateUserRequest): Observable<UpdateUserResponse> {
  //   const createUserCircuitBreaker =
  //     this.circuitBreakerService.createCircuitBreaker(() =>
  //       this.userService.updateUser(data),
  //     );
  //   console.log(data);
  //   return createUserCircuitBreaker.fire();
  // }
  // deleteUser(data: { id: string }): Observable<DeleteUserResponse> {
  //   const createUserCircuitBreaker =
  //     this.circuitBreakerService.createCircuitBreaker(() =>
  //       this.userService.deleteUser(data),
  //     );
  //   console.log(data);
  //   return createUserCircuitBreaker.fire();
  // }

  // getUser(data: { id: string }): Observable<any> {
  //   const createUserCircuitBreaker =
  //     this.circuitBreakerService.createCircuitBreaker(() =>
  //       this.userService.getUser(data),
  //     );
  //   console.log(data);
  //   return createUserCircuitBreaker.fire();
  // }

  // listUsers({}): Observable<any> {
  //   const createUserCircuitBreaker =
  //     this.circuitBreakerService.createCircuitBreaker(() =>
  //       this.userService.listUsers({}),
  //     );
  //   return createUserCircuitBreaker.fire();
  // }
}
