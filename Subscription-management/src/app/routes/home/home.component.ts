import { Component, OnInit } from '@angular/core';
import { ApirService } from 'src/app/services/apir.service';
import { NgForm } from '@angular/forms';
import { last } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { subsI } from 'src/app/models/subs/subs.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public apir: ApirService, private router: Router) {}

  ngOnInit(): void {
    this.getSubs();
  }

  /* Captura de datos */
  Edit = new FormGroup({
    Id: new FormControl(''),
    Name: new FormControl(''),
    Email: new FormControl(''),
    CountryCode: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Area: new FormControl(''),
    JobTitle: new FormControl(''),
    Topics: new FormControl([]),
  });

  subs: subsI[] | undefined;
  public page: number = 0;
  public search: string = '';

  /* Filtro De Pagina Siguiente */
  nextPage() {
    this.page += 3;
  }

  /* Filtro De Pagina Anterior */
  prevPage() {
    if (this.page > 0) this.page -= 3;
  }

  /* Filtro Busqueda Por Nombre */
  searchName(search: string) {
    this.page = 0;
    this.search = search;
  }

  /* Obtenemos suscriptores */
  getSubs() {
    let response = this.apir.getSubscribers();

    response.subscribe((res: any) => {
      this.apir.subs = res;
      console.log(this.apir.subs);
    });
  }
  /* Editamos Suscriptores */
  edit(id: number) {
    this.router.navigate(['edit', id]);
  }
  details(id: number) {
    this.router.navigate(['details', id]);
  }

  /*Eliminar Sub  */
  delete(id: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar el elemento?',
      text: 'Esta accion no se podra deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        let data: any = this.Edit.value;
        this.apir.deleteSub(data, id).subscribe((res: any) => {
          this.getSubs();
        });

        Swal.fire(
          'Borrado',
          'El elemento ha sido borrado exitsoamente',
          'success'
        );
      }
    });
  }

  /* Navegar a creacion de  Suscriptores */
  newSub() {
    this.router.navigate(['nuevo']);
  }
  /* Navegar a consulta de  paises */
  countries() {
    this.router.navigate(['countries']);
  }
}
