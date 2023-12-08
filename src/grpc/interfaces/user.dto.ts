/* eslint-disable prettier/prettier */

export interface CreateUserRequest {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
}
export interface CreateUserResponse {
  id: string;
}

export interface GetUserRequest {
  id: string;
}

export interface GetUserResponse {
  
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
}

export interface UpdateUserRequest {
  id: string;
  nombre?: string;
  apellido?: string;
  correo?: string;
}

export interface UpdateUserResponse {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
}

export interface DeleteUserRequest {
  id: string;
}

export interface DeleteUserResponse {
  mensaje: string;
}

export interface ListUsersRequest {}

export interface ListUsersResponse {
  users: User[];
}

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
}