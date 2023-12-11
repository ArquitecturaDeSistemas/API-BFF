/* eslint-disable prettier/prettier */
/*
  - Contiene la lógica de negocio del servicio de usuario
  - Acá se definen los métodos para manipular datos: CRUD
  - Interactúa con el cliente gRPC para realizar las 
  operaciones sobre el servicio de usuario.
  - Es el responsable de llamar los métodos de
  task.client.ts para comunicarse con el microservicio
  de usuario.

  Métodos deben coincidir con los definidos en task.proto
*/

import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateTaskRequest, CreateTaskResponse, DeleteTaskRequest, DeleteTaskResponse, GetTaskRequest, GetTaskResponse, ListTasksRequest, ListTasksResponse, UpdateTaskRequest, UpdateTaskResponse } from 'src/grpc/interfaces/task.dto';

interface TaskGrpcService {
  createTask(request: CreateTaskRequest): Observable<CreateTaskResponse>;
  getTask(request: GetTaskRequest): Observable<GetTaskResponse>;
  updateTask(request: UpdateTaskRequest): Observable<UpdateTaskResponse>;
  deleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse>;
  listTasks(request: ListTasksRequest): Observable<ListTasksResponse>;
}

@Injectable()
export class TaskService {
  private taskGrpcService: TaskGrpcService;

  constructor(@Inject('TASK_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.taskGrpcService = this.client.getService<TaskGrpcService>('TaskService');
  }

  createTask(data: CreateTaskRequest): Observable<CreateTaskResponse> {
    return this.taskGrpcService.createTask(data);
  }

  updateTask(data: UpdateTaskRequest): Observable<UpdateTaskResponse> {
    return this.taskGrpcService.updateTask(data);
  }

  deleteTask(data: DeleteTaskRequest): Observable<DeleteTaskResponse> {
    return this.taskGrpcService.deleteTask(data);
  }

  getTask(data: GetTaskRequest): Observable<GetTaskResponse> {
    return this.taskGrpcService.getTask(data);
  }

  listTasks(data: ListTasksRequest): Observable<ListTasksResponse> {
    return this.taskGrpcService.listTasks(data);
  }

}
