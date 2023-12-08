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
import { CreateUserInput, UpdateUserInput } from '../models/inputs';
import { CreateUserRequest, UpdateUserRequest } from 'src/grpc/interfaces/user.dto';
import { RespuestaEliminacion } from '../models/salidas';



@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userClient: UserClient) {}

  @Query(() => UserModel)
  async getUser(@Args('id') id: string): Promise<UserModel> {
    const response = await this.userClient.getUser({ id }).toPromise();
    return this.transformUserResponse(response);
  }

  @Query(() => [UserModel])
  async listUsers(): Promise<UserModel[]> {
    const response = await this.userClient.listUsers({}).toPromise();
    return response.users.map(user => this.transformUserResponse(user));
  }

  @Mutation(() => UserModel)
  async createUser(@Args('createUserInput') input: CreateUserInput): Promise<UserModel> {
    const request: CreateUserRequest = { 
      nombre: input.nombre,
      apellido: input.apellido,
      correo: input.correo,
      contrasena: input.contrasena,
     };
     console.log("request", request);
    const response = await this.userClient.createUser(request).toPromise();
    console.log("response", response)
    return this.transformUserResponse(response);
  }

  @Mutation(() => UserModel)
  async updateUser(@Args('updateUserInput') input: UpdateUserInput): Promise<UserModel> {
    const request: UpdateUserRequest = { 
      id: input.id,
      nombre: input.nombre,
      apellido: input.apellido,
      correo: input.correo,
     };
    const response = await this.userClient.updateUser(request).toPromise();
    return this.transformUserResponse(response);
  }

  @Mutation(() => RespuestaEliminacion)
  async deleteUser(@Args('id') id: string): Promise<RespuestaEliminacion> {
    const response = await this.userClient.deleteUser({ id }).toPromise();
    return this.transformEliminacionRespuesta(response);
  }

  private transformUserResponse(response: any): UserModel {
    // Transformar la respuesta de gRPC al modelo de GraphQL
    // Ajustar según las propiedades y la estructura de tus respuestas
    return {
      id: response.id,
      nombre: response.nombre,
      apellido: response.apellido,
      correo: response.correo,
    };
  }

  private transformEliminacionRespuesta(response: any): RespuestaEliminacion {
    // Transformar la respuesta de gRPC al modelo de GraphQL
    // Ajustar según las propiedades y la estructura de tus respuestas
    return {
      mensaje: response.mensaje,
        };
  }
}