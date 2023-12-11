/* eslint-disable prettier/prettier */

export interface CrearNotificacionRequest {
    titulo: string;
    usuarioId: number;
    tareaId: number;
}

export interface NotificacionResponse {
    id: number;
    titulo: string;
    usuarioId: number;
    tareaId: number;
}

export interface NotificacionRequest {
    id: number;
}
export interface ListarNotificacionesRequest {}

export interface ListarNotificacionesResponse {
    notificaciones: Notificacion[];
}
export interface EliminarNotificacionRequest {
    id: number;
}

export interface RespuestaEliminacion {
    mensaje: string;
}
export interface NotificacionesPorUsuarioRequest {
    usuarioId: number;
}
export interface NotificacionesPorUsuarioResponse {
    notificaciones: Notificacion[];
}

export interface Notificacion {
    id: number;
    titulo: string;
    usuarioId: number;
    tareaId: number;
}