/* Intercepta todas las peticiones para mandar el token a travez del header */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApirService } from '../services/apir.service';
import Swal from 'sweetalert2';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public apir: ApirService) {}
  /* Pasamos el Token para todas las peticiones */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      /* En los headers por medio del bearer enviamos el token almacenado en el localStorage */
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    /* Logout automatico */
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('ERROR', err.status, err.error.error);
        /*Atrapamos el error 401 el cual se nos envia cuando el token no es valido y expira  */
        if (err.status === 401) {
          this.handler401Error(); /* En caso que pase este error, se hara un auto logout */
        }

        return throwError('ERROR EXTRA');
      })
    );
  }
  /* Funcion para el Manejo de error 401 auto logout cuando expira el token */
  private handler401Error(): Observable<any> {
    this.apir.logOut();
    Swal.fire(
      'Saliendo...',
      'Token Caducado o invalido su sesion a expirado. ',
      'error'
    );
    return throwError('ERROR 401');
  }
}
