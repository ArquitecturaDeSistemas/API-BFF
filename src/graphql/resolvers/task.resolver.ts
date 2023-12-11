/* eslint-disable prettier/prettier */

/**
  - Aplicación que usa GraphQL para comunicarse
  con el servicio de usuario.
  - Define los resolvers para las operaciones
  - Cada resolver es una funcion que se encarga
  de obtener los datos requeridos para un campo específico
  cuando se realiza una query o mutation GraphQL.
  Interactúa con task.service.ts para obtener o modificar
  los datos necesarios y luego devuelve esos datos
  en el formato esperado por el esquema de GraphQL.

  - ES EL PUENTE ENTRE EL CLIENTE Y EL SERVICIO DE USUARIO
  (GraphQL - Resolver - Lógica de negocios)
 */

  import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
  import { TaskClient } from '../../grpc/clients/task.client';
  import { UserClient } from '../../grpc/clients/user.client';
  import { TaskModel } from '../models/task.model';
  import { CreateTaskInput, UpdateTaskInput } from '../models/inputs';
  import { CreateTaskRequest, UpdateTaskRequest } from 'src/grpc/interfaces/task.dto';
  import { RespuestaEliminacion } from '../models/salidas';
  import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
//import { taskInfo } from 'os';
  
  
  
  @Resolver(() => TaskModel)
  export class TaskResolver {
    constructor(private userClient: UserClient, 
      private taskClient: TaskClient,
      ) {}
  
    @Query(() => TaskModel)
    async getTask(@Args('id') id: string): Promise<TaskModel> {
      const response = await this.taskClient.getTask({ id }).toPromise();
      return this.transformTaskResponse(response);
    }
  
    @Query(() => [TaskModel])
    async listTasks(): Promise<TaskModel[]> {
      const response = await this.taskClient.listTasks({}).toPromise();
      return response.tasks.map(task => this.transformTaskResponse(task));
    }
  
    async createTask(@Args('createTaskInput') input: CreateTaskInput): Promise<TaskModel> {
      const userResponse = await this.userClient.getUser({ id: input.userId }).toPromise();
    
      if (!userResponse || !userResponse.id) {
        // Maneja el caso en el que userResponse o userResponse.id no están definidos
        throw new Error('Usuario no encontrado');
      }
    
      const request: CreateTaskRequest = {
        titulo: input.titulo,
        descripcion: input.descripcion,
        fechaInicio: Timestamp.fromDate(new Date(input.fechaInicio)),
        fechaTermino: Timestamp.fromDate(new Date(input.fechaTermino)),
        userId: userResponse,
      };
    
      console.log('request', request);
    
      const response = await this.taskClient.createTask(request).toPromise();
      console.log('response', response);
    
      return this.transformTaskResponse(response);
    }
    
  
    @Mutation(() => TaskModel)
  async updateTask(@Args('updateTaskInput') input: UpdateTaskInput): Promise<TaskModel> {
    const userResponse = await this.userClient.getUser({ id: input.userId }).toPromise();
    
      if (!userResponse || !userResponse.id) {
        // Maneja el caso en el que userResponse o userResponse.id no están definidos
        throw new Error('Usuario no encontrado');
      }
    const request: UpdateTaskRequest = {
      id: input.id,
    };
    if (input.titulo !== undefined) {
      request.titulo = input.titulo;
    }
    if (input.descripcion !== undefined) {
        request.descripcion = input.descripcion;
    if (input.fechaInicio !== undefined) {
      request.fechaInicio = Timestamp.fromDate(new Date(input.fechaInicio));
    }
    if (input.fechaTermino !== undefined) {
        request.fechaTermino = Timestamp.fromDate(new Date(input.fechaTermino));
      }
      if (input.userId !== undefined) {
        request.userId = userResponse;
      }
    }
    console.log("request", request);
    const response = await this.taskClient.updateTask(request as UpdateTaskRequest).toPromise();
    return this.transformTaskResponse(response);
  }
  
  
    @Mutation(() => RespuestaEliminacion)
    async deleteTask(@Args('id') id: string): Promise<RespuestaEliminacion> {
      const response = await this.taskClient.deleteTask({ id }).toPromise();
      return this.transformEliminacionRespuesta(response);
    }
  
    private transformTaskResponse(response: any): TaskModel {
      return {
        id: response.id,
        titulo: response.titulo,
        descripcion: response.descripcion,
        fechaInicio: response.fechaInicio,
        fechaTermino: response.fechaTermino,
        userId: response.userId,
      };
    }
  
    private transformEliminacionRespuesta(response: any): RespuestaEliminacion {
      return {
        mensaje: response.mensaje,
          };
    }

  }