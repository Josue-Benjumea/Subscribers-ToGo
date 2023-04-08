import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { subsI } from 'src/app/models/subs/subs.model';
import { ApirService } from 'src/app/services/apir.service';
import { ResponseI } from 'src/app/models/response/response.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CreateSubI } from 'src/app/models/create/create.model';
import { jsDocComment } from '@angular/compiler';
import { Observable, map, of } from 'rxjs';
import { AnyArray, hh } from 'mongoose';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-create-sub',
  templateUrl: './create-sub.component.html',
  styleUrls: ['./create-sub.component.css'],
})
export class CreateSubComponent {
  createSubs: CreateSubI[] | any;

  constructor(
    public apir: ApirService,
    public router: Router,
    private http: HttpClient
  ) {
    /* Inicializamos los valores que necesitaremos para crear un usuario */
    (this.Email = ''),
      (this.Name = ''),
      (this.CountryCode = ''),
      (this.PhoneNumber = ''),
      (this.JobTitle = ''),
      (this.Area = ''),
      (this.Topics = []);
  }
  ngOnInit(): void {

  }

  /* Definimos los tipos de datos  */
  Name: string;
  Email: string;
  CountryCode: string;
  PhoneNumber: string;
  JobTitle: string;
  Area: string;
  Topics: string[];


  /*Creamos la funcion para capturar y enviar los datos  */
  onSubmit() {
    const Subscribers = [
      {
        /* Guradamos los datos objtenidos en un modelo para enviarlo en el body */
        Name: this.Name,
        Email: this.Email,
        CountryCode: this.CountryCode,
        PhoneNumber: this.PhoneNumber,
        JobTitle: this.JobTitle,
        Area: this.Area,
        Topics: this.Topics,
      },
    ];
    /* Validamos que se rellenen los datos requeridos */
    if (!this.Name || !this.Email || !this.CountryCode || !this.PhoneNumber) {
      /* Alerta cuando no se llenan */
      Swal.fire({
        icon: 'error',
        title: 'Rellena los campos',
        text: 'Nombre, Email, Codigo de pais y telefono son requeridos',
      });
    } else {
      /* En caso de que se llenen completos se hara el post */
      this.http
        .post('https://lab.app.invertebrado.co/api/Subscribers', {
          Subscribers,
        })
        .subscribe((res) => {
          if(res)
          Swal.fire(
            'Creado',
            'El Suscriptor ha sido agregado exitosamente',
            'success'
          ) ;
        });


    }
  }


}
