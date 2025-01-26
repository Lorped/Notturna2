import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaService, AdminService } from '../_services/index';
import { Background, Contatti, Skill, Sentiero, Pregio , GlobalStatus } from '../global';
import { UntypedFormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-risorse',
  templateUrl: './risorse.component.html',
  styleUrls: ['./risorse.component.css']
})
export class RisorseComponent implements OnInit {

  idutente = 0 ;
  nomepg = '';

  fama1 = 0 ;
  fama2 = 0 ;
  fama3 = 0 ;

  listabg: Array<Background> = [];
  listaContatti: Array<Contatti> = [];
  sommacontatti = 0;

  myContatto = new UntypedFormControl ( '', [
    Validators.required,
    Validators.pattern(/.*[^ ].*/),
  ]);

  idstatus_old = 0 ;
  status_old = '';
  fdv_old = 0 ;    // aumenterà conme fdvbase
  bloodp_old = 0 ; // aumenterà come addbp
  sete_old = 0 ;
  attivazione_old = 0 ;
  addbp_old = 0 ;
  fdvbase_old = 0 ;
  bgbase_old = 0 ;

  conoscenze_old = 0 ;


  idstatus_new = 0 ;
  status_new = '';
  attivazione_new = 0 ;
  sete_new = 0 ;
  addbp_new = 0 ;
  fdvbase_new = 0 ;
  bgbase_new = 0 ;

  bloodp_new = 0 ; // calcolato in funzione dei limiti generazionali
  fdv_new = 0 ;    // calcolato in funzione dei limiti

  conoscenze_new = 0 ;

  bloodpmax = 0 ;
  generazione = 0 ;

  matriceNumSkill: number[][] = [
    [ 20, 20, 17, 15, 13, 10, 5 ],
    [ 33, 30, 27, 25, 20, 15, 10 ],
    [ 35, 35, 33, 30, 25, 20, 15 ],
    [ 45, 45, 43, 40, 35, 30, 20 ],
    [ 55, 55, 53, 50, 45, 40, 30 ],
    [ 95, 95, 93, 90, 80, 70, 50 ]
  ];

  listaskill: Array<Skill> = [];
  listanew: Array<Skill> = [];

  listasentieri: Array<Sentiero> = [];
  sentieroPG = '';
  oldsentieroPG = '';
  valsentiero = 0 ;
  fdv = 0;

  puntidisponibili = 0;

  pregi: Array<Pregio> = [];
  difetti: Array<Pregio> = [];

  pregi_f: Array<Pregio> = [];
  pregi_m: Array<Pregio> = [];
  pregi_s: Array<Pregio> = [];
  pregi_x: Array<Pregio> = [];
  difetti_f: Array<Pregio> = [];
  difetti_m: Array<Pregio> = [];
  difetti_s: Array<Pregio> = [];
  difetti_x: Array<Pregio> = [];

  new_d_f = '';
  new_d_m = '';
  new_d_s = '';
  new_d_x = '';

  new_p_f = '';
  new_p_m = '';
  new_p_s = '';
  new_p_x = '';


  constructor(private globalstatus: GlobalStatus, private adminservice: AdminService, private schedaservice: SchedaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idutente = Number ( this.route.snapshot.paramMap.get('id') );
    this.globalstatus.lastpg = this.idutente;

    this.adminservice.getnome(this.idutente).subscribe(
      (data: any) => {
        this.nomepg = data;
      }
    );

    this.schedaservice.getfama(this.idutente).subscribe(
      (data: any) => {
        this.fama1 = Number (data.fama1);
        this.fama2 = Number (data.fama2);
        this.fama3 = Number (data.fama3);
      }
    );

    this.schedaservice.getbg(this.idutente).subscribe(
      (data: any) => {
        this.listabg = data.background;

        for ( const item of this.listabg) {
          item.livello = Number (item.livello);
        }
      }
    );

    this.schedaservice.getcontatti(this.idutente).subscribe(
      (data: any) => {
        this.listaContatti = data.contatti;

        this.sommacontatti = 0;
        for ( const item of this.listaContatti ) {
          item.livello = Number (item.livello);
          this.sommacontatti += item.livello;
        }

      }
    );

    this.schedaservice.getsentiero(this.idutente).subscribe(
      (data: any) => {
        this.listasentieri = data.sentieri;
        this.fdv = Number (data.fdvmax);
        this.valsentiero = Number (data.valsentiero);
        this.sentieroPG = data.idsentiero;
        this.oldsentieroPG = data.idsentiero;
      }
    );

    this.caricavalori();
    this.getliste();

    this.schedaservice.getpregi(this.idutente).subscribe(
      (data: any) => {
        this.pregi = data.pregi ;
        this.difetti = data.difetti ;
      }
    );

  }

  addfama(ix: number) {
    switch (ix) {
      case 1:
        this.fama1++;
        break;
      case 2:
        this.fama2++;
        break;
      case 3:
        this.fama3++;
        break;
    }

    this.schedaservice.putfama ( this.idutente, this.fama1, this.fama2, this.fama3 , 'A')
    .subscribe();
  }
  minfama(ix: number) {
    switch (ix) {
      case 1:
        this.fama1--;
        break;
      case 2:
        this.fama2--;
        break;
      case 3:
        this.fama3--;
        break;
    }

    this.schedaservice.putfama ( this.idutente, this.fama1, this.fama2, this.fama3 , 'A')
    .subscribe();
  }

  minbg(id: number){
    let newlivello = 0 ;

    for ( let item of this.listabg ){
      if ( item.idback == id){
        item.livello -- ;
        newlivello = item.livello;
      }
    }
    this.schedaservice.putbg(this.idutente, id, newlivello, 'A' ).subscribe();
  }

  addbg(id: number){
    let newlivello = 0 ;

    for ( const item of  this.listabg ){
      if ( item.idback == id) {
        item.livello ++ ;
        newlivello = item.livello;
      }
    }
    this.schedaservice.putbg(this.idutente, id , newlivello, 'A' ).subscribe();
  }

  mincon(id: number){
    // console.log (this.listaContatti);
    for ( let item of this.listaContatti  ) {
      if ( item.idcontatto == id ) {
        item.livello -- ;
        this.schedaservice.putcontatti(this.idutente, id , item.livello, 'A')
        .subscribe(
          (data) => {
            for ( let j = 0 ; j < this.listaContatti.length; j++){
              if (this.listaContatti[j].livello == 0) {
                this.listaContatti.splice(j, 1);
                // console.log (j);
                // console.log (this.listaContatti);
              }
            }
            this.sommacontatti -- ;
          }
        );
      }
    }
  }
  addcon(id: number){

    for ( const item of this.listaContatti ) {
      if ( item.idcontatto == id ) {
        item.livello ++ ;
        this.schedaservice.putcontatti(this.idutente, id, item.livello , 'A')
        .subscribe(
          (data) => {
            this.sommacontatti ++ ;
          }
        );
      }
    }
  }

  newcontatto(){
    let myNew = new Contatti();
    myNew.nomecontatto = this.myContatto.value;
    myNew.livello = 1 ;

    this.schedaservice.newcontatto(this.idutente, myNew.nomecontatto, 'A')
    .subscribe(
      (data: any) => {

        myNew.idcontatto = data ;
        this.listaContatti.push(myNew) ;
        this.myContatto.reset();
        this.sommacontatti ++ ;
      }
    );
  }

  minsk(ix: number){
    this.listanew[ix].livello -- ;
    this.puntidisponibili ++;
  }

  addsk(ix: number) {
    this.listanew[ix].livello ++ ;
    this.puntidisponibili --;
  }

  cambiastatus() {
    this.schedaservice.cambiastatus(this.idutente, this.listanew).subscribe(
      (data: any) => {
         this.caricavalori ();
      }
    );
  }


  caricavalori() {
    this.schedaservice.getpassaggiostatus(this.idutente).subscribe(
      (data: any) => {

        this.idstatus_old = Number(data.val_old.idstatus);
        this.status_old = data.val_old.status;
        this.fdv_old = Number(data.val_old.fdvmax);
        this.bloodp_old = Number(data.val_old.bloodp);
        this.sete_old = Number(data.val_old.sete);
        this.attivazione_old = Number(data.val_old.attivazione);
        this.addbp_old = Number(data.val_old.addbp);
        this.fdvbase_old = Number(data.val_old.fdvbase);
        this.bgbase_old = Number(data.val_old.bgbase);

        this.bloodpmax = Number(data.val_old.bloodpmax);
        this.generazione = Number(data.val_old.generazione);

        if ( data.val_new ) {
          this.idstatus_new = Number(data.val_new.idstatus);
          this.status_new = data.val_new.status;
          this.attivazione_new = Number(data.val_new.attivazione);
          this.sete_new = Number(data.val_new.sete);
          this.addbp_new = Number(data.val_new.addbp);
          this.fdvbase_new = Number(data.val_new.fdvbase);
          this.bgbase_new = Number(data.val_new.bgbase);

          let mygen = this.generazione;
          if (this.generazione <8) {
            mygen = 8;
          }
          this.conoscenze_old = this.matriceNumSkill [ this.idstatus_old] [14 - mygen ];
          this.conoscenze_new = this.matriceNumSkill [ this.idstatus_new] [14 - mygen ];

          this.puntidisponibili = this.conoscenze_new - this.conoscenze_old;

          this.bloodp_new = this.bloodp_old - this.addbp_old + this.addbp_new ;
          if ( this.bloodp_new  > this.bloodpmax ) {
            this.bloodp_new  = this.bloodpmax ;
          }

          this.fdv_new = this.fdv_old - this.fdvbase_old + this.fdvbase_new ;
          if ( this.fdv_new  > 10 ) {
            this.fdv_new  = 10 ;
          }
        }

      }
    );

    this.schedaservice.getskill(this.idutente).subscribe(
      (data: any) => {
        this.listaskill = data.skill;
        /*for (let j=0 ; j< this.listaskill.length ; j++) {
          this.listaskill[j].livello = Number (this.listaskill[j].livello);
        } */
        for (let item of  this.listaskill) {
          item.livello = Number (item.livello);
        }
        this.listanew.length = 0 ;
        this.listaskill.forEach(val => this.listanew.push(Object.assign({}, val)));
        /* for (let j=0 ; j< this.listanew.length ; j++) {
          this.listanew[j].livello = 0;
        } */
        for (let item of  this.listanew) {
          item.livello = 0;
        }
      }
    );
  }

  minfdv(){
    this.fdv--;
    this.schedaservice.putfdvsentiero(this.idutente, this.fdv, -1 , 'A').subscribe(
      (data: any) => {
        /* do stuff */
      }
    );
  }
  addfdv(){
    this.fdv++;
    this.schedaservice.putfdvsentiero(this.idutente, this.fdv, -1, 'A').subscribe(
      (data: any) => {
        /* do stuff */
      }
    );
  }
  minsentiero(){
    this.valsentiero--;
    this.schedaservice.putfdvsentiero(this.idutente, -1, this.valsentiero , 'A').subscribe(
      (data: any) => {
        /* do stuff */
      }
    );
  }
  addsentiero(){
    this.valsentiero++;
    this.schedaservice.putfdvsentiero(this.idutente, -1, this.valsentiero , 'A').subscribe(
      (data: any) => {
        /* do stuff */
      }
    );
  }
  changesentiero(){
    this.oldsentieroPG = this.sentieroPG;
    this.schedaservice.newsentiero(this.idutente, this.sentieroPG , 'A').subscribe(
      (data: any) => {
        /* do stuff */
      }
    );
  }

  riducigen() {
    this.generazione--;
    this.schedaservice.putgen(this.idutente, this.generazione, 'A').subscribe(
      (data: any) => {
        this.caricavalori();  // cambiano gli skill per il passaggio status
      }
    );
  }

  getliste() {
    this.schedaservice.getpregidifetti(this.idutente)
    .subscribe(
      (data: any) => {
        this.pregi_f = data.pregi_f ;
        this.pregi_m = data.pregi_m ;
        this.pregi_s = data.pregi_s ;
        this.pregi_x = data.pregi_x ;

        this.difetti_f = data.difetti_f ;
        this.difetti_m = data.difetti_m ;
        this.difetti_s = data.difetti_s ;
        this.difetti_x = data.difetti_x ;

      }
    );
  }

  cancpregio(idpregio: number){
    this.adminservice.cancpregio(this.idutente, idpregio).subscribe(
      (data) => {
        for ( let j = 0 ; j < this.pregi.length; j++){
          if ( this.pregi[j].idpregio == idpregio) {
            this.pregi.splice(j,1);
          }
        }
        for ( let j = 0 ; j < this.difetti.length; j++){
          if ( this.difetti[j].idpregio == idpregio) {
            this.difetti.splice(j,1);
          }
        }
        this.getliste();
      }
    );
  }

  newpregio(tipopregio: string){
    let idpregio = '';

    switch (tipopregio) {
      case 'df':
        idpregio = this.new_d_f;
        break;
      case 'ds':
        idpregio = this.new_d_s;
        break;
      case 'dm':
        idpregio = this.new_d_m;
        break;
      case 'dx':
        idpregio = this.new_d_x;
        break;

      case 'pf':
        idpregio = this.new_p_f;
        break;
      case 'pm':
        idpregio = this.new_p_m;
        break;
      case 'ps':
        idpregio = this.new_p_s;
        break;
      case 'px':
        idpregio = this.new_p_x;
        break;
    }

    this.adminservice.addpregioadmin(this.idutente, Number(idpregio))
    .subscribe(
      (data: any) => {

        this.new_d_f = '';
        this.new_d_m = '';
        this.new_d_s = '';
        this.new_d_x = '';

        this.new_p_f = '';
        this.new_p_m = '';
        this.new_p_s = '';
        this.new_p_x = '';
        this.getpregi();
        this.getliste();
      }
    );
  }


  getpregi() {
    this.schedaservice.getpregi(this.idutente).subscribe(
      (data: any) => {
        this.pregi = data.pregi ;
        this.difetti = data.difetti ;
      }
    );
  }

}
