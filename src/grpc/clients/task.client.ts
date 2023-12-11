/* eslint-disable prettier/prettier */
/*

  - Configuraciones de gRPC en NestJS
  - Define el cliente gRPC para comunicarse con 
  el servicio de usuario
  - Es utilizado por el task.service.ts para
  llamar a operaciones específicas del microservicio de
  usuario.

*/
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetTaskRequest,
  GetTaskResponse,
  ListTasksRequest,
  ListTasksResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from '../interfaces/task.dto';

interface ITaskService {
  createTask(request: CreateTaskRequest): Observable<CreateTaskResponse>;
  getTask(request: GetTaskRequest): Observable<GetTaskResponse>;
  updateTask(request: UpdateTaskRequest): Observable<UpdateTaskResponse>;
  deleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse>;
  listTasks(request: ListTasksRequest): Observable<ListTasksResponse>;
}

@Injectable()
export class TaskClient implements OnModuleInit {
  public taskService: ITaskService;

  constructor(
    // private circuitBreakerService: CircuitBreakerService,
    @Inject('TASK_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.taskService = this.client.getService<ITaskService>('TaskService');
  }

  createTask(data: CreateTaskRequest): Observable<CreateTaskResponse> {
    console.log(data)
    return this.taskService.createTask(data);
  }

  updateTask(data: UpdateTaskRequest): Observable<UpdateTaskResponse> {
    return this.taskService.updateTask(data);
  }
  deleteTask(data: DeleteTaskRequest): Observable<DeleteTaskResponse> {
    return this.taskService.deleteTask(data);
  }
  listTasks(data: ListTasksRequest): Observable<ListTasksResponse> {
    return this.taskService.listTasks(data);
  }
  getTask(data: GetTaskRequest): Observable<GetTaskResponse> {
    return this.taskService.getTask(data);
  }
}