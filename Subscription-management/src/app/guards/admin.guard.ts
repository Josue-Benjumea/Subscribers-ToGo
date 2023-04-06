import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

 constructor(public router:Router){}
/* Validamos si esta logueado por medio del token, si si damos accesso con un true a ciertas rutas */
  canActivate(){

    let token = localStorage.getItem('token') || ""

    if(token){
      return true
    }

    this.router.navigate(['/login'])
    return false

  }

}
