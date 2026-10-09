import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaService, AdminService } from '../_services/index';
import { Background, Contatti, Alleati, Skill, Sentiero, Pregio , GlobalStatus} from '../global';
import { UntypedFormControl, Validators } from '@angular/forms';
import { GetSentiero, PregioDifetto, GetPregioDifetto, GetBG } from '../_services/scheda.service';

interface GetFama {
  fama1: number;
  fama2: number;
  fama3: number;
}

interface ContattiAlleati {
  contatti: Contatti[];
  alleati: Alleati[];
}




interface val {
  idstatus: number;
  status: string;
  attivazione: number;
  bgbase: number;
  generazione: number;
}
interface Passaggio {
  val_old: val;
  val_new: val;
}
interface GetSkill {
  skills: Skill[];
}






@Component({
    selector: 'app-adminbg',
    templateUrl: './adminbg.component.html',
    styleUrls: ['./adminbg.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdminbgComponent implements OnInit {

  idutente = 0 ;
  nomepg = '';

  fama1 = 0 ;
  fama2 = 0 ;
  fama3 = 0 ;

  listabg: Background[] = [];
  listaContatti: Contatti[] = [];
  listaAlleati: Alleati[] = [];
  sommacontatti = 0;
  sommaalleati = 0;



  myContatto = new UntypedFormControl ( '', [
    Validators.required,
    Validators.pattern(/.*[^ ].*/),
  ]);
  myAlleato = new UntypedFormControl ( '', [
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

  listaskill: Skill[] = [];
  listanew: Skill[] = [];

  listasentieri: Sentiero[] = [];
  sentieroPG = 0;
  oldsentieroPG = 0;
  valsentiero = 0 ;
  fdv = 0;

  puntidisponibili = 0;

  pregi: Pregio[] = [];
  difetti: Pregio[] = [];

  pregi_f: Pregio[] = [];
  pregi_m: Pregio[] = [];
  pregi_s: Pregio[] = [];
  pregi_x: Pregio[] = [];
  difetti_f: Pregio[] = [];
  difetti_m: Pregio[] = [];
  difetti_s: Pregio[] = [];
  difetti_x: Pregio[] = [];

  new_d_f = '';
  new_d_m = '';
  new_d_s = '';
  new_d_x = '';

  new_p_f = '';
  new_p_m = '';
  new_p_s = '';
  new_p_x = '';

  private globalstatus = inject(GlobalStatus);
  private adminservice = inject(AdminService);
  private schedaservice = inject(SchedaService);
  private route = inject(ActivatedRoute);



  ngOnInit(): void {
    this.idutente = Number ( this.route.snapshot.paramMap.get('id') );
    this.globalstatus.lastpg = this.idutente;

    this.adminservice.getnome<string>(this.idutente).subscribe({
      next: (data: string) => {
        this.nomepg = data;
      }
    });

    this.schedaservice.getfama<GetFama>(this.idutente).subscribe();

    this.schedaservice.getbg<GetBG>(this.idutente).subscribe(
      (data: GetBG) => {
        this.listabg = data.background;
      }
    );

    this.schedaservice.getcontatti<ContattiAlleati>(this.idutente).subscribe(
      (data: ContattiAlleati) => {
        this.listaContatti = data.contatti;
        this.listaAlleati = data.alleati;

        this.sommacontatti = 0;
        this.sommaalleati = 0;
        for ( const item of this.listaContatti ) {
          this.sommacontatti += item.livello;
        }
        for ( const item of this.listaAlleati ) {
          this.sommaalleati += item.livello;
        }

      }
    );



    this.schedaservice.getsentiero<GetSentiero>(this.idutente).subscribe(
      (data: GetSentiero) => {
        this.listasentieri = data.sentieri;
        this.fdv = data.fdvmax;
        this.valsentiero = data.valsentiero;
        this.sentieroPG = data.idsentiero;
        this.oldsentieroPG = data.idsentiero;
      }
    );

    this.caricavalori();
    this.getliste();

    this.schedaservice.getpregi<GetPregioDifetto>(this.idutente).subscribe(
      (data: GetPregioDifetto) => {
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

    for ( const item of this.listabg ){
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
    for ( const item of this.listaContatti  ) {
      if ( item.idcontatto == id ) {
        item.livello -- ;
        this.schedaservice.putcontatti(this.idutente, id , item.livello, 'A')
        .subscribe(
          () => {
            for ( let j = 0 ; j < this.listaContatti.length; j++){
              if (this.listaContatti[j].livello == 0) {
                this.listaContatti.splice(j, 1);
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
          () => {
            this.sommacontatti ++ ;
          }
        );
      }
    }
  }

  minall(id: number){
    // console.log (this.listaContatti);
    for ( const item of this.listaAlleati  ) {
      if ( item.idalleato == id ) {
        item.livello -- ;
        this.schedaservice.putalleati(this.idutente, id , item.livello, 'A')
        .subscribe(
          () => {
            for ( let j = 0 ; j < this.listaAlleati.length; j++){
              if (this.listaAlleati[j].livello == 0) {
                this.listaAlleati.splice(j, 1);
              }
            }
            this.sommaalleati -- ;
          }
        );
      }
    }
  }
  addall(id: number){
    for ( const item of this.listaAlleati ) {
      if ( item.idalleato == id ) {
        item.livello ++ ;
        this.schedaservice.putalleati(this.idutente, id, item.livello , 'A')
        .subscribe(
          () => {
            this.sommaalleati ++ ;
          }
        );
      }
    }
  }

  newcontatto(){
    const myNew = new Contatti();
    myNew.nomecontatto = this.myContatto.value;
    myNew.livello = 1 ;

    this.schedaservice.newcontatto<number>(this.idutente, myNew.nomecontatto, 'A')
    .subscribe(
      (data: number) => {

        myNew.idcontatto = data ;
        this.listaContatti.push(myNew) ;
        this.myContatto.reset();
        this.sommacontatti ++ ;
      }
    );
  }
  newalleato(){
    const myNew = new Alleati();
    myNew.nomealleato = this.myAlleato.value;
    myNew.livello = 1 ;

    this.schedaservice.newalleato<number>(this.idutente, myNew.nomealleato, 'A')
    .subscribe(
      (data: number) => {

        myNew.idalleato = data ;
        this.listaAlleati.push(myNew) ;
        this.myAlleato.reset();
        this.sommaalleati ++ ;
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
      () => {
         this.caricavalori ();
      }
    );
  }


  caricavalori() {
    this.schedaservice.getpassaggiostatus<Passaggio>(this.idutente).subscribe(
      (data: Passaggio) => {

        this.idstatus_old = data.val_old.idstatus;
        this.status_old = data.val_old.status;
        this.attivazione_old = data.val_old.attivazione;
        this.bgbase_old = data.val_old.bgbase;

        this.generazione = data.val_old.generazione;

        if ( data.val_new ) {
          this.idstatus_new = data.val_new.idstatus;
          this.status_new = data.val_new.status;
          this.attivazione_new = data.val_new.attivazione;
          this.bgbase_new = data.val_new.bgbase;

          let mygen = this.generazione;
          if (this.generazione <8) {
            mygen = 8;
          }
          this.conoscenze_old = this.matriceNumSkill [ this.idstatus_old] [14 - mygen ];
          this.conoscenze_new = this.matriceNumSkill [ this.idstatus_new] [14 - mygen ];


        }

      }
    );

    this.schedaservice.getskill<GetSkill>(this.idutente).subscribe(
      (data: GetSkill) => {
        this.listaskill = data.skills; 
        this.listanew.length = 0 ;
        this.listaskill.forEach(val => this.listanew.push(Object.assign({}, val)));

        for (const item of  this.listanew) {
          item.livello = 0;
        }
      }
    );
  }

  minfdv(){
    this.fdv--;
    this.schedaservice.putfdvsentiero(this.idutente, this.fdv, -1 , 'A').subscribe(
      () => {
        /* do stuff */
      }
    );
  }
  addfdv(){
    this.fdv++;
    this.schedaservice.putfdvsentiero(this.idutente, this.fdv, -1, 'A').subscribe(
      () => {
        /* do stuff */
      }
    );
  }
  minsentiero(){
    this.valsentiero--;
    this.schedaservice.putfdvsentiero(this.idutente, -1, this.valsentiero , 'A').subscribe(
      () => {
        /* do stuff */
      }
    );
  }
  addsentiero(){
    this.valsentiero++;
    this.schedaservice.putfdvsentiero(this.idutente, -1, this.valsentiero , 'A').subscribe(
      () => {
        /* do stuff */
      }
    );
  }
  changesentiero(){
    this.oldsentieroPG = this.sentieroPG;
    this.schedaservice.newsentiero(this.idutente, this.sentieroPG , 'A').subscribe(
      () => {
        /* do stuff */
      }
    );
  }

  riducigen() {
    this.generazione--;
    this.schedaservice.putgen(this.idutente, this.generazione, 'A').subscribe(
      () => {
        this.caricavalori();  // cambiano gli skill per il passaggio status
      }
    );
  }

  getliste() {
    this.schedaservice.getpregidifetti<PregioDifetto>(this.idutente)
    .subscribe(
      (data: PregioDifetto) => {
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
      () => {
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
      () => {

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
    this.schedaservice.getpregi<GetPregioDifetto>(this.idutente).subscribe(
      (data: GetPregioDifetto) => {
        this.pregi = data.pregi ;
        this.difetti = data.difetti ;
      }
    );
  }
  
  

}
