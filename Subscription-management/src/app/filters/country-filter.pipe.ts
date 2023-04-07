import { Pipe, PipeTransform } from '@angular/core';
import { countryI } from '../models/countries/countries.model';
/* Filtros locales para los paises */
@Pipe({
  name: 'countryFilter',
})
export class CountryFilterPipe implements PipeTransform {
  transform(/* Parametros */
    countries: countryI[], /* Recibe parametro de tipo modelo de paises */
    page: number = 0, /* Recibe parametro de paginas, inicializado en 0 */
    search: string = '' /* Recibe parametros para buscar por en nombre */
  ): countryI[] {
    if (search.length === 0) {/* Se valida si no esta haciendo alguna busqueda */
      return countries.slice(page, page + 6); /* En caso de que no se mostrara la pagina sin filtro pero con paginacion */
    } else {
      const subsFiltered = countries.filter((coun) => /* De caso contrario se muestra la paginacion con filtro aplicado */
        coun.Name.includes(search) /* Constante que almacena si en la busqueda aparece el nombre del pais */
      );

      return subsFiltered.slice(page, page + 6); /* Mostramos los paises en coincidencia con paginacion  */
    }
  }
}
