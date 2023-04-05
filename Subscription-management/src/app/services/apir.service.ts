import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LoginI } from '../models/login/login.module';
import { ResponseI } from '../models/response/response.module';
import { subsI } from '../models/subs/subs.module';

@Injectable({
  providedIn: 'root',
})
export class ApirService {
  url = 'https://lab.app.invertebrado.co/api/';
  subs: any;
  currentSub: subsI | undefined;

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookies: CookieService
  ) {}

  /* Funcion de Login */
  login(form: LoginI): Observable<ResponseI> {
    return this.http.post<ResponseI>(
      'https://lab.app.invertebrado.co/api/account/login',
      form
    );
  }

  /* Obtener Suscriptres */
  getSubscribers(): Observable<subsI[]> {
    return this.http.get<subsI[]>(`${this.url}subscribers`);
  }

  /* Consultar 1 suscriptor */
  getSub(id: any): Observable<subsI> {
    return this.http.get<subsI>(`${this.url}subscribers/${id}`);
  }

  /* Actualizar Suscriptor */
  updateSub(form: subsI, id: any): Observable<ResponseI> {
    return this.http.put<ResponseI>(`${this.url}subscribers/${id}`, form);
  }
/* Eliminar Suscriptor */
  deleteSub(form: subsI, id: any): Observable<ResponseI> {
    let Options = {
      Headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      body: form,
    };
    return this.http.delete<ResponseI>(
      `${this.url}subscribers/${id}`,
      Options
    );
  }

  /* Agregar Suscriptor */
  createSub(form:string):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}subscribers/`,form)
  }
}
