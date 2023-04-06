import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { subsI } from 'src/app/models/subs/subs.model';
import { ApirService } from 'src/app/services/apir.service';
import { ResponseI } from 'src/app/models/response/response.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CreateSubI } from 'src/app/models/create/create.model';
import { jsDocComment } from '@angular/compiler';

@Component({
  selector: 'app-create-sub',
  templateUrl: './create-sub.component.html',
  styleUrls: ['./create-sub.component.css'],
})
export class CreateSubComponent {
  createSubs: CreateSubI | undefined;
  /* Capturar Datos */
  newSub = new FormGroup({
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    CountryCode: new FormControl('', Validators.required),
    PhoneNumber: new FormControl(Validators.required),
    Area: new FormControl('', Validators.required),
    JobTitle: new FormControl('', Validators.required),
    Topics: new FormControl([], Validators.required),
  });

  constructor(public apir: ApirService, public router: Router) {}

  /* Enviar Formulario */
  postForm(Form: any) {
    return this.apir.createSub(Form.value).subscribe((data) => {
      console.log(data);
    });
  }
}
