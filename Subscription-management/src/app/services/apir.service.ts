import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwtDecode from "jwt-decode"


@Injectable({
  providedIn: 'root'
})
export class ApirService {
url = 'https://lab.app.invertebrado.co/api/'


  constructor(public http:HttpClient, public router:Router, private cookies:CookieService) {


   }
    /* Funcion de Login */
  login(user:any):Observable<any>{
    return this.http.post('https://lab.app.invertebrado.co/api/account/login',user)
  }

/* Funcion para decodificar el Token */
  decodeToken(): any {
    let token = localStorage.getItem('token');
    let decoded = jwtDecode(token || 'Error en token'); // retornar el payload del token
    return decoded;
  }
  setToken(token: string ) {
    this.cookies.set("token", token);
    
  }
  getToken() {
    return this.cookies.get("token");
  }

  getUserLogged() {
    const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token
  }

}



   



