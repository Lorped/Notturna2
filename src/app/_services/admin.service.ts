import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalStatus } from '../global';

export interface RigaPrestampa {
  IDoggetto: number;
  IDcronaca: number;
  nomeoggetto: string;
  selezionato: boolean;
  quantita: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private globalstatus = inject(GlobalStatus);



  getpersonaggio(idcronaca: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getpersonaggio.php'+'?idcronaca='+idcronaca  );
  }

  getnome(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getnome.php'+'?idutente='+idutente  );
  }

  getchance() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getchance.php' );
  }

  putchance<T>(chance: number) {
    return this.http.post<T>('https://www.roma-by-night.it/Notturna2/wsPHP/putchance.php',{
      chance: chance
    });
  }

  listoggetti() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/listoggetti.php' );
  }

  cancellaoggetto(idoggetto: number) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/cancellaoggetto.php',{
      idoggetto: idoggetto
    });
  }

  addoggetto<T>(nomeoggetto: string, descrizione: string, fissomobile: string) {
    return this.http.post<T>('https://www.roma-by-night.it/Notturna2/wsPHP/addoggetto.php',{
      nomeoggetto: nomeoggetto,
      descrizione: descrizione,
      fissomobile: fissomobile,
      cronaca:  this.globalstatus.cronacaprincipale
    });
  }

  cambiaogg(idoggetto: number, nomeoggetto: string, descrizione: string) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/changeogg.php',{
      idoggetto: idoggetto,
      nomeoggetto: nomeoggetto,
      descrizione: descrizione
    });
  } 

  getcondizioni<T>() {
    return this.http.get<T>('https://www.roma-by-night.it/Notturna2/wsPHP/getcondizioni.php' );
  }

  addcondizione<T>(idoggetto: number, tipocond: string, tabcond: number, valcond: number, descrX: string, risp: string, subskill: number) {
    return this.http.post<T>('https://www.roma-by-night.it/Notturna2/wsPHP/addcondizione.php',{
      idoggetto: idoggetto,
      tipocond: tipocond,
      tabcond: tabcond,
      valcond: valcond,
      descrX: descrX,
      risp: risp,
      subskill: subskill
    });
  }

  cancellacondizione(idcondizione: number) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/cancellacondizione.php',{
      idcondizione: idcondizione
    });
  }

  adddomanda(idoggetto: number, domanda: string, r1: string, r2: string) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/adddomanda.php',{
      idoggetto: idoggetto,
      domanda: domanda,
      r1: r1,
      r2: r2
    });
  }

  cancdomanda(idoggetto: number) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/cancdomanda.php',{
      idoggetto: idoggetto
    });
  }

  cancpregio(idutente: number, idpregio: number) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/cancpregio.php',{
      idutente: idutente,
      idpregio: idpregio
    });
  }

  addpregioadmin(idutente: number, idpregio: number) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/addpregioadmin.php',{
      idutente: idutente,
      idpregio: idpregio
    });
  }

  getfulleventi<T>() {
    return this.http.get<T>('https://www.roma-by-night.it/Notturna2/wsPHP/getfulleventi.php' );
  }

  cambiasaldo(idutente: number) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/cambiasaldo.php',{
      idutente: idutente
    });
  }

  cancellapaired(idoggetto: number) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/cancellapaired.php',{
      idoggetto: idoggetto
    });
  }

  getunpaired<T>(idoggetto: number) {
    return this.http.post<T>('https://www.roma-by-night.it/Notturna2/wsPHP/getunpaired.php',{
      idoggetto: idoggetto
    });
  }

  addpaired(idoggetto1: number, idoggetto2: number, descrizionePaired: string) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/addpaired.php',{
      idoggetto1: idoggetto1,
      idoggetto2: idoggetto2,
      descrizionePaired: descrizionePaired
    });
  }

  getlistcronache<T>() {
    return this.http.get<T>('https://www.roma-by-night.it/Notturna2/wsPHP/getlistcronache.php' );
  }

  prestampa(prestampa: RigaPrestampa[]) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/prestampa.php', prestampa);
  }

}
