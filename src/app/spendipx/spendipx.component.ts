import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../services/index';
import { Basicpg, Skill, Disciplina , FullDisciplina, Taumaturgia, Necromanzia, FullTaumaturgia, FullNecromanzia,  Background, Contatti, Pregio, Rituale } from '../global';



@Component({
  selector: 'app-spendipx',
  templateUrl: './spendipx.component.html',
  styleUrls: ['./spendipx.component.css']
})
export class SpendipxComponent implements OnInit {

  matriceMaxDisc: number[][] = [
    [ 2, 3, 3, 4, 4, 5, 5 ],
    [ 3, 3, 4, 4, 5, 5, 5 ],
    [ 3, 4, 5, 5, 5, 5, 5 ],
    [ 4, 5, 5, 5, 5, 5, 5 ],
    [ 4, 5, 5, 5, 5, 5, 5 ],
    [ 5, 5, 5, 5, 5, 5, 5 ]
  ];

  maxdisc = 0 ;

  idutente: number = 0 ;
  scheda: Basicpg = new Basicpg();


  discipline: Array<FullDisciplina> = [] ;

  costonewdisc: Array<number> = [];

  necromanzie: Array<FullNecromanzia> = [] ;
  taumaturgie: Array<FullTaumaturgia> = [] ;
  skills: Array<Skill> = [];
  attitudini: Array<Skill> = [];

  rituali: Array<Rituale> = [];
  /*rituali_n_x: Array<Rituale> = [];
  rituali_t_t: Array<Rituale> = []; */
  rituali_n: Array<any> = [];
  rituali_t: Array<any> = [];

  maxrituali = 0 ;

  idnewrituale: Array<string> = ['','','','',''];

  newtaumaturgie: Array<Taumaturgia> = [] ;
  newnecromanzie: Array<Necromanzia> = [] ;
  idnewtaum: string = '';
  idnewnecro: string = '';

  statusPG: number = 1;

  xpdisponibili = 0;


  livellitaum: Array<number> = [ 0 , 0 , 0 ];
  livellinecro: Array<number> = [ 0 , 0 , 0 ];

  otherdisc: Array<Disciplina> = [];
  idnewdisc: string = '';



  constructor( private schedaservice: SchedaService ) { }

  addXPform = new FormGroup ({
    xptoadd: new FormControl('', [
      Validators.required,
      Validators.max(99),
      Validators.min(1),
    ]),
  });

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getscheda(this.idutente).
    subscribe (
      (data: any) => {
        this.scheda = data.user ;

        this.scheda['forza']=Number(this.scheda['forza']);
        this.scheda['destrezza']=Number(this.scheda['destrezza']);
        this.scheda['attutimento']=Number(this.scheda['attutimento']);
        this.scheda['carisma']=Number(this.scheda['carisma']);
        this.scheda['persuasione']=Number(this.scheda['persuasione']);
        this.scheda['saggezza']=Number(this.scheda['saggezza']);
        this.scheda['prontezza']=Number(this.scheda['prontezza']);
        this.scheda['intelligenza']=Number(this.scheda['intelligenza']);
        this.scheda['percezione']=Number(this.scheda['percezione']);

        this.scheda.xp = Number (this.scheda.xp);
        this.scheda['fdv']=Number(this.scheda['fdv']);
        this.scheda['valsentiero']=Number(this.scheda['valsentiero']);
        this.scheda['generazione']=Number(this.scheda['generazione']);

        this.statusPG = Number(this.scheda.idstatus);

        console.log(data);


        this.maxdisc = this.matriceMaxDisc  [this.statusPG][14 - this.scheda['generazione']];

        this.discipline = data.discipline ;
        for (let j=0 ; j < this.discipline.length ; j++ ) {
          this.discipline[j].disciplina.livello = Number (this.discipline[j].disciplina.livello);
          this.discipline[j].disciplina.iddisciplina = Number (this.discipline[j].disciplina.iddisciplina);
          if ( this.discipline[j].disciplina.DiClan == "S" ) {
            this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 2 ;
          } else {
            this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 3 ;
          }
        }

        this.taumaturgie = data.taumaturgie ;
        this.necromanzie = data.necromanzie ;

        for ( let j = 0 ; j < this.taumaturgie.length ; j++ ){
          this.taumaturgie[j].taumaturgia.livello = Number (this.taumaturgie[j].taumaturgia.livello);
          this.livellitaum [j] = Number ( this.taumaturgie[j].taumaturgia.livello );
        }

        for ( let j = 0 ; j < this.necromanzie.length ; j++ ){
          this.necromanzie[j].necromanzia.livello = Number (this.necromanzie[j].necromanzia.livello);
          this.livellinecro [j] = Number ( this.necromanzie[j].necromanzia.livello );
        }


        this.skills = data.skill ;
        this.attitudini = data.attitudini ;

        this.rituali = data.rituali;

        this.maxrituali = 0;
        for ( let j = 0 ; j< this.rituali.length; j ++) {
          if (this.rituali[j].livello> this.maxrituali) {
            this.maxrituali = this.rituali[j].livello;
          }
        }

        this.xpdisponibili = this.scheda.xp - this.scheda.xpspesi ;

        this.schedaservice.getnecrotaum(this.idutente)
        .subscribe(
          (data: any) => {
            this.newtaumaturgie = data.taumaturgie;
            this.newnecromanzie = data.necromanzie;
          }
        );
        this.schedaservice.getotherdisc(this.idutente)
        .subscribe(
          (data: any) => {
            this.otherdisc = data.otherdisc;
            console.log (data);
          }
        );
        this.schedaservice.getrituali(this.idutente)
        .subscribe(
          (data: any) => {
            this.rituali_t = data.rituali_t;
            this.rituali_n = data.rituali_n;
            console.log (this.rituali_t);
          }
        );
      }
    );
  }

  addxp() {

    let newpx: number = Number (this.addXPform.get('xptoadd')!.value );

    this.xpdisponibili += newpx ;
    this.scheda.xp += newpx ;

    this.schedaservice.addpx(this.idutente, newpx)
    .subscribe(
      data => {
        console.log("add px "+newpx);
      }
    );

    this.addXPform.patchValue({
      xptoadd: ""});

  }

  addattr(attributo: string) {
    /* Do something */
    switch (attributo) {
      case 'forza':
        this.scheda['forza'] ++;
        this.xpdisponibili -= this.scheda['forza']*2;
        break;
      case 'destrezza':
        this.scheda['destrezza'] ++;
        this.xpdisponibili -= this.scheda['destrezza']*2;
        break;
      case 'attutimento':
        this.scheda['attutimento'] ++;
        this.xpdisponibili -= this.scheda['attutimento']*2;
        break;
      case 'carisma':
        this.scheda['carisma'] ++;
        this.xpdisponibili -= this.scheda['carisma']*2;
        break;
      case 'persuasione':
        this.scheda['persuasione'] ++;
        this.xpdisponibili -= this.scheda['persuasione']*2;
        break;
      case 'saggezza':
        this.scheda['saggezza'] ++;
        this.xpdisponibili -= this.scheda['saggezza']*2;
        break;
      case 'percezione':
        this.scheda['percezione'] ++;
        this.xpdisponibili -= this.scheda['percezione']*2;
        break;
      case 'intelligenza':
        this.scheda['intelligenza'] ++;
        this.xpdisponibili -= this.scheda['intelligenza']*2;
        break;
      case 'prontezza':
        this.scheda['prontezza'] ++;
        this.xpdisponibili -= this.scheda['prontezza']*2;
        break;
      default:
        break;
    }
    this.schedaservice.addattr(this.idutente, attributo)
    .subscribe(
      data => {
        console.log("add attr "+attributo);
      }
    );
  }

  adddisc ( iddisciplina: number ) {
    let spesapx = 0 ;
    let diclan = '';

    for ( let j = 0 ; j< this.discipline.length; j++) {
      if ( this.discipline[j].disciplina.iddisciplina == iddisciplina) {
        this.discipline[j].disciplina.livello ++  ;
        diclan = this.discipline[j].disciplina.DiClan;
        if ( diclan == 'S') {
          spesapx = this.discipline[j].disciplina.livello *2 ;
          this.costonewdisc[j]= (this.discipline[j].disciplina.livello +1)*2 ;
        } else {
          spesapx = this.discipline[j].disciplina.livello *3 ;
          this.costonewdisc[j]= (this.discipline[j].disciplina.livello +1)*3 ;
        }
      }
    }

    this.xpdisponibili -= spesapx;

    this.schedaservice.adddisciplina(this.idutente, iddisciplina)
    .subscribe(
      data => {
        console.log("add disc "+iddisciplina);
      }
    );


  }

  addtaum( idtaum: number ) {
    for (let j = 0 ; j < this.taumaturgie.length ; j++) {
      if ( this.taumaturgie[j].taumaturgia.idtaum == idtaum ) {
        this.taumaturgie[j].taumaturgia.livello ++ ;
        this.xpdisponibili -= ( this.taumaturgie[j].taumaturgia.livello * 2  );

        if (this.taumaturgie[j].taumaturgia.principale == 1 ) {
          for (let j = 0 ; j < this.discipline.length ; j++) {
            if ( this.discipline[j].disciplina.iddisciplina == 98 ) {
              this.discipline[j].disciplina.livello ++ ;
            }
          }
        }
        this.livellitaum [ this.taumaturgie[j].taumaturgia.principale -1 ] = this.taumaturgie[j].taumaturgia.livello;
      }
    }
    this.schedaservice.addtaum(this.idutente, idtaum)
    .subscribe(
      data => {
        console.log("add taum "+idtaum);
      }
    );

  }

  newtaum ( lvl: number ) {
    this.xpdisponibili -= 2;
    this.schedaservice.newtaum(this.idutente, this.idnewtaum , lvl)
    .subscribe(
      data => {
        console.log("new taum "+this.idnewtaum + ' ' + lvl);

        this.schedaservice.getscheda(this.idutente).
        subscribe (
          (data: any) => {
            this.discipline = data.discipline ;
            for (let j=0 ; j < this.discipline.length ; j++ ) {
              this.discipline[j].disciplina.livello = Number (this.discipline[j].disciplina.livello);
              this.discipline[j].disciplina.iddisciplina = Number (this.discipline[j].disciplina.iddisciplina);
              if ( this.discipline[j].disciplina.DiClan == "S" ) {
                this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 2 ;
              } else {
                this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 3 ;
              }
            }

            this.taumaturgie = data.taumaturgie ;
            this.necromanzie = data.necromanzie ;

            for ( let j = 0 ; j < this.taumaturgie.length ; j++ ){
              this.taumaturgie[j].taumaturgia.livello = Number (this.taumaturgie[j].taumaturgia.livello);
              this.livellitaum [j] = Number ( this.taumaturgie[j].taumaturgia.livello );
            }

            for ( let j = 0 ; j < this.necromanzie.length ; j++ ){
              this.necromanzie[j].necromanzia.livello = Number (this.necromanzie[j].necromanzia.livello);
              this.livellinecro [j] = Number ( this.necromanzie[j].necromanzia.livello );
            }

            this.schedaservice.getnecrotaum(this.idutente)
            .subscribe(
              (data: any) => {
                this.newtaumaturgie = data.taumaturgie;
                this.newnecromanzie = data.necromanzie;
                console.log(this.newtaumaturgie);
                console.log(this.newnecromanzie);
              }
            );
          }
        );
      }
    );
  }

  addnecro( idnecro: number ) {
    for (let j = 0 ; j < this.necromanzie.length ; j++) {
      if ( this.necromanzie[j].necromanzia.idnecro == idnecro ) {
        this.necromanzie[j].necromanzia.livello ++ ;
        this.xpdisponibili -= ( this.necromanzie[j].necromanzia.livello * 2  );

        if (this.necromanzie[j].necromanzia.principale == 1 ) {
          for (let j = 0 ; j < this.discipline.length ; j++) {
            if ( this.discipline[j].disciplina.iddisciplina == 99 ) {
              this.discipline[j].disciplina.livello ++ ;
            }
          }
        }
        this.livellinecro [ this.necromanzie[j].necromanzia.principale -1 ] = this.necromanzie[j].necromanzia.livello;
      }
    }
    this.schedaservice.addnecro(this.idutente, idnecro)
    .subscribe(
      data => {
        console.log("add necro "+idnecro);
      }
    );

  }

  newnecro ( lvl: number ) {
    this.xpdisponibili -= 2;
    this.schedaservice.newnecro(this.idutente, this.idnewnecro , lvl)
    .subscribe(
      data => {
        console.log("new necro "+this.idnewnecro + ' ' + lvl);

        this.schedaservice.getscheda(this.idutente).
        subscribe (
          (data: any) => {
            this.discipline = data.discipline ;
            for (let j=0 ; j < this.discipline.length ; j++ ) {
              this.discipline[j].disciplina.livello = Number (this.discipline[j].disciplina.livello);
              this.discipline[j].disciplina.iddisciplina = Number (this.discipline[j].disciplina.iddisciplina);
              if ( this.discipline[j].disciplina.DiClan == "S" ) {
                this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 2 ;
              } else {
                this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 3 ;
              }
            }

            this.taumaturgie = data.taumaturgie ;
            this.necromanzie = data.necromanzie ;

            for ( let j = 0 ; j < this.taumaturgie.length ; j++ ){
              this.taumaturgie[j].taumaturgia.livello = Number (this.taumaturgie[j].taumaturgia.livello);
              this.livellitaum [j] = Number ( this.taumaturgie[j].taumaturgia.livello );
            }

            for ( let j = 0 ; j < this.necromanzie.length ; j++ ){
              this.necromanzie[j].necromanzia.livello = Number (this.necromanzie[j].necromanzia.livello);
              this.livellinecro [j] = Number ( this.necromanzie[j].necromanzia.livello );
            }

            this.schedaservice.getnecrotaum(this.idutente)
            .subscribe(
              (data: any) => {
                this.newtaumaturgie = data.taumaturgie;
                this.newnecromanzie = data.necromanzie;
                console.log(this.newtaumaturgie);
                console.log(this.newnecromanzie);
              }
            );
          }
        );
      }
    );
  }

  newdisc( ) {
    this.xpdisponibili -= 10;
    this.schedaservice.newdisc(this.idutente, this.idnewdisc )
    .subscribe(
      data => {
        console.log("new disc "+this.idnewdisc );

        this.schedaservice.getscheda(this.idutente).
        subscribe (
          (data: any) => {
            this.discipline = data.discipline ;
            for (let j=0 ; j < this.discipline.length ; j++ ) {
              this.discipline[j].disciplina.livello = Number (this.discipline[j].disciplina.livello);
              this.discipline[j].disciplina.iddisciplina = Number (this.discipline[j].disciplina.iddisciplina);
              if ( this.discipline[j].disciplina.DiClan == "S" ) {
                this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 2 ;
              } else {
                this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 3 ;
              }
            }

            this.taumaturgie = data.taumaturgie ;
            this.necromanzie = data.necromanzie ;

            for ( let j = 0 ; j < this.taumaturgie.length ; j++ ){
              this.taumaturgie[j].taumaturgia.livello = Number (this.taumaturgie[j].taumaturgia.livello);
              this.livellitaum [j] = Number ( this.taumaturgie[j].taumaturgia.livello );
            }

            for ( let j = 0 ; j < this.necromanzie.length ; j++ ){
              this.necromanzie[j].necromanzia.livello = Number (this.necromanzie[j].necromanzia.livello);
              this.livellinecro [j] = Number ( this.necromanzie[j].necromanzia.livello );
            }

            this.schedaservice.getnecrotaum(this.idutente)
            .subscribe(
              (data: any) => {
                this.newtaumaturgie = data.taumaturgie;
                this.newnecromanzie = data.necromanzie;
                console.log(this.newtaumaturgie);
                console.log(this.newnecromanzie);
              }
            );
            this.schedaservice.getotherdisc(this.idutente)
            .subscribe(
              (data: any) => {
                this.otherdisc = data.otherdisc;
                console.log (data);
              }
            );
          }
        );
      }
    );
  }

  addrituale(lvl: number, necrotaum: string) {
    this.xpdisponibili -= 3*(lvl+1);

    this.schedaservice.newrituale ( this.idutente , this.idnewrituale[lvl], necrotaum )
    .subscribe(
      (data: any) => {
        this.schedaservice.getscheda(this.idutente).
        subscribe (
          (data: any) => {

            this.rituali = data.rituali;

            for (let j = 0 ; j< 5 ; j++ ) {
              this.idnewrituale[j] = '' ;
            }

            this.maxrituali = 0;
            for ( let j = 0 ; j< this.rituali.length; j ++) {
              if (this.rituali[j].livello> this.maxrituali) {
                this.maxrituali = this.rituali[j].livello;
              }
            }
            this.schedaservice.getrituali(this.idutente)
            .subscribe(
              (data: any) => {
                this.rituali_t = data.rituali_t;
                this.rituali_n = data.rituali_n;
                console.log (this.rituali_t);
              }
            );
          }
        );
      }
    );


  }


}
