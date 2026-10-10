import { Pipe, PipeTransform } from '@angular/core';
import { FullDisciplina } from './global';

@Pipe({
    name: 'nonecrotaum',
    standalone: false
})
export class NonecrotaumPipe implements PipeTransform {

  transform(items: FullDisciplina[]): FullDisciplina[] {
    if (!items ) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter((item) => this.applyFilter(item));
  }

  applyFilter(item: FullDisciplina): boolean {
    return item.disciplina.iddisciplina != 98 && item.disciplina.iddisciplina != 99;
  }

}
