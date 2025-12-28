import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../_services/index';
import { Basicpg, Skill, Disciplina , FullDisciplina, Taumaturgia, Necromanzia, FullTaumaturgia, FullNecromanzia,  Background, Contatti, Pregio, Rituale , Amalgama} from '../global';



@Component({
  selector: 'app-spendipx',
  templateUrl: './spendipx.component.html',
  styleUrls: ['./spendipx.component.css']
})
export class SpendipxComponent implements OnInit {

  matriceMaxDisc: number[][] = [
    [ 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9, 10 ],
    [ 3, 3, 4, 4, 5, 5, 5, 6, 7, 8, 9, 10 ],
    [ 3, 4, 5, 5, 5, 5, 5, 6, 7, 8, 9, 10 ],
    [ 4, 5, 5, 5, 5, 5, 5, 6, 7, 8, 9, 10 ],
    [ 4, 5, 5, 5, 5, 5, 5, 6, 7, 8, 9, 10 ],
    [ 5, 5, 5, 5, 5, 5, 5, 6, 7, 8, 9, 10 ]
  ];

  maxdisc = 0 ;
  maxpallini = 5 ; //numero pallini disciplina visibili
  maxattributi = 5 ; //numero max attributi fisici/mentali/sociali

  idutente = 0 ;
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

  idnewrituale: Array<string> = ['', '', '', '', ''];

  newtaumaturgie: Array<Taumaturgia> = [] ;
  newnecromanzie: Array<Necromanzia> = [] ;
  idnewtaum = '';
  idnewnecro = '';

  statusPG = 1;

  xpdisponibili = 0;
  xpspendibili = 0;


  livellitaum: Array<number> = [ 0 , 0 , 0 ];
  livellinecro: Array<number> = [ 0 , 0 , 0 ];

  otherdisc: Array<Disciplina> = [];
  idnewdisc = '';

  idnewprimaria = '';
  tremeresenzataum = 0 ;
  giovannisenzanecro = 0 ;

  puntirigenera = 0 ;
  prbonus = 0;

  amalgame: Array<Amalgama> = [];
  idnewamalgama = '';

  constructor( private schedaservice: SchedaService ) { }

  addXPform = new UntypedFormGroup ({
    xptoadd: new UntypedFormControl('', [
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

        this.scheda['forza'] = Number(this.scheda['forza']);
        this.scheda['destrezza'] = Number(this.scheda['destrezza']);
        this.scheda['attutimento'] = Number(this.scheda['attutimento']);
        this.scheda['carisma'] = Number(this.scheda['carisma']);
        this.scheda['persuasione'] = Number(this.scheda['persuasione']);
        this.scheda['saggezza'] = Number(this.scheda['saggezza']);
        this.scheda['prontezza'] = Number(this.scheda['prontezza']);
        this.scheda['intelligenza'] = Number(this.scheda['intelligenza']);
        this.scheda['percezione'] = Number(this.scheda['percezione']);

        this.scheda.xp = Number (this.scheda.xp);
        this.scheda['fdv'] = Number(this.scheda['fdv']);
        this.scheda['fdvmax'] = Number(this.scheda['fdvmax']);
        this.scheda['bloodp'] = Number(this.scheda['bloodp']);
        this.scheda['bloodpmax'] = Number(this.scheda['bloodpmax']);

        this.scheda['maxstat'] = Number(this.scheda['maxstat']);


        this.statusPG = Number(this.scheda.idstatus);


        this.maxdisc = this.matriceMaxDisc  [this.statusPG][14 - this.scheda['generazione']];

        if (this.maxdisc > 5) {
          this.maxpallini = this.maxdisc;
        } else {
          this.maxpallini = 5;
        }

        this.maxattributi = this.scheda['maxstat'];


        this.discipline = data.discipline ;
        for (let j = 0 ; j < this.discipline.length ; j++ ) {
          this.discipline[j].disciplina.livello = Number (this.discipline[j].disciplina.livello);
          this.discipline[j].disciplina.iddisciplina = Number (this.discipline[j].disciplina.iddisciplina);
          if ( this.discipline[j].disciplina.DiClan == 'S' ) {
            this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 2 ;
          } else {
            this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 3 ;
          }
        }

        this.taumaturgie = data.taumaturgie ;
        this.necromanzie = data.necromanzie ;

        let j = 0;
        for ( let item of  this.taumaturgie ){
          item.taumaturgia.livello = Number (item.taumaturgia.livello);
          this.livellitaum [j] = Number ( item.taumaturgia.livello );
          j ++;
        }

        let i = 0;
        for ( let item of  this.necromanzie ){
          item.necromanzia.livello = Number (item.necromanzia.livello);
          this.livellinecro[i] = Number ( item.necromanzia.livello );
          i ++;
        }

        this.tremeresenzataum = 0 ;
        if ( this.taumaturgie.length == 0 && this.scheda.idclan ==  7) {
          this.tremeresenzataum = 1 ;
        }
        this.giovannisenzanecro = 0 ;
        if ( this.necromanzie.length == 0 && (this.scheda.idclan ==  11 || this.scheda.idclan == 14) ) {
          this.giovannisenzanecro = 1 ;
        }


        this.skills = data.skill ;
        this.attitudini = data.attitudini ;
        for (let item of  this.skills ) {
          item.livello = Number(item.livello);
        }
        for (let item of  this.attitudini ) {
          item.livello = Number(item.livello);
        }


        this.rituali = data.rituali;

        this.maxrituali = 0;
        for ( let item of  this.rituali) {
          if (item.livello> this.maxrituali) {
            this.maxrituali = item.livello;
          }
        }

        this.scheda.xp = Number(this.scheda.xp);
        this.scheda.xpspesi = Number(this.scheda.xpspesi);

        // NUOVO CALCOLO XP //

        this.ricalcolo_xp();  

        // *********************

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
          }
        );
        this.schedaservice.getrituali(this.idutente)
        .subscribe(
          (data: any) => {
            this.rituali_t = data.rituali_t;
            this.rituali_n = data.rituali_n;
          }
        );
        this.schedaservice.listamalgame(this.idutente)
        .subscribe(
          (data: any) => {
            this.amalgame = data.amalgame;
            this.amalgame.forEach(element => {
              element.costo = Number (element.costo);
              element.checkdisc = Number (element.checkdisc);
              /*
              if (element.costo > this.xpdisponibili) {
                element.checkdisc = 0;
              }
              */
             //console.log(element);
            });

          }
        );
      }
    );
  }

  addxp() {

    let newpx: number = Number (this.addXPform.get('xptoadd')!.value );


    this.schedaservice.addpx(this.idutente, newpx)
    .subscribe(
      data => {
        this.scheda.xp += newpx ;
        this.ricalcolo_xp(); 
        /* */
      }
    );

    this.addXPform.patchValue({
      xptoadd: ''});

  }

  addattr(attributo: string) {
    /* Do something */
    switch (attributo) {
      case 'forza':
        this.scheda['forza'] ++;
        this.xpdisponibili -= this.scheda['forza'] * 2;
        this.scheda.xpspesi += this.scheda['forza'] * 2;
        break;
      case 'destrezza':
        this.scheda['destrezza'] ++;
        this.xpdisponibili -= this.scheda['destrezza'] * 2;
        this.scheda.xpspesi += this.scheda['destrezza'] * 2;
        break;
      case 'attutimento':
        this.scheda['attutimento'] ++;
        this.xpdisponibili -= this.scheda['attutimento'] * 2;
        this.scheda.xpspesi += this.scheda['attutimento'] * 2;
        break;
      case 'carisma':
        this.scheda['carisma'] ++;
        this.xpdisponibili -= this.scheda['carisma'] * 2;
        this.scheda.xpspesi += this.scheda['carisma'] * 2;
        break;
      case 'persuasione':
        this.scheda['persuasione'] ++;
        this.xpdisponibili -= this.scheda['persuasione'] * 2;
        this.scheda.xpspesi += this.scheda['persuasione'] * 2;
        break;
      case 'saggezza':
        this.scheda['saggezza'] ++;
        this.xpdisponibili -= this.scheda['saggezza'] * 2;
        this.scheda.xpspesi += this.scheda['saggezza'] * 2;
        break;
      case 'percezione':
        this.scheda['percezione'] ++;
        this.xpdisponibili -= this.scheda['percezione'] * 2;
        this.scheda.xpspesi += this.scheda['percezione'] * 2;
        break;
      case 'intelligenza':
        this.scheda['intelligenza'] ++;
        this.xpdisponibili -= this.scheda['intelligenza'] * 2;
        this.scheda.xpspesi += this.scheda['intelligenza'] * 2;
        break;
      case 'prontezza':
        this.scheda['prontezza'] ++;
        this.xpdisponibili -= this.scheda['prontezza'] * 2;
        this.scheda.xpspesi += this.scheda['prontezza'] * 2;
        break;
      default:
        break;
    }
    this.schedaservice.addattr(this.idutente, attributo)
    .subscribe(
      data => {
        this.ricalcolo_xp(); 
      }
    );
  }

  adddisc( iddisciplina: number ) {
    let spesapx = 0 ;
    let diclan = '';

    for ( let j = 0 ; j< this.discipline.length; j++) {
      if ( this.discipline[j].disciplina.iddisciplina == iddisciplina) {
        this.discipline[j].disciplina.livello ++  ;
        diclan = this.discipline[j].disciplina.DiClan;
        if ( diclan == 'S') {
          spesapx = this.discipline[j].disciplina.livello *2 ;
          this.costonewdisc[j] = (this.discipline[j].disciplina.livello +1)*2 ;
        } else {
          spesapx = this.discipline[j].disciplina.livello *3 ;
          this.costonewdisc[j] = (this.discipline[j].disciplina.livello +1)*3 ;
        }
      }
    }

    this.xpdisponibili -= spesapx;
    this.scheda.xpspesi += spesapx;

    this.schedaservice.adddisciplina(this.idutente, iddisciplina)
    .subscribe(
      data => {
        
        this.reload_full();
        this.ricalcolo_xp(); 
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
        this.reload_full();
        this.ricalcolo_xp(); 
      }
    );

  }

  newtaum( lvl: number ) {
    this.xpdisponibili -= 2;
    this.scheda.xpspesi += 2;
    this.schedaservice.newtaum(this.idutente, this.idnewtaum , lvl)
    .subscribe(
      data => {
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
                this.ricalcolo_xp(); 

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
        this.scheda.xpspesi += ( this.necromanzie[j].necromanzia.livello * 2  );

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
        this.ricalcolo_xp(); 
      }
    );

  }

  newnecro( lvl: number ) {
    this.xpdisponibili -= 2;
    this.scheda.xpspesi += 2;
    this.schedaservice.newnecro(this.idutente, this.idnewnecro , lvl)
    .subscribe(
      data => {

        this.reload_full ();
        this.ricalcolo_xp();

      }
    );
  }

  newdisc( ) {
    this.xpdisponibili -= 5;
    this.scheda.xpspesi += 5;
    this.schedaservice.newdisc(this.idutente, this.idnewdisc )
    .subscribe(
      data => {

        this.reload_full();
        this.ricalcolo_xp();

      }
    );
  }

  addrituale(lvl: number, necrotaum: string) {
    this.xpdisponibili -= 2 * (lvl + 1);
    this.scheda.xpspesi += 2 * (lvl + 1);

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
                this.reload_full();
                this.ricalcolo_xp();
              }
            );
          }
        );
      }
    );
  }

  addskill (idskill: number, tipologia: number) {
    if (tipologia == 0 ) {
      for (let j = 0 ; j < this.skills.length ; j++) {
        if (this.skills[j].idskill == idskill ) {
          this.skills[j].livello ++ ;

          this.xpdisponibili -= 2 * this.skills[j].livello ;
          this.scheda.xpspesi += 2 * this.skills[j].livello ;

          this.schedaservice.addskill(this.idutente, idskill, tipologia)
          .subscribe( (data:any) => {
            /* */
          });
        }
      }
    } else {
      for (let j = 0 ; j < this.attitudini.length ; j++) {
        if (this.attitudini[j].idskill == idskill ) {
          this.attitudini[j].livello ++ ;

          this.xpdisponibili -= 3 * this.attitudini[j].livello ;

          this.schedaservice.addskill(this.idutente, idskill, tipologia)
          .subscribe( (data:any) => {
            this.reload_full();
            this.ricalcolo_xp();
          });
        }
      }
    }
  }


  addfdv(){

    this.scheda.fdvmax ++;
    this.xpdisponibili -= 4 * this.scheda.fdvmax ;
    this.scheda.xpspesi += 4 * this.scheda.fdvmax ;

    this.schedaservice.addfdv(this.idutente)
    .subscribe( (data:any) => {
      this.reload_full();
      this.ricalcolo_xp();
    });

  }

  addbp (){


        this.scheda.bloodp ++;
        this.xpdisponibili -= 4 * this.scheda.bloodp ;
        this.scheda.xpspesi += 4 * this.scheda.bloodp ;

        this.schedaservice.addbp(this.idutente)
        .subscribe( (data:any) => {
          this.reload_full();
          this.ricalcolo_xp();
        });

  }

  scegliprimaria(){

      this.schedaservice.addprimariataum(this.idutente, Number(this.idnewprimaria))
      .subscribe ( (data:any) => {
        this.tremeresenzataum = 0 ;
        this.xpdisponibili -= 2 ;
        this.scheda.xpspesi += 2 ;
        this.reload_full ();
        this.ricalcolo_xp();
      });

  }

  scegliprimarianecro(){

      this.schedaservice.addprimarianecro(this.idutente, Number(this.idnewprimaria))
      .subscribe ( (data:any) => {
        this.giovannisenzanecro = 0 ;
        this.xpdisponibili -= 2 ;
        this.scheda.xpspesi += 2 ;
        this.reload_full ();
        this.ricalcolo_xp();
      });

  }

  newamalgama(){
    //console.log("new amalgama " + this.idnewamalgama);
   

    const found = this.amalgame.find((xx)=> xx.idamalgama == Number(this.idnewamalgama));

    if (found){
      this.scheda.xp = this.scheda.xp - found.costo;
    }
    
    this.ricalcolo_xp();

    this.schedaservice.addamalgama(this.idutente, Number(this.idnewamalgama) )
    .subscribe(
      data => {

        this.reload_full();
        this.ricalcolo_xp();

      }
    );
  }

  reload_full () {
    this.schedaservice.getscheda(this.idutente)
    .subscribe (
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
          }
        );

        this.schedaservice.listamalgame(this.idutente)
        .subscribe(
          (data: any) => {
            this.amalgame = data.amalgame;
            this.amalgame.forEach(element => {
              element.costo = Number (element.costo);
              element.checkdisc = Number (element.checkdisc);
              /*
              if (element.costo > this.xpdisponibili) {
                element.checkdisc = 0;
              }
              */
             //console.log(element);
            });
          }
        );

      }
    );
  }


  ricalcolo_xp (){

    // this.xpdisponibili = this.scheda.xp - this.scheda.xpspesi ;

    if ( this.scheda.xp > 113 ) {
      this.xpspendibili = 86 + ( this.scheda.xp - 113)/2 ;  
    } else if ( this.scheda.xp > 32 ) {
      this.xpspendibili = 32 + ( this.scheda.xp - 32)/3*2;
    } else {
      this.xpspendibili = this.scheda.xp;
    }



    this.xpdisponibili = this.xpspendibili - this.scheda.xpspesi ;
        
    // questo per arrotondare alla 2' cifra decimale
    this.xpspendibili = Math.round(this.xpspendibili*100)/100;
    this.xpdisponibili = Math.round(this.xpdisponibili*100)/100;

    // console.log (this.statusPG);

    switch (this.statusPG) {
      case 5:
        this.puntirigenera = Math.round(this.scheda.xp * 25/100 );
        break;
      case 4:
        this.puntirigenera = Math.round(this.scheda.xp * 4/10 );
        break;
      case 3:
        this.puntirigenera = Math.round(this.scheda.xp * 5/10 );
        break;
      case 2:
          this.puntirigenera = Math.round(this.scheda.xp * 7/10 );
          break;
      default:
        this.puntirigenera = Math.round(this.scheda.xp * 8 /10 );
        console.log (this.puntirigenera);
        break;
    }

    this.prbonus = this.puntirigenera + Math.round(this.puntirigenera/5) ;

  }

}
