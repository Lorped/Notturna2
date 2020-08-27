import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  getpersonaggio() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getpersonaggio.php' );
  }

  getnome(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getnome.php'+'?idutente='+idutente  );
  }

  getchance() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getchance.php' );
  }

  putchance(chance: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/putchance.php',{
      chance: chance
    });
  }

  listoggetti() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/listoggetti.php' );
  }

  cancellaoggetto(idoggetto: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/cancellaoggetto.php',{
      idoggetto: idoggetto
    });
  }

  addoggetto(nomeoggetto: string, descrizione: string, fissomobile: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addoggetto.php',{
      nomeoggetto: nomeoggetto,
      descrizione: descrizione,
      fissomobile: fissomobile
    });
  }

  getcondizioni() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getcondizioni.php' );
  }

  addcondizione(idoggetto: number, tipocond: string, tabcond: number, valcond: number, descrX: string, risp: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addcondizione.php',{
      idoggetto: idoggetto,
      tipocond: tipocond,
      tabcond: tabcond,
      valcond: valcond,
      descrX: descrX,
      risp: risp
    });
  }

  cancellacondizione(idcondizione: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/cancellacondizione.php',{
      idcondizione: idcondizione
    });
  }

  adddomanda(idoggetto: number, domanda: string, r1: string, r2: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/adddomanda.php',{
      idoggetto: idoggetto,
      domanda: domanda,
      r1: r1,
      r2: r2
    });
  }

  cancdomanda(idoggetto: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/cancdomanda.php',{
      idoggetto: idoggetto
    });
  }

  cancpregio(idutente: number, idpregio: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/cancpregio.php',{
      idutente: idutente,
      idpregio: idpregio
    });
  }

  addpregioadmin(idutente: number, idpregio: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addpregioadmin.php',{
      idutente: idutente,
      idpregio: idpregio
    });
  }


}
