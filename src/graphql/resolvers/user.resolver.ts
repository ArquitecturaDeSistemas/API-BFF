/* eslint-disable prettier/prettier */

/**
  - Aplicación que usa GraphQL para comunicarse
  con el servicio de usuario.
  - Define los resolvers para las operaciones
  - Cada resolver es una funcion que se encarga
  de obtener los datos requeridos para un campo específico
  cuando se realiza una query o mutation GraphQL.
  Interactúa con user.service.ts para obtener o modificar
  los datos necesarios y luego devuelve esos datos
  en el formato esperado por el esquema de GraphQL.

  - ES EL PUENTE ENTRE EL CLIENTE Y EL SERVICIO DE USUARIO
  (GraphQL - Resolver - Lógica de negocios)
 */

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserClient } from '../../grpc/clients/user.client';
import { UserModel } from '../models/user.model';
import { CreateUserInput, LoginUserInput, UpdateUserInput } from '../models/inputs';
import { CreateUserRequest, LoginUserRequest, LoginUserResponse, LogoutUserRequest, LogoutUserResponse, UpdateUserRequest } from 'src/grpc/interfaces/user.dto';
import { LogoutMensaje, RespuestaEliminacion } from '../models/salidas';
import { PayloadModel } from '../models/salidas';
import { Observable, catchError, map } from 'rxjs';


@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userClient: UserClient) {}

  @Query(() => UserModel)
  getUser(@Args('id') id: string): Observable<UserModel> {
    return this.userClient.getUser({ id }).pipe(
      map((response) => this.transformUserResponse(response)),
      catchError((error) => {
        console.log('Error al obtener usuario', error);
        throw new Error('Error al obtener el usuario');
      }),
    )
  }

  @Query(() => [UserModel])
  listUsers(): Observable<UserModel[]> {
    return this.userClient.listUsers({}).pipe(
      map((response) => response.users.map(user => this.transformUserResponse(user))),
      catchError((error) => {
        console.log('Error al listar usuarios', error);
        throw new Error('Error al listar los usuarios');
      }),
    );
  }

  @Mutation(() => UserModel)
  createUser(@Args('createUserInput') input: CreateUserInput): Observable<UserModel> {
    const request: CreateUserRequest = { 
      nombre: input.nombre,
      apellido: input.apellido,
      correo: input.correo,
      contrasena: input.contrasena,
    };

    return this.userClient.createUser(request).pipe(
      map((response) => this.transformUserResponse(response)),
      catchError((error) => {
        console.log('Error al crear usuario', error);
        throw new Error('Error al crear el usuario');
      }),
    );
  }

  @Mutation(() => UserModel)
  updateUser(@Args('updateUserInput') input: UpdateUserInput): Observable<UserModel> {
    const request: UpdateUserRequest = {
      id: input.id,
      // Solo se asignan los campos si están definidos en la entrada
      nombre: input.nombre ?? undefined,
      apellido: input.apellido ?? undefined,
      correo: input.correo ?? undefined,
    };

    return this.userClient.updateUser(request).pipe(
      map((response) => this.transformUserResponse(response)),
      catchError((error) => {
        console.log('Error al actualizar usuario', error);
        throw new Error('Error al actualizar el usuario');
      }),
    );
  }

  @Mutation(() => PayloadModel)
  loginUser(@Args('loginUserInput') input: LoginUserInput): Observable<LoginUserResponse> {
    const request: LoginUserRequest = { 
      correo: input.correo,
      contrasena: input.contrasena,
    };
    console.log("request", request)
    return this.userClient.loginUser(request).pipe(
      map((response) => this.transformPayloadResponse(response)),
      catchError((error) => {
        console.log('Error al iniciar sesión', error);
        throw new Error('Error al iniciar sesión. '+error);
      }),
    );
  }

  @Mutation(() => LogoutMensaje)
  logoutUser(@Args('id') id: string): Observable<LogoutUserResponse> {
    const request: LogoutUserRequest = { 
      userID: id,
    };
    return this.userClient.logoutUser(request).pipe(
      map((response) => this.transformLogoutResponse(response)),
      catchError((error) => {
        console.log('Error al cerrar sesión', error);
        throw new Error('Error al cerrar sesión. '+error);
      }),
    );
  }

  @Mutation(() => RespuestaEliminacion)
  deleteUser(@Args('id') id: string): Observable<RespuestaEliminacion> {
    return this.userClient.deleteUser({ id }).pipe(
      map((response) => this.transformEliminacionRespuesta(response)),
      catchError((error) => {
        console.log('Error al eliminar usuario', error);
        throw new Error('Error al eliminar el usuario');
      }),
    );
  }



  private transformLogoutResponse(response: any ): LogoutUserResponse {
    
    return {
      mensaje: response.mensaje,
    };
  }

  private transformPayloadResponse(response: any ): LoginUserResponse {
    console.log("response", response)
    return {
      token: response.token,
      user: this.transformUserResponse(response.user),
    };
  }

  private transformUserResponse(response: any): UserModel {
    if(!response){
      throw new Error('No se encontró el usuario');
    }
    console.log("response", response.nombre);
    console.log("response", response.apellido);
    console.log("response", response.correo);
    console.log("response", response.contrasena);
    return {
      id: response.id,
      nombre: response.nombre,
      apellido: response.apellido,
      correo: response.correo,
    };
  }

  private transformEliminacionRespuesta(response: any): RespuestaEliminacion {
    return {
      mensaje: response.mensaje,
        };
  }
}