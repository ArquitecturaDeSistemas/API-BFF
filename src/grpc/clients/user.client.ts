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
import { Observable, catchError, tap } from 'rxjs';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  ListUsersRequest,
  ListUsersResponse,
  LoginUserRequest,
  LoginUserResponse,
  LogoutUserRequest,
  LogoutUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '../interfaces/user.dto';
import { CircuitBreakerService } from 'src/circuit-breaker/circuit-breaker/circuit-breaker.service';
import * as CircuitBreaker from 'opossum';

interface IUserService {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
  getUser(request: GetUserRequest): Observable<GetUserResponse>;
  updateUser(request: UpdateUserRequest): Observable<UpdateUserResponse>;
  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;
  listUsers(request: ListUsersRequest): Observable<ListUsersResponse>;
  loginUser(request: LoginUserRequest): Observable<LoginUserResponse>;
  logoutUser(request: LogoutUserRequest): Observable<LogoutUserResponse>;
}

@Injectable()
export class UserClient implements OnModuleInit {
  public userService: IUserService;
  private createUserCircuitBreaker: CircuitBreaker;
  private getUserCircuitBreaker: CircuitBreaker;
  private updateUserCircuitBreaker: CircuitBreaker;
  private deleteUserCircuitBreaker: CircuitBreaker;
  private listUsersCircuitBreaker: CircuitBreaker;
  private loginUserCircuitBreaker: CircuitBreaker;
  private logoutUserCircuitBreaker: CircuitBreaker;


  constructor(
    //el inject es para inyectar el servicio de usuario
    //que se encuentra en el archivo user.proto
    //inyectar significa que se puede utilizar en el proyecto
    @Inject('USER_SERVICE') private client: ClientGrpc,
    private circuitBreakerService: CircuitBreakerService
    ) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
    
    this.createUserCircuitBreaker = this.circuitBreakerService.createCircuitBreaker(
      this.userService.createUser.bind(this.userService)
    );
    this.getUserCircuitBreaker = this.circuitBreakerService.createCircuitBreaker(
      //this.userService.getUser.bind(this.userService)
      this.userService.getUser.bind(this.userService)
      );
    this.updateUserCircuitBreaker = this.circuitBreakerService.createCircuitBreaker(
      this.userService.updateUser.bind(this.userService)
    );
    this.deleteUserCircuitBreaker = this.circuitBreakerService.createCircuitBreaker(
      this.userService.deleteUser.bind(this.userService)
    );
    this.listUsersCircuitBreaker = this.circuitBreakerService.createCircuitBreaker(
      this.userService.listUsers.bind(this.userService)
    );
    this.loginUserCircuitBreaker = this.circuitBreakerService.createCircuitBreaker(
      this.userService.loginUser.bind(this.userService)
    );
    this.logoutUserCircuitBreaker = this.circuitBreakerService.createCircuitBreaker(
      this.userService.logoutUser.bind(this.userService)
    );
  }

  createUser(data: CreateUserRequest): Observable<CreateUserResponse> {
    const createUserObservable = new Observable<CreateUserResponse>(observer => {
      this.userService.createUser(data).subscribe(
        response => observer.next(response),
        error => observer.error(error),
        () => observer.complete()
      );
    });

    return this.circuitBreakerService.createCircuitBreaker(createUserObservable)
      .pipe(
        tap(() => console.log('Circuit breaker passed')),
        catchError(error => {
          console.error('Circuit breaker failed:', error);
          throw error;
        }),
      );  
    
  }

  updateUser(data: UpdateUserRequest): Observable<UpdateUserResponse> {
    const updateUserObservable = new Observable<UpdateUserResponse>(observer => {
      this.userService.updateUser(data).subscribe(
        response => observer.next(response),
        error => observer.error(error),
        () => observer.complete()
      );
    });

    return this.circuitBreakerService.createCircuitBreaker(updateUserObservable)
      .pipe(
        tap(() => console.log('Circuit breaker passed')),
        catchError(error => {
          console.error('Circuit breaker failed:', error);
          throw error;
        }),
      );  
    }

  deleteUser(data: DeleteUserRequest): Observable<DeleteUserResponse> {
    const deleteUserObservable = new Observable<DeleteUserResponse>(observer => {
      this.userService.deleteUser(data).subscribe(
        response => observer.next(response),
        error => observer.error(error),
        () => observer.complete()
      );
    });

    return this.circuitBreakerService.createCircuitBreaker(deleteUserObservable)
      .pipe(
        tap(() => console.log('Circuit breaker passed')),
        catchError(error => {
          console.error('Circuit breaker failed:', error);
          throw error;
        }),
      );   
    }
  listUsers(data: ListUsersRequest): Observable<ListUsersResponse> {
    const listUsersObservable = new Observable<ListUsersResponse>(observer => {
      this.userService.listUsers(data).subscribe(
        response => observer.next(response),
        error => observer.error(error),
        () => observer.complete()
      );
    });

    return this.circuitBreakerService.createCircuitBreaker(listUsersObservable)
      .pipe(
        tap(() => console.log('Circuit breaker passed')),
        catchError(error => {
          console.error('Circuit breaker failed:', error);
          throw error;
        }),
      );   
      //return this.userService.listUsers(data);
  }
  getUser(data: GetUserRequest): Observable<GetUserResponse> {
    const getUserObservable = new Observable<GetUserResponse>(observer => {
      this.userService.getUser(data).subscribe(
        response => observer.next(response),
        error => observer.error(error),
        () => observer.complete()
      );
    });

    return this.circuitBreakerService.createCircuitBreaker(getUserObservable)
      .pipe(
        tap(() => console.log('Circuit breaker passed')),
        catchError(error => {
          console.error('Circuit breaker failed:', error);
          throw error;
        }),
      );
  }
  loginUser(data: LoginUserRequest): Observable<LoginUserResponse> {
    const loginUserObservable = new Observable<LoginUserResponse>(observer => {
      this.userService.loginUser(data).subscribe(
        response => observer.next(response),
        error => observer.error(error),
        () => observer.complete()
      );
    });

    return this.circuitBreakerService.createCircuitBreaker(loginUserObservable)
      .pipe(
        tap(() => console.log('Circuit breaker passed')),
        catchError(error => {
          console.error('Circuit breaker failed:', error);
          throw error;
        }),
      );    
    }
  logoutUser(data: LogoutUserRequest): Observable<LogoutUserResponse> {
    const logoutUserObservable = new Observable<LogoutUserResponse>(observer => {
      this.userService.logoutUser(data).subscribe(
        response => observer.next(response),
        error => observer.error(error),
        () => observer.complete()
      );
    });

    return this.circuitBreakerService.createCircuitBreaker(logoutUserObservable)
      .pipe(
        tap(() => console.log('Circuit breaker passed')),
        catchError(error => {
          console.error('Circuit breaker failed:', error);
          throw error;
        }),
      );      
    }
}
