import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApirService } from 'src/app/services/apir.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    public activeRouter: ActivatedRoute,
    public router: Router,
    public apir: ApirService
  ) {}

  ngOnInit(): void {
    /* Obtenemos el id para pasarselo a la ruta */
    let subID = this.activeRouter.snapshot.paramMap.get('id');
    console.log(subID);
    this.getSub(subID || '');
    /* Alerta de que esta cargando la informacion */
    Swal.fire({
      title: 'Cargando Datos',
      html: 'Por favor espere un momento',
      timer: 2000,
      timerProgressBar: true,
    });
  }
/*  Consultamos la informacion de un usuario pasando la ID anteriormente obteninad al link del API */
  getSub(id: string) {
    console.log(id);
    let response = this.apir.getSub(id);
    response.subscribe((res: any) => {
      this.apir.subs = res;
      console.log(res);
    });
  }
}
