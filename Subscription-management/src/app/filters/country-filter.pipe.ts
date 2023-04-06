import { Pipe, PipeTransform } from '@angular/core';
import { countryI } from '../models/countries/countries.model';

@Pipe({
  name: 'countryFilter',
})
export class CountryFilterPipe implements PipeTransform {
  transform(
    countries: countryI[],
    page: number = 0,
    search: string = ''
  ): countryI[] {
    if (search.length === 0) {
      return countries.slice(page, page + 6);
    } else {
      const subsFiltered = countries.filter((coun) =>
        coun.Name.includes(search)
      );

      return subsFiltered.slice(page, page + 6);
    }
  }
}
