import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalStatus } from '../global';

export class Chatrow {
  ID: number;
  utente: number;
  nomepg: string;
  Ora: string;
  Testo: string;
  Destinatario: string;
  constructor(
    aID: number,
    autente: number,
    anomepg: string,
    aOra: string,
    aTesto: string,
    aDestinatario: string,
  ) {
    this.ID = aID;
    this.utente = autente;
    this.nomepg = anomepg;
    this.Ora = aOra;
    this.Testo = aTesto;
    this.Destinatario = aDestinatario;
  }
}

export class MyChat {
  Statuschat = 0;
  Listachat: Chatrow[] = [];
  Last = 0;
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private http = inject(HttpClient);
  private globalstatus = inject(GlobalStatus);

  

  getchat<T>() {
    return this.http.post<T>('https://www.roma-by-night.it/Notturna2/wsPHP/dadi.php', {
      last: this.globalstatus.Last
    });
  }
  master2user(destinatario: string, testo:string){
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/master2user.php', {
      destinatario: destinatario,
      testo: testo
    });
  }
  lanciadado() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/lanciadado.php');
  }
}
