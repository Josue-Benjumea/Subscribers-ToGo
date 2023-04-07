import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LoginI } from '../models/login/login.model';
import { ResponseI } from '../models/response/response.model';
import { subsI } from '../models/subs/subs.model';
import { CreateSubI } from '../models/create/create.model';
import { countryI } from '../models/countries/countries.model';

@Injectable({
  providedIn: 'root',
})
export class ApirService {
  url = 'https://lab.app.invertebrado.co/api/';
  subs: any;
  countries: any;

  currentSub: subsI | any;
  currentCreate: CreateSubI;

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookies: CookieService
  ) {
    this.currentCreate = new CreateSubI();
  }

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

  /* Obtener Paises */
  getCountries(): Observable<countryI[]> {
    return this.http.get<countryI[]>(`${this.url}countries/?count=255`);
  }
  /* Obtener Paises por pagina*/
  getCountriesPage(page: any): Observable<countryI[]> {
    return this.http.get<countryI[]>(`${this.url}countries/?page=${page}`);
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
    return this.http.delete<ResponseI>(`${this.url}subscribers/${id}`, Options);
  }

  /* Agregar Suscriptor */
  createSub(form: CreateSubI): Observable<ResponseI> {
    let Options = {
      setHeaders: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      body: {
        Subscribers: ([] = [
          {
            Name: (this.currentCreate.Name = form.Name),
            Email: (this.currentCreate.Email = form.Email),
            CountryCode: (this.currentCreate.CountryCode = form.CountryCode),
            PhoneNumber: (this.currentCreate.PhoneNumber = form.PhoneNumber),
            JobTitle: (this.currentCreate.JobTitle = form.JobTitle),
            Area: (this.currentCreate.Area = form.Area),
            Topics: (this.currentCreate.Topics = form.Topics),
          },
        ]),
      },
    };
    JSON.stringify(Options.body);
    return (
      console.log(Options.body),
      this.http.post<ResponseI>(`${this.url}subscribers`, Options)
    );
  }
/* Cerrar sesion */
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    return;
  }
  /* Verifica si esta logueado */
  isLoggedIn() {
    let token = localStorage.getItem('token') || false;

    if (token) {
      return true;
    }

    return false;
  }
/* Decodifica el token */
  decodeToken(): any {
    let token = localStorage.getItem('token');
    let decoded = jwtDecode(token || 'Error en token');
    console.log(decoded); // retornar el payload del token
    return decoded;
  }
}
