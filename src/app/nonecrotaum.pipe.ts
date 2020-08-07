import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nonecrotaum'
})
export class NonecrotaumPipe implements PipeTransform {

  transform(items: any[]): any {
    if (!items ) {
      return items;
    }
          // filter items array, items which match and return true will be
          // kept, false will be filtered out
          return items.filter((item: any) => this.applyFilter(item));
  }

  applyFilter(item: any): boolean {
    if (item.disciplina.iddisciplina != 98 && item.disciplina.iddisciplina != 99 ) {
      return true;
    } else {
      return false;
    }
 }

}
