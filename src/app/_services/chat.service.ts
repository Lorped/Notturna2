import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalStatus } from '../global';

export class Chatrow {
  ID: number;
  utente: number;
  nomepg: string;
  Ora: string;
  Testo: string;
  Destinatario: number;
  constructor(
    aID: number,
    autente: number,
    anomepg: string,
    aOra: string,
    aTesto: string,
    aDestinatario: number,
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
  Listachat: Array<Chatrow> = [];
  Last = 0;
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private globalstatus: GlobalStatus) { }

  getchat() {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/dadi.php', {
      last: this.globalstatus.Last
    });
  }
}
