import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { subsI } from 'src/app/models/subs/subs.model';
import { ApirService } from 'src/app/services/apir.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  constructor(
    public activerouter: ActivatedRoute,
    public router: Router,
    public apir: ApirService
  ) {}
  /* Obtenemos el ID del suscriptor a editar */
  subData: subsI | any;
  subId = this.activerouter.snapshot.paramMap.get('id');
  /* Creamos un forgroup con la estructura que recibe el api para poder caputrar y enviar los datos */
  edit = new FormGroup({
    Id: new FormControl(''),
    Name: new FormControl(''),
    Email: new FormControl(''),
    CountryCode: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Area: new FormControl(''),
    JobTitle: new FormControl(''),
    Topics: new FormControl([]),
  });

  ngOnInit(): void {
    /* Obtener el Id */
    let subID =
      this.activerouter.snapshot.paramMap.get(
        'id'
      ); /* guardamos el id en una variable rapida */
    /* Obtener Token */
    let token = this.getToken();
    /* Obtener Informacion de 1 usuario  y la almacenamos en data*/
    this.apir.getSub(subID).subscribe((data) => {
      this.subData =
        data; /* Igualamos el modelo de usuario con la data obtenida */
      /* Editamos la data de 1 usuario obtenida con */
      this.edit.patchValue({
        /* A la data obtenida con un patchvalue le hacemos cambios y retornamos */
        Id: this.subData.Id,
        Name: this.subData.Name,
        Email: this.subData.Email,
        CountryCode: this.subData.CountryCode,
        PhoneNumber: this.subData.PhoneNumber,
        Area: this.subData.Area,
        JobTitle: this.subData.JobTitle,
        Topics: this.subData.Topics,
      });
    });
  }

  /* Obtener El Token */

  getToken() {
    return localStorage.getItem('token');
  }
  /* Enviar los cambios */
  postForm(form: any, id: any) {
    this.apir.updateSub(form, id).subscribe((data) => {
      /* Alerta de que los cambios han sido enviados */
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Los cambios han sido guardados',
        showConfirmButton: false,
        timer: 3000,
      });
    });
  }
}
