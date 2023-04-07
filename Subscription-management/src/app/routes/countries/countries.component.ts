import { Component, OnInit } from '@angular/core';
import { ApirService } from 'src/app/services/apir.service';
import { NgForm } from '@angular/forms';
import { last } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { countryI } from 'src/app/models/countries/countries.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent {
  constructor(public apir: ApirService, private router: Router) {}
  /* Obtenemos los paises al cargar la pagina */
  ngOnInit(): void {
    this.getCountries();
    Swal.fire({
      title: 'Cargando Datos',
      html: 'Por favor espere un momento',
      timer: 2000,
      timerProgressBar: true,
    });

  }
  public countries: countryI[] =
    []; /* Variable paises que de tipo modelo de paises */
  public page: number = 0; /* Variable para modificar la paginacion */
  public search: string = ''; /* Variable para manejar los filtros */
  public searchpage:
    | number
    | any = 0; /* Variable para manejar el filtro de pagina del API */

  /* Obtenemos paises */
  getCountries() {
    let response = this.apir.getCountries();
    response.subscribe((res: any) => {
      this.apir.countries = res;
      console.log(this.apir.countries);
    });
  }

  /* Filtro De Pagina Siguiente */
  nextPage() {
    this.page += 3;
  }

  /* Filtro De Pagina Anterior */
  prevPage() {
    if (this.page > 0)
      this.page -= 3; /* Si la pagina no es 1 ira una pagina atras */
  }

  /* Filtro Busqueda Por Nombre */
  searchName(search: string) {
    /* Escucha al input con el onkey para saber el que se esta buscado */
    this.search = search; /* Almacenamos la buscqueda en la variable local */
    console.log(search);
  }

  cattch(page: any) {
    /* Escuchamos al input para saber que pagina se esta buscando */
    if (page === '') {
      page = 1;
    }
    this.searchpage = page;
    let response =
      this.apir.getCountriesPage(
        page
      ); /* Le mandamos la pagina al API para que nos traiga la info respectiva */
    response.subscribe((res: any) => {
      this.apir.countries = res;
      console.log(this.apir.countries);
    });
  }
  /* Reseteamos los filtros */
  reset() {
    window.location.reload();
  }


}
