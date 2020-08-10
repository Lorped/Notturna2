import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  Background, Contatti, Disciplina, Taumaturgia, Necromanzia, Skill, Basicpg} from '../global';


@Injectable({
  providedIn: 'root'
})
export class SchedaService {

  constructor(private http: HttpClient) { }

  getregistra () {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getregistra.php' );
  }

  putregistra ( aPG: Basicpg , bg: Array<Background> , cont: Array<Contatti> ,
    discipline: Array<Disciplina> , taumaturgie: Array<Taumaturgia> , necromanzie: Array<Necromanzia> ,
    attitudini: Array<Skill> , skill: Array<Skill> ) {

    let idutente = sessionStorage.getItem('NotturnaUser');


    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/putregistra.php', {
      idutente: idutente,
      aPG: aPG,
      bg: bg,
      cont: cont,
      discipline: discipline,
      taumaturgie: taumaturgie,
      necromanzie: necromanzie,
      attitudini: attitudini,
      skill: skill
    });
  }

  getscheda (idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getscheda.php'+"?idutente="+idutente );
  }

  checkpoteri (idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/checkpoteri.php'+"?idutente="+idutente );
  }

  getpoteri (idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/poteri.php'+"?idutente="+idutente );
  }

  addpotere (idutente: number , idpotere: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addpotere.php',{
      idutente: idutente,
      idpotere: idpotere
    });
  }

  getlogpx (idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getlogpx.php'+"?idutente="+idutente );
  }

  gettaum (idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/gettaum.php'+"?idutente="+idutente );
  }

  addattr (idutente: number , attributo: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addattr.php',{
      idutente: idutente,
      attributo: attributo
    });
  }

}
