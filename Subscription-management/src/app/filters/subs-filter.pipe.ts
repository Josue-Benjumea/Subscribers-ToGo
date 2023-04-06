import { Pipe, PipeTransform } from '@angular/core';
import { subsI } from '../models/subs/subs.model';

@Pipe({
  name: 'subsFilter',
})
export class SubsFilterPipe implements PipeTransform {
  transform(subs: subsI[], page: number = 0, search: string = ''): subsI[] {
    /* Validamos que la el filtro no este vacio */
    if (search.length === 0) {
      return subs.slice(page, page + 3);
    } else {
      /* Verficamos si la opcion esta dentro de la busqueda */
      const subsFiltered = subs.filter((sub) => sub.Name.includes(search));
      const subsFilteredByEmail = subs.filter((sub) =>
        sub.Email.includes(search)
      );
      const subsFilterdByPhone = subs.filter((sub) =>
        sub.PhoneNumber.includes(search)
      );
      /*Retornamos la busqueda con slide de control de paginacion  */
      return subsFiltered.slice(page, page + 5);
    }
  }
}
