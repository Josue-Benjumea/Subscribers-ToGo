import { Component } from '@angular/core';
import { ApirService } from 'src/app/services/apir.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  UserName: string = '';
  Password: string = '';


  constructor(public apir:ApirService, public router:Router){}

  /* Realizamos una funcionque nos permitira iniciar sesion validando los datos del usuario */
  login() {
    const user = {Username: this.UserName, Password: this.Password};
    /* Validamos que el usuario rellene todos los campos */
    if(this.UserName === "" || this.Password === ""){
     Swal.fire({
      icon:'error',
      title:'Po favor rellene todos los campos',
      text:'Something went wrong!',
     })
    }
    else{
    this.apir.login(user).subscribe(  data => {
      this.apir.setToken(data.Token);
      this.router.navigateByUrl('/home');
      console.log(data)
    
      
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: error.error.error,
        text: 'Something went wrong!',
      });
    }
  );
    };
  }
}
