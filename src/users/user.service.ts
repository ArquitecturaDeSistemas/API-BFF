/* eslint-disable prettier/prettier */
/*
  - Contiene la lógica de negocio del servicio de usuario
  - Acá se definen los métodos para manipular datos: CRUD
  - Interactúa con el cliente gRPC para realizar las 
  operaciones sobre el servicio de usuario.
  - Es el responsable de llamar los métodos de
  user.client.ts para comunicarse con el microservicio
  de usuario.

  Métodos deben coincidir con los definidos en user.proto
*/

import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserRequest, CreateUserResponse, DeleteUserRequest, DeleteUserResponse, GetUserRequest, GetUserResponse, ListUsersRequest, ListUsersResponse, UpdateUserRequest, UpdateUserResponse } from 'src/grpc/interfaces/user.dto';

interface UserGrpcService {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
  getUser(request: GetUserRequest): Observable<GetUserResponse>;
  updateUser(request: UpdateUserRequest): Observable<UpdateUserResponse>;
  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;
  listUsers(request: ListUsersRequest): Observable<ListUsersResponse>;
}

@Injectable()
export class UserService {
  private userGrpcService: UserGrpcService;

  constructor(@Inject('USER_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userGrpcService = this.client.getService<UserGrpcService>('UserService');
  }

  createUser(data: CreateUserRequest): Observable<CreateUserResponse> {
    return this.userGrpcService.createUser(data);
  }

  updateUser(data: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.userGrpcService.updateUser(data);
  }

  deleteUser(data: DeleteUserRequest): Observable<DeleteUserResponse> {
    return this.userGrpcService.deleteUser(data);
  }

  getUser(data: GetUserRequest): Observable<GetUserResponse> {
    return this.userGrpcService.getUser(data);
  }

  listUsers(data: ListUsersRequest): Observable<ListUsersResponse> {
    return this.userGrpcService.listUsers(data);
  }
}

