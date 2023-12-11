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
import { CrearNotificacionRequest, EliminarNotificacionRequest, ListarNotificacionesRequest, ListarNotificacionesResponse, NotificacionRequest, NotificacionResponse, NotificacionesPorUsuarioRequest, NotificacionesPorUsuarioResponse, RespuestaEliminacion } from 'src/grpc/interfaces/notificaciones.dto';

interface NotificacionGrpcService {
  crearNotificacion(request: CrearNotificacionRequest): Observable<NotificacionResponse>;
  obtenerNotificacion(request: NotificacionRequest): Observable<NotificacionResponse>;
  listarNotificaciones(request: ListarNotificacionesRequest): Observable<ListarNotificacionesResponse>;
  eliminarNotificacion(request: EliminarNotificacionRequest): Observable<RespuestaEliminacion>;
  notificacionesPorUsuario(request: NotificacionesPorUsuarioRequest): Observable<NotificacionesPorUsuarioResponse>;
}

@Injectable()
export class NotificacionService {
  private notificacionGrpcService: NotificacionGrpcService;

  constructor(@Inject('NOTIFICACION_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.notificacionGrpcService = this.client.getService<NotificacionGrpcService>('NotificacionService');
  }

  crearNotificacion(data: CrearNotificacionRequest): Observable<NotificacionResponse> {
    return this.notificacionGrpcService.crearNotificacion(data);
  }

  obtenerNotificacion(data: NotificacionRequest): Observable<NotificacionResponse> {
    return this.notificacionGrpcService.obtenerNotificacion(data);
  }

  listarNotificaciones(data: ListarNotificacionesRequest): Observable<ListarNotificacionesResponse> {
    return this.notificacionGrpcService.listarNotificaciones(data);
  }

  eliminarNotificacion(data: EliminarNotificacionRequest): Observable<RespuestaEliminacion> {
    return this.notificacionGrpcService.eliminarNotificacion(data);
  }

  notificacionesPorUsuario(data: NotificacionesPorUsuarioRequest): Observable<NotificacionesPorUsuarioResponse> {
    return this.notificacionGrpcService.notificacionesPorUsuario(data);
  }
}

