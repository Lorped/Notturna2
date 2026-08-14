import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../_services/index';
import { Basicpg, Skill, Disciplina , FullDisciplina, Taumaturgia, Necromanzia, FullTaumaturgia, FullNecromanzia,  Background, Contatti, Alleati, Pregio, Rituale , Amalgama} from '../global';



@Component({
    selector: 'app-spendipx',
    templateUrl: './spendipx.component.html',
    styleUrls: ['./spendipx.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SpendipxComponent implements OnInit {

  avanzamenti: number[] = [
    3 , 7 , 10, 12 , 15, 
    18, 20, 25, 28, 30, 
    32 , 35 , 37, 39 
  ];

  numavanzamenti = 0;
  lock = false ;

  avanzamento_speciale = false;
  avanzamento_limitato = false;

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
  otherskill: Array<Skill> = [];
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


  listabg: Array<Background> = [];
  listaContatti: Array<Contatti> = [];
  sommaContatti = 0;
  listaAlleati: Array<Alleati> = [];
  sommaAlleati = 0;

  myContatto = new UntypedFormControl ( '', [
    Validators.required,
    Validators.pattern(/.*[^ ].*/),
  ]);
  myAlleato = new UntypedFormControl ( '', [
    Validators.required,
    Validators.pattern(/.*[^ ].*/),
  ]);

  constructor( private schedaservice: SchedaService ) { }

  /*
  addXPform = new UntypedFormGroup ({
    xptoadd: new UntypedFormControl('', [
      Validators.required,
      Validators.max(99),
      Validators.min(1),
    ]),
  });
  */

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
        this.scheda.xpspesi = Number (this.scheda.xpspesi);


        this.scheda['fdv'] = Number(this.scheda['fdv']);
        this.scheda['fdvmax'] = Number(this.scheda['fdvmax']);
        this.scheda['bloodp'] = Number(this.scheda['bloodp']);
        //this.scheda['bloodpmax'] = Number(this.scheda['bloodpmax']);

        this.scheda['maxstat'] = Number(this.scheda['maxstat']);
        this.scheda['maxdisc'] = Number(this.scheda['maxdisc']);

        this.statusPG = Number(this.scheda.idstatus);


        this.maxdisc = this.matriceMaxDisc  [this.statusPG][14 - this.scheda['generazione']];

        if (this.maxdisc > this.scheda.maxdisc) {
          this.maxdisc = this.scheda.maxdisc;
        }

        //console.log("maxdisc ",this.maxdisc);

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
          /**
          if ( this.discipline[j].disciplina.DiClan == 'S' ) {
            this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 2 ;
          } else {
            this.costonewdisc[j] = (1 + this.discipline[j].disciplina.livello) * 3 ;
          }
          **/
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
        this.otherskill = data.otherskill ;
        this.attitudini = data.attitudini ;
        for (let item of  this.skills ) {
          item.livello = Number(item.livello);
        }
        for (let item of  this.attitudini ) {
          item.livello = Number(item.livello);
        }

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
            this.listaAlleati = data.alleati;

            this.sommaContatti = 0;
            this.sommaAlleati = 0;

            for ( const item of this.listaContatti ) {
              item.livello = Number (item.livello);
              this.sommaContatti += item.livello;
            }
            for ( const item of this.listaAlleati ) {
              item.livello = Number (item.livello);
              this.sommaAlleati += item.livello;
            }

          }
        );


        this.rituali = data.rituali;

        this.maxrituali = 0;
        for ( let item of  this.rituali) {
          if (item.livello> this.maxrituali) {
            this.maxrituali = item.livello;
          }
        }


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

        /***************
        this.schedaservice.listamalgame(this.idutente)
        .subscribe(
          (data: any) => {
            this.amalgame = data.amalgame;
            this.amalgame.forEach(element => {
              element.costo = Number (element.costo);
              element.checkdisc = Number (element.checkdisc);
              
              //if (element.costo > this.xpdisponibili) {
              //  element.checkdisc = 0;
              //}              

            });

          }
        );
        */

        this.scheda.xp = Number(this.scheda.xp);
        this.scheda.xpspesi = Number(this.scheda.xpspesi);

        // NUOVO CALCOLO XP //
        this.ricalcolo_xp();  

      }
    );
  }

  /**
  addxp() {

    let newpx: number = Number (this.addXPform.get('xptoadd')!.value );
    this.schedaservice.addpx(this.idutente, newpx)
    .subscribe(
      data => {
        this.scheda.xp += newpx ;
        this.ricalcolo_xp();         
      }
    );
    this.addXPform.patchValue({
      xptoadd: ''});

  }
  */


  addattr(attributo: string) {
    /* Do something */
    switch (attributo) {
      case 'forza':
        this.scheda['forza'] ++;        
        break;
      case 'destrezza':
        this.scheda['destrezza'] ++;
        break;
      case 'attutimento':
        this.scheda['attutimento'] ++;
        break;
      case 'carisma':
        this.scheda['carisma'] ++;
        break;
      case 'persuasione':
        this.scheda['persuasione'] ++;
        break;
      case 'saggezza':
        this.scheda['saggezza'] ++;
        break;
      case 'percezione':
        this.scheda['percezione'] ++;
        break;
      case 'intelligenza':
        this.scheda['intelligenza'] ++;
        break;
      case 'prontezza':
        this.scheda['prontezza'] ++;
        break;
      default:
        break;
    }
    this.scheda.xpspesi ++;
    this.numavanzamenti --;
    this.lock = true;
    this.schedaservice.addattr(this.idutente, attributo)
    .subscribe(
      data => {
        this.ricalcolo_xp(); 
      }
    );
    
  }

  
  adddisc( iddisciplina: number ) { 
    for ( let j = 0 ; j< this.discipline.length; j++) {
      if ( this.discipline[j].disciplina.iddisciplina == iddisciplina) {
        this.discipline[j].disciplina.livello ++  ;
        
        /* NON INTERESSA SE DI CLAN O NO
        diclan = this.discipline[j].disciplina.DiClan;
        if ( diclan == 'S') {
          spesapx = 1 ;
          this.costonewdisc[j] = 1 ;
        } else {
          spesapx = 1 ;
          this.costonewdisc[j] = 1 ;
        }
        */

      }
    }
    
    this.scheda.xpspesi ++;
    this.numavanzamenti --;
    this.lock = true;

    this.schedaservice.adddisciplina(this.idutente, iddisciplina)
    .subscribe(
      data => {       
        this.check_discipline_strane();
        //this.reload_full();
        this.ricalcolo_xp(); 
      }
    );

  }
  

  addtaum( idtaum: number ) {
    for (let j = 0 ; j < this.taumaturgie.length ; j++) {
      if ( this.taumaturgie[j].taumaturgia.idtaum == idtaum ) {
        this.taumaturgie[j].taumaturgia.livello ++ ;
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
    this.scheda.xpspesi ++;
    this.numavanzamenti --;
    this.lock = true;
    this.schedaservice.addtaum(this.idutente, idtaum)
    .subscribe(
      data => {
        this.reload_full();
      }
    );
  }

  addnecro( idnecro: number ) {
    for (let j = 0 ; j < this.necromanzie.length ; j++) {
      if ( this.necromanzie[j].necromanzia.idnecro == idnecro ) {
        this.necromanzie[j].necromanzia.livello ++ ;
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
    this.scheda.xpspesi ++;
    this.numavanzamenti --;
    this.lock = true;
    this.schedaservice.addnecro(this.idutente, idnecro)
    .subscribe(
      data => {
        this.reload_full();
      }
    );
  }

  newtaum( lvl: number ) {
    this.scheda.xpspesi ++;
    this.numavanzamenti --;
    this.lock = true;

    this.schedaservice.newtaum(this.idutente, this.idnewtaum , lvl)
    .subscribe(
      data => {
        this.reload_full ();
      }   
    );
  }



  newnecro( lvl: number ) {
    this.scheda.xpspesi ++;
    this.numavanzamenti --;
    this.lock = true;
    
    this.schedaservice.newnecro(this.idutente, this.idnewnecro , lvl)
    .subscribe(
      data => {
        this.reload_full ();
      }
    );
  }

  /*
  newdisc( ) {
    
    this.scheda.xpspesi ++;
    this.schedaservice.newdisc(this.idutente, this.idnewdisc )
    .subscribe(
      data => {

        this.reload_full();
        this.ricalcolo_xp();

      }
    );
  }
  */

  addrituale(lvl: number, necrotaum: string) {
    
    this.scheda.xpspesi ++;
    this.numavanzamenti --;
    this.lock = true;

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
              }
            );
          }
        );
      }
    );
  }

  addsubskill (idskill: number, xid: number){

    for (let j = 0 ; j < this.skills.length ; j++) {
      if (this.skills[j].idskill == xid ) {      
        for (let k = 0 ; k < this.skills[j].subskill2.length ; k++) {
          if (this.skills[j].subskill2[k].idskill == idskill ) {
            
            this.skills[j].subskill2[k].livello++;
            this.scheda.xpspesi ++ ;
            this.numavanzamenti -- ;
            this.lock = true;
            
            this.schedaservice.addskill(this.idutente, idskill, 0)
              .subscribe( (data:any) => {

                if (idskill == 18 ) {  // stregoneria-rituali
                  this.check_discipline_strane();
                }
              //this.reload_full();
              this.ricalcolo_xp();
            });
          }
        }

      }
    }
  }

  addskill (idskill: number, tipologia: number) {
    if (tipologia == 0  ) {
      for (let j = 0 ; j < this.skills.length ; j++) {
        if (this.skills[j].idskill == idskill ) {
          
          this.skills[j].livello ++ ;         
          this.scheda.xpspesi ++ ;
          this.numavanzamenti -- ;
          this.lock = true;

          this.schedaservice.addskill(this.idutente, idskill, tipologia)
          .subscribe( (data:any) => {
            this.ricalcolo_xp();
          });
        }
      }
    } else if (tipologia == 2 ) {
      for (let j = 0 ; j < this.attitudini.length ; j++) {
        if (this.attitudini[j].idskill == idskill ) {
          
          this.attitudini[j].livello ++ ;
          this.scheda.xpspesi ++ ;
          this.numavanzamenti -- ;
          this.lock = true;

          this.schedaservice.addskill(this.idutente, idskill, tipologia)
          .subscribe( (data:any) => {
            this.ricalcolo_xp();
          });
        }
      }
    } else if (tipologia == 1) {
      for (let j = 0 ; j < this.otherskill.length ; j++) {
        if (this.otherskill[j].idskill == idskill ) {
          
          this.otherskill[j].livello ++ ;
          this.scheda.xpspesi ++ ;
          this.numavanzamenti -- ;
          this.lock = true;

          this.schedaservice.addskill(this.idutente, idskill, tipologia)
          .subscribe( (data:any) => {
            this.ricalcolo_xp();
          });
        }
      }
    }
  }


  addfdv(){

    this.scheda.fdvmax ++;  
    this.scheda.xpspesi ++ ;
    this.numavanzamenti -- ;
    this.lock = true;

    this.schedaservice.addfdv(this.idutente)
    .subscribe( (data:any) => {
      this.ricalcolo_xp();
    });

  }

  addbp (){

        this.scheda.bloodp ++;    
        this.scheda.xpspesi ++ ;
        this.numavanzamenti -- ;

        this.schedaservice.addbp(this.idutente)
        .subscribe( (data:any) => {
          this.reload_full();   //bp può portare a nuovi maxstat/maxdisc

        });
  }

  scegliprimaria(){

      this.schedaservice.addprimariataum(this.idutente, Number(this.idnewprimaria))
      .subscribe ( (data:any) => {
        this.tremeresenzataum = 0 ;
        
        this.scheda.xpspesi ++ ;
        this.numavanzamenti -- ;
        this.lock = true;
        this.reload_full ();
      });

  }

  scegliprimarianecro(){

      this.schedaservice.addprimarianecro(this.idutente, Number(this.idnewprimaria))
      .subscribe ( (data:any) => {
        this.giovannisenzanecro = 0 ;
        
        this.scheda.xpspesi ++ ;
        this.numavanzamenti -- ;
        this.lock = true;
        this.reload_full ();
      });

  }

  /****
  newamalgama(){
   
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
  ****/

  reload_full () {
    this.schedaservice.getscheda(this.idutente)
    .subscribe (
      (data: any) => {

        this.scheda = data.user;
        this.scheda.xp = Number ( this.scheda.xp);
        this.scheda.xpspesi = Number ( this.scheda.xpspesi);

        //console.log ("reaload - xpsesi ", this.scheda.xpspesi);

        this.scheda['maxstat'] = Number(this.scheda['maxstat']);
        this.scheda['maxdisc'] = Number(this.scheda['maxdisc']);

        this.maxdisc = this.matriceMaxDisc  [this.statusPG][14 - this.scheda['generazione']];

        if (this.maxdisc > this.scheda.maxdisc) {
          this.maxdisc = this.scheda.maxdisc;
        }

        if (this.maxdisc > 5) {
          this.maxpallini = this.maxdisc;
        } else {
          this.maxpallini = 5;
        }

        this.maxattributi = this.scheda['maxstat'];

        this.discipline = data.discipline ;
        for (let j=0 ; j < this.discipline.length ; j++ ) {
          this.discipline[j].disciplina.livello = Number (this.discipline[j].disciplina.livello);
          this.discipline[j].disciplina.iddisciplina = Number (this.discipline[j].disciplina.iddisciplina);
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

        this.check_discipline_strane();
        this.ricalcolo_xp();

        /*
        this.schedaservice.listamalgame(this.idutente)
        .subscribe(
          (data: any) => {
            this.amalgame = data.amalgame;
            this.amalgame.forEach(element => {
              element.costo = Number (element.costo);
              element.checkdisc = Number (element.checkdisc);
              
             //console.log(element);
            });
          }
        );
        */

      }
    );
  }


  newcontatto(){
    let myNew = new Contatti();
    myNew.nomecontatto = this.myContatto.value;
    myNew.livello = 1 ;

    this.scheda.xpspesi ++ ;
    this.numavanzamenti --;
    this.lock = true;


    this.schedaservice.newcontatto(this.idutente, myNew.nomecontatto, 'U')
    .subscribe(
      (data: any) => {

        myNew.idcontatto = data ;
        this.listaContatti.push(myNew) ;
        this.myContatto.reset();
        this.sommaContatti ++ ;
        //this.reload_full();
        this.ricalcolo_xp();
      }
    );
  }

  addcon(id: number){
    for ( const item of this.listaContatti ) {
      if ( item.idcontatto == id ) {
        item.livello ++ ;

        this.scheda.xpspesi ++ ;
        this.numavanzamenti --;
        this.lock = true;

        this.schedaservice.putcontatti(this.idutente, id, item.livello, 'U')
        .subscribe(
          (data) => {
            this.sommaContatti ++ ;
            //this.reload_full();
            this.ricalcolo_xp();
          }
        );
      }
    }
  }
  newAlleato(){
    let myNew = new Alleati();
    myNew.nomealleato = this.myAlleato.value;
    myNew.livello = 1 ;

    this.scheda.xpspesi ++ ;
    this.numavanzamenti --;
    this.lock = true;

    this.schedaservice.newalleato(this.idutente, myNew.nomealleato, 'U')
    .subscribe(
      (data: any) => {

        myNew.idalleato = data ;
        this.listaAlleati.push(myNew) ;
        this.myAlleato.reset();
        this.sommaAlleati ++ ;

        //this.reload_full();
        this.ricalcolo_xp();
      }
    );
  }

  addall(id: number){
    for ( const item of this.listaAlleati ) {
      if ( item.idalleato == id ) {
        item.livello ++ ;
        this.scheda.xpspesi ++ ;
        this.numavanzamenti --;
        this.lock = true;
        this.schedaservice.putalleati(this.idutente, id, item.livello, 'U')
        .subscribe(
          (data) => {
            this.sommaAlleati ++ ;
            //this.reload_full();
            this.ricalcolo_xp();
          }
        );
      }
    }
  }

  addbg(id: number){
    let newlivello = 0 ;

    for ( const item of  this.listabg ){
      if ( item.idback == id) {
        item.livello ++ ;
  
        this.scheda.xpspesi ++ ;
        this.numavanzamenti --;
        this.lock = true;
        
        newlivello = item.livello;
        this.schedaservice.putbg(this.idutente, id , newlivello , 'U' ).subscribe(
          (data) => {
              this.ricalcolo_xp();
          }
        );        
      }
    }
    
  }


  ricalcolo_xp (){

    this.avanzamento_limitato = false;
    this.avanzamento_speciale = false;
    
    //console.log("ricalcolo , xp", this.scheda.xp);
    //console.log("ricalcolo , xpspesi", this.scheda.xpspesi);
    

    this.numavanzamenti = 0;
    for (let j = this.scheda.xpspesi; j < this.avanzamenti.length ; j++){
      if (this.scheda.xp >= this.avanzamenti[j]) {
        this.numavanzamenti ++;
      }
    }

    //console.log("ricalcolo , avanzamenti", this.numavanzamenti);
    

    if (this.scheda.xpspesi == 0 && this.numavanzamenti>0) {
      this.avanzamento_limitato = true;
      console.log("limitato ", this.avanzamento_limitato);
      this.lock = false;
    }
    if ((this.scheda.xpspesi == 3 || this.scheda.xpspesi == 10 ) && this.numavanzamenti>0) {
      this.avanzamento_speciale = true;
       console.log("speciale ", this.avanzamento_speciale);
       //console.log ("xpspesi =" , this.scheda.xpspesi);
      this.addbp();
    } else {
      this.lock = false ;
    }

  }


  check_discipline_strane() {
    let valrituali = 0 ;
    let valduranki = 0;
    let valmisticismo = 0 ;
    let valottenebra = 0 ;
    const duranki = this.discipline.find(xx => xx.disciplina.iddisciplina == 21);
    if (duranki) {
      valduranki = duranki.disciplina.livello;
      const occ = this.skills.find( yy => yy.idskill == 13);
      if (occ) {
        const rituali = occ.subskill2.find( zz => zz.idskill == 18 )
        valrituali = rituali!.livello;

        if (valduranki < this.maxdisc){
          duranki.disciplina.livello ++;
          this.schedaservice.changedisc_master(this.idutente, 21, 1).subscribe();
        }

      }
    }
    const misticismo = this.discipline.find(xx => xx.disciplina.iddisciplina == 23);
    if (misticismo) {
      valmisticismo = misticismo.disciplina.livello;
      const occ = this.skills.find( yy => yy.idskill == 13);
      if (occ) {
        const rituali = occ.subskill2.find( zz => zz.idskill == 18 )
        valrituali = rituali!.livello;
        const ottenebra = this.discipline.find(hh => hh.disciplina.iddisciplina == 9);
        valottenebra = ottenebra!.disciplina.livello;

        if ( Math.min(valrituali,valottenebra)>valmisticismo &&  valmisticismo< this.maxdisc ) {
          misticismo.disciplina.livello ++;
          this.schedaservice.changedisc_master(this.idutente, 23, 1).subscribe();
        }
      }    
    }
  }

}
