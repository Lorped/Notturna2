import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  Rubricaitem } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RubricaService {

  constructor(private http: HttpClient) { }

  getrubrica (idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getrubrica.php'+'?idutente='+idutente );
  }
  delrubrica (idrubrica: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/delrubrica.php'+'?idrubrica='+idrubrica );
  }
  addrubrica ( idutente: number , contatto: string , email:number , cell: number, home:number , note: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addrubrica.php', {
      idutente: idutente,
      contatto: contatto,
      email: email,
      cell: cell,
      home: home,
      note: note
    });
  }
  changerubrica ( idrubrica: number , contatto: string , cell: number, email:number ,  home:number , note: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/changerubrica.php', {
      idrubrica: idrubrica,
      contatto: contatto,
      email: email,
      cell: cell,
      home: home,
      note: note
    });
  }
}
