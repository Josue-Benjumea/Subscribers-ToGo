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

  ngOnInit(): void {
    this.getCountries();
  }
  public countries: countryI[] = [];
  public page: number = 0;
  public search: string = '';
  public searchpage: number | any = 0;

  /* Obtenemos suscriptores */
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
    if (this.page > 0) this.page -= 3;
  }

  /* Filtro Busqueda Por Nombre */
  searchName(search: string) {
    this.search = search;
    console.log(search);
  }

  cattch(page: any) {
    if (page === '') {
      page = 1;
    }
    this.searchpage = page;
    let response = this.apir.getCountriesPage(page);
    response.subscribe((res: any) => {
      this.apir.countries = res;
      console.log(this.apir.countries);
    });
  }

  reset() {
    window.location.reload();
  }
}
