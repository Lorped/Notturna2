import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  Background, Contatti, Disciplina, Taumaturgia, Necromanzia, Skill, Basicpg} from '../global';


@Injectable({
  providedIn: 'root'
})
export class SchedaService {

  constructor(private http: HttpClient) { }

  getregistra() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getregistra.php' );
  }

  putregistra( aPG: Basicpg , bg: Array<Background> , cont: Array<Contatti> ,
    discipline: Array<Disciplina> , taumaturgie: Array<Taumaturgia> , necromanzie: Array<Necromanzia> ,
    attitudini: Array<Skill> , skill: Array<Skill> ) {

    const idutente = sessionStorage.getItem('NotturnaUser');


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

  getscheda(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getscheda.php'+'?idutente='+idutente );
  }

  checkpoteri(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/checkpoteri.php'+'?idutente='+idutente );
  }

  getpoteri(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/poteri.php'+'?idutente='+idutente );
  }

  addpotere(idutente: number , idpotere: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addpotere.php',{
      idutente: idutente,
      idpotere: idpotere
    });
  }

  getlogpx(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getlogpx.php'+'?idutente='+idutente );
  }

  geteventi(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/geteventi.php'+'?idutente='+idutente );
  }

  getnecrotaum(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getnecrotaum.php'+'?idutente='+idutente );
  }

  addattr(idutente: number , attributo: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addattr.php',{
      idutente: idutente,
      attributo: attributo
    });
  }

  addpx(idutente: number , px: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addpx.php',{
      idutente: idutente,
      px: px
    });
  }

  adddisciplina(idutente: number , iddisciplina: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/adddisciplina.php',{
      idutente: idutente,
      iddisciplina: iddisciplina
    });
  }

  addtaum(idutente: number , idtaum: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addtaum.php',{
      idutente: idutente,
      idtaum: idtaum
    });
  }

  newtaum(idutente: number , idtaum: string , principale: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/newtaum.php',{
      idutente: idutente,
      idtaum: idtaum,
      principale: principale
    });
  }

  addnecro(idutente: number , idnecro: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addnecro.php',{
      idutente: idutente,
      idnecro: idnecro
    });
  }

  newnecro(idutente: number , idnecro: string , principale: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/newnecro.php',{
      idutente: idutente,
      idnecro: idnecro,
      principale: principale
    });
  }

  getotherdisc(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getotherdisc.php'+'?idutente='+idutente );
  }

  newdisc(idutente: number , iddisciplina: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/newdisc.php',{
      idutente: idutente,
      iddisciplina: iddisciplina
    });
  }

  getrituali(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getrituali.php'+'?idutente='+idutente );
  }

  newrituale(idutente: number , idrituale: string, necrotaum: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/newrituale.php',{
      idutente: idutente,
      idrituale: idrituale,
      necrotaum: necrotaum
    });
  }

  addskill(idutente: number , idskill: number, tipologia: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addskill.php',{
      idutente: idutente,
      idskill: idskill,
      tipologia: tipologia
    });
  }

  addbp(idutente: number  ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addbp.php',{
      idutente: idutente
    });
  }

  addfdv(idutente: number  ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addfdv.php',{
      idutente: idutente
    });
  }

  getpregidifetti(idutente: number ) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getpregidifetti.php'+'?idutente='+idutente );
  }

  getpregi(idutente: number ) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getpregi.php'+'?idutente='+idutente );
  }

  addpregio(idutente: number , idpregio: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addpregio.php',{
      idutente: idutente,
      idpregio: idpregio
    });
  }

  getpx(idutente: number ) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getpx.php'+'?idutente='+idutente );
  }

  getbio(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getbio.php'+'?idutente='+idutente );
  }

  putbio(idutente: number , bio: string, note: string , urldt: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/putbio.php',{
      idutente: idutente,
      bio: bio,
      note: note,
      urldt: urldt
    });
  }

  getfama(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getfama.php'+'?idutente='+idutente );
  }

  putfama (idutente: number , fama1: number, fama2: number , fama3: number, au: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/putfama.php',{
      idutente: idutente,
      fama1: fama1,
      fama2: fama2,
      fama3: fama3,
      au: au
    });
  }

  getbg(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getbg.php'+'?idutente='+idutente );
  }

  putbg(idutente: number , idback: number, livello: number , au: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/putbg.php',{
      idutente: idutente,
      idback: idback,
      livello: livello,
      au: au
    });
  }

  getcontatti(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getcontatti.php'+'?idutente='+idutente );
  }

  putcontatti(idutente: number , idcontatto: number, livello: number, au: string  ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/putcontatti.php',{
      idutente: idutente,
      idcontatto: idcontatto,
      livello: livello,
      au: au
    });
  }

  newcontatto(idutente: number , nomecontatto: string, au: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/newcontatto.php',{
      idutente: idutente,
      nomecontatto: nomecontatto,
      au: au
    });
  }

  getpassaggiostatus(idutente: number  ) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getpassaggiostatus.php'+'?idutente='+idutente );
  }

  getskill(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getskill.php'+'?idutente='+idutente );
  }

  cambiastatus(idutente: number , lista: Array<Skill> ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/cambiastatus.php',{
      idutente: idutente,
      lista: lista
    });
  }

  getsentiero(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getsentiero.php'+'?idutente='+idutente );
  }

  putfdvsentiero(idutente: number , fdv: number, sentiero: number , au: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/putfdvsentiero.php',{
      idutente: idutente,
      fdv: fdv,
      sentiero: sentiero,
      au: au
    });
  }

  newsentiero(idutente: number ,  idsentiero: string, au: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/newsentiero.php',{
      idutente: idutente,
      idsentiero: idsentiero,
      au: au
    });
  }

  cancellascheda(idutente: number  ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/cancella.php',{
      idutente: idutente
    });
  }

  getclan(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getclan.php'+'?idutente='+idutente );
  }

  putgen(idutente: number, generazione: number, au: string ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/putgen.php',{
      idutente: idutente,
      generazione: generazione,
      au: au
    });
  }

  addprimariataum (idutente: number ,  idtaum: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addprimariataum.php',{
      idutente: idutente,
      idtaum: idtaum
    });
  }
  addprimarianecro (idutente: number ,  idnecro: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addprimarianecro.php',{
      idutente: idutente,
      idnecro: idnecro
    });
  }

  listamalgame(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/listamalgame.php'+'?idutente='+idutente );
  }
  getamalgame(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getamalgame.php'+'?idutente='+idutente );
  }

  addamalgama(idutente: number , idamalgama: number ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addamalgama.php',{
      idutente: idutente,
      idamalgama: idamalgama
    });
  }


  getrisorse(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getrisorse.php'+'?idutente='+idutente );
  }

  addspesa(idutente: number , spesa: number|null , recupero: number|null ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addspesa.php',{
      idutente: idutente,
      spesa: spesa,
      recupero: recupero
    });
  }

  addcontanti(idutente: number  ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/addcontanti.php',{
      idutente: idutente
    });
  }
  mincontanti(idutente: number  ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/mincontanti.php',{
      idutente: idutente
    });
  }

  changeattr_master(idutente: number , attributo: string|null , valore: number|null ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/changeattr-master.php',{
      idutente: idutente,
      attributo: attributo,
      valore: valore
    });
  }

  changeskill_master(idutente: number , skill: number|null , valore: number|null ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/changeskill-master.php',{
      idutente: idutente,
      skill: skill,
      valore: valore
    });
  }

    changedisc_master(idutente: number , disc: number|null , valore: number|null ) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/changedisc-master.php',{
      idutente: idutente,
      disciplina: disc,
      valore: valore
    });
  }

}
