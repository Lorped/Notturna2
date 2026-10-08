import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RubricaService {

  private http = inject(HttpClient);


  getrubrica<T>(idutente: number) {
    return this.http.get<T>('https://www.roma-by-night.it/Notturna2/wsPHP/getrubrica.php'+'?idutente='+idutente );
  }
  delrubrica (idrubrica: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/delrubrica.php'+'?idrubrica='+idrubrica );
  }
  addrubrica<T> ( idutente: number , contatto: string , email:number , cell: number, home:number , note: string ) {
    return this.http.post<T>('https://www.roma-by-night.it/Notturna2/wsPHP/addrubrica.php', {
      idutente: idutente,
      contatto: contatto,
      email: email,
      cell: cell,
      home: home,
      note: note
    });
  }
  changerubrica ( idrubrica: number , contatto: string , cell: number, email:number ,  home:number , note: string ) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/changerubrica.php', {
      idrubrica: idrubrica,
      contatto: contatto,
      email: email,
      cell: cell,
      home: home,
      note: note
    });
  }
}
