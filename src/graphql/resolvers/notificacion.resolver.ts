/* eslint-disable prettier/prettier */

/**
  - Aplicación que usa GraphQL para comunicarse
  con el servicio de notificación.
  - Define los resolvers para las operaciones
  - Cada resolver es una funcion que se encarga
  de obtener los datos requeridos para un campo específico
  cuando se realiza una query o mutation GraphQL.
  Interactúa con user.service.ts para obtener o modificar
  los datos necesarios y luego devuelve esos datos
  en el formato esperado por el esquema de GraphQL.

  - ES EL PUENTE ENTRE EL CLIENTE Y EL SERVICIO DE notificación
  (GraphQL - Resolver - Lógica de negocios)
 */

  import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
  import { RespuestaEliminacion } from '../models/salidas';
  import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { NotificacionClient } from 'src/grpc/clients/notificacion.client';
import { CrearNotificacionRequest } from 'src/grpc/interfaces/notificaciones.dto';
import { CrearNotificacionInput } from '../models/noti.inputs';
import { NotificacionModel } from '../models/notificacion.model';
import { UserClient } from 'src/grpc/clients/user.client';
  
  
  @Resolver(() => NotificacionModel)
  export class NotificacionResolver {
    constructor(
      private notificacionClient: NotificacionClient,
      private userClient: UserClient
      ) {}
  
    @Query(() => NotificacionModel)
    obtenerNotificacion(@Args('id') id: number): Observable<NotificacionModel> {
      return this.notificacionClient.obtenerNotificacion({ id }).pipe(
        map((response) => this.transformNotificacionResponse(response)),
        catchError((error) => {
          console.log('Error al obtener notificación', error);
          throw new Error('Error al obtener notificación');
        }),
      )
    }
  
    @Query(() => [NotificacionModel])
    listarNotificaciones(): Observable<NotificacionModel[]> {
        return this.notificacionClient.listarNotificaciones({}).pipe(
            map((response) => response.notificaciones.map((notificacion) => this.transformNotificacionResponse(notificacion))),
            catchError((error) => {
            console.log('Error al obtener notificaciones', error);
            throw new Error('Error al obtener notificaciones');
            }),
        );
        }

    @Query(() => [NotificacionModel])
    notificacionesPorUsuario(@Args('usuarioId') usuarioId: number): Observable<NotificacionModel[]> {
        return this.notificacionClient.notificacionesPorUsuario({ usuarioId }).pipe(
            map((response) => response.notificaciones.map((notificacion) => this.transformNotificacionResponse(notificacion))),
            catchError((error) => {
            console.log('Error al obtener notificaciones', error);
            throw new Error('Error al obtener notificaciones');
            }),
        );
        }
  
    // @Mutation(() => NotificacionModel)
    // async createNotificacion(@Args('crearNotificacionInput') input: CrearNotificacionInput): Observable<NotificacionModel> {
    //   const usuarioExiste = await this.verificarUsuarioExiste(input.usuarioId.toString())
    //   if(!usuarioExiste){
    //     throw new Error('El usuario no existe, no se puede crear la notificación')
    //   }
      
    //   const request: CrearNotificacionRequest = {     
    //     titulo: input.titulo,
    //     usuarioId: input.usuarioId,
    //     tareaId: input.tareaId,
    //   };
  
    //   return this.notificacionClient.createNotificacion(request).pipe(
    //     map((response) => this.transformNotificacionResponse(response)),
    //     catchError((error) => {
    //       console.log('Error al crear notificación', error);
    //       throw new Error('Error al crear el notificación');
    //     }),
    //   );
    // }
  
  
    @Mutation(() => NotificacionModel)
createNotificacion(@Args('crearNotificacionInput') input: CrearNotificacionInput): Observable<NotificacionModel> {
  // Verificar primero si el usuario existe
  return this.userClient.getUser({ id: input.usuarioId.toString() }).pipe(
    // el switchmap es para que se ejecute el siguiente observable
    // en caso de que el anterior se complete
    // en palabras simples, si el usuario existe, se ejecuta el siguiente observable
    switchMap(() => {
      // Usuario existe, procede a crear la notificación
      const request: CrearNotificacionRequest = {     
        titulo: input.titulo,
        usuarioId: input.usuarioId,
        tareaId: input.tareaId,
      };

      return this.notificacionClient.createNotificacion(request).pipe(
        map((response) => this.transformNotificacionResponse(response)),
      );
    }),
    catchError((error) => {
      // Error al obtener usuario, posiblemente no exista
      console.log('Error al verificar usuario', error);
      return throwError(() => new Error('El usuario no existe, no se puede crear la notificación'));
    })
  );
  }

    @Mutation(() => RespuestaEliminacion)
    deleteNotificacion(@Args('id') id: number): Observable<RespuestaEliminacion> {
      return this.notificacionClient.eliminarNotificacion({ id }).pipe(
        map((response) => this.transformEliminacionRespuesta(response)),
        catchError((error) => {
          console.log('Error al eliminar notificación', error);
          throw new Error('Error al eliminar el notificación');
        }),
      );
    }

    
  
  
  
    private transformNotificacionResponse(response: any): NotificacionModel {
      if(!response){
        throw new Error('No se encontró el notificación');
      }
      return {
        id: response.id,
        titulo: response.titulo,
        usuarioId: response.usuarioId,
        tareaId: response.tareaId,
      };
    }
  
    private transformEliminacionRespuesta(response: any): RespuestaEliminacion {
      return {
        mensaje: response.mensaje,
          };
    }

  
  }