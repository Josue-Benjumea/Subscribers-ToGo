import { Component } from '@angular/core';
import { ApirService } from 'src/app/services/apir.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { LoginI } from 'src/app/models/login/login.model';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/models/response/response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });
  url = 'https://lab.app.invertebrado.co/api/account/login';

  constructor(
    public apir: ApirService,
    public router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.checkLS();
  }
/* Verficiamos si tiene token, si si lo redireccionamos */
  checkLS() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['home']);
    }
  }

  /* Realizamos una funcionque nos permitira iniciar sesion validando los datos del usuario */
  login(form: LoginI) {
    /* Validacion de Campos */
    if (!form.Password || !form.UserName) {
      Swal.fire({
        icon: 'error',
        title: 'Por Favor rellene Todos Los Campos',
        text: 'Something went wrong!',
      });
    } else {
    /* Validacion de Credenciales */
      console.log(form);
      this.apir.login(form).subscribe(
        (data) => {
          let dataResponse: ResponseI = data;
          if (dataResponse.Status === 1) {
            localStorage.setItem('token', dataResponse.Token);
            this.router.navigate(['home']);
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: error.error.error,
            text: 'Something went wrong!',
          });
        }
      );
    }
  }
}
