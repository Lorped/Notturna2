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

  getnecrotaum (idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getnecrotaum.php'+"?idutente="+idutente );
  }

  addattr (idutente: number , attributo: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addattr.php',{
      idutente: idutente,
      attributo: attributo
    });
  }

  addpx (idutente: number , px: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addpx.php',{
      idutente: idutente,
      px: px
    });
  }

  adddisciplina (idutente: number , iddisciplina: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/adddisciplina.php',{
      idutente: idutente,
      iddisciplina: iddisciplina
    });
  }

  addtaum (idutente: number , idtaum: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addtaum.php',{
      idutente: idutente,
      idtaum: idtaum
    });
  }

  newtaum (idutente: number , idtaum: string , principale: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/newtaum.php',{
      idutente: idutente,
      idtaum: idtaum,
      principale: principale
    });
  }

  addnecro (idutente: number , idnecro: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addnecro.php',{
      idutente: idutente,
      idnecro: idnecro
    });
  }

  newnecro (idutente: number , idnecro: string , principale: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/newnecro.php',{
      idutente: idutente,
      idnecro: idnecro,
      principale: principale
    });
  }

}
