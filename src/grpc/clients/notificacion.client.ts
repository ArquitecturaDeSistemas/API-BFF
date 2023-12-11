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
import { CrearNotificacionRequest, EliminarNotificacionRequest, ListarNotificacionesRequest, ListarNotificacionesResponse, NotificacionRequest, NotificacionResponse, NotificacionesPorUsuarioRequest, NotificacionesPorUsuarioResponse, RespuestaEliminacion } from '../interfaces/notificaciones.dto';
import { CircuitBreakerService } from 'src/circuit-breaker/circuit-breaker/circuit-breaker.service';

interface INotificacionService {
  crearNotificacion(request: CrearNotificacionRequest): Observable<NotificacionResponse>;
  obtenerNotificacion(request: NotificacionRequest): Observable<NotificacionResponse>;
  listarNotificaciones(request: ListarNotificacionesRequest): Observable<ListarNotificacionesResponse>;
  eliminarNotificacion(request: EliminarNotificacionRequest): Observable<RespuestaEliminacion>;
  notificacionesPorUsuario(request: NotificacionesPorUsuarioRequest): Observable<NotificacionesPorUsuarioResponse>;
}

@Injectable()
export class NotificacionClient implements OnModuleInit {
  public notificacionService: INotificacionService;


  constructor(
    //el inject es para inyectar el servicio de usuario
    //que se encuentra en el archivo user.proto
    //inyectar significa que se puede utilizar en el proyecto
    @Inject('NOTIFICACION_SERVICE') private client: ClientGrpc,
    private circuitBreakerService: CircuitBreakerService
    ) {}

  onModuleInit() {
    this.notificacionService = this.client.getService<INotificacionService>('NotificacionService');
  }

  createNotificacion(data: CrearNotificacionRequest): Observable<NotificacionResponse> {
    const createNotificacionObservable = new Observable<NotificacionResponse>(observer => {
      this.notificacionService.crearNotificacion(data).subscribe(
        response => observer.next(response),
        error => observer.error(error),
        () => observer.complete()
      );
    });

    return this.circuitBreakerService.createCircuitBreaker(createNotificacionObservable)
      .pipe(
        tap(() => console.log('Circuit breaker passed')),
        catchError(error => {
          console.error('Circuit breaker failed:', error);
          throw error;
        }),
      );  
  }

  obtenerNotificacion(data: NotificacionRequest): Observable<NotificacionResponse> {
    const obtenerNotificacionObservable = new Observable<NotificacionResponse>(observer => {
      this.notificacionService.obtenerNotificacion(data).subscribe(
        response => observer.next(response),
        error => observer.error(error),
        () => observer.complete()
      );
    });

    return this.circuitBreakerService.createCircuitBreaker(obtenerNotificacionObservable)
      .pipe(
        tap(() => console.log('Circuit breaker passed')),
        catchError(error => {
          console.error('Circuit breaker failed:', error);
          throw error;
        }),
      );  
  }

    listarNotificaciones(data: ListarNotificacionesRequest): Observable<ListarNotificacionesResponse> {
        const listarNotificacionesObservable = new Observable<ListarNotificacionesResponse>(observer => {
        this.notificacionService.listarNotificaciones(data).subscribe(
            response => observer.next(response),
            error => observer.error(error),
            () => observer.complete()
        );
        });
    
        return this.circuitBreakerService.createCircuitBreaker(listarNotificacionesObservable)
        .pipe(
            tap(() => console.log('Circuit breaker passed')),
            catchError(error => {
            console.error('Circuit breaker failed:', error);
            throw error;
            }),
        );  
    }
    eliminarNotificacion(data: EliminarNotificacionRequest): Observable<RespuestaEliminacion> {
        const eliminarNotificacionObservable = new Observable<RespuestaEliminacion>(observer => {
        this.notificacionService.eliminarNotificacion(data).subscribe(
            response => observer.next(response),
            error => observer.error(error),
            () => observer.complete()
        );
        });
    
        return this.circuitBreakerService.createCircuitBreaker(eliminarNotificacionObservable)
        .pipe(
            tap(() => console.log('Circuit breaker passed')),
            catchError(error => {
            console.error('Circuit breaker failed:', error);
            throw error;
            }),
        );  
    }
    
    notificacionesPorUsuario(data: NotificacionesPorUsuarioRequest): Observable<NotificacionesPorUsuarioResponse> {
        const notificacionesPorUsuarioObservable = new Observable<NotificacionesPorUsuarioResponse>(observer => {
        this.notificacionService.notificacionesPorUsuario(data).subscribe(
            response => observer.next(response),
            error => observer.error(error),
            () => observer.complete()
        );
        });
    
        return this.circuitBreakerService.createCircuitBreaker(notificacionesPorUsuarioObservable)
        .pipe(
            tap(() => console.log('Circuit breaker passed')),
            catchError(error => {
            console.error('Circuit breaker failed:', error);
            throw error;
            }),
        );  
    }

}