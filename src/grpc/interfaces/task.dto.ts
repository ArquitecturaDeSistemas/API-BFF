/* eslint-disable prettier/prettier */

import { User } from "src/grpc/interfaces/user.dto";

//import { User } from "./user.dto";

export interface CreateTaskRequest {
    titulo: string;
    descripcion: string;
    fechaInicio: string;
    fechaTermino: string;
    userId: User;
  }
  export interface CreateTaskResponse {
    id: string;
  }
  
  export interface GetTaskRequest {
    id: string;
  }
  
  export interface GetTaskResponse {
    
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaTermino: Date;
    userId: User;
  }
  
  export interface UpdateTaskRequest {
    id: string;
    titulo?: string;
    descripcion?: string;
    fechaInicio?: Date;
    fechaTermino?: Date;
    userId?: User;
  }
  
  export interface UpdateTaskResponse {
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaTermino: Date;
    userId : User;
  }
  
  export interface DeleteTaskRequest {
    id: string;
  }
  
  export interface DeleteTaskResponse {
    mensaje: string;
  }
  
  export interface ListTasksRequest {}
  
  export interface ListTasksResponse {
    tasks: Task[];
  }
  
  export interface Task {
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaTermino: Date;
    userId : User;
  }