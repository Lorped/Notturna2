import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SchedaService, AdminService } from '../_services/index';
import { Lds, Cronaca, Clan, Status, Background, Contatti, Alleati, Attributo, Disciplina, Taumaturgia, Necromanzia, Skill, Sentiero, Basicpg, Pregio} from '../global';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Router } from '@angular/router';



  interface ListaDisciplineVie  {
    disc_vie: string; // D o V
    id: number;
    nome: string;
    focus: number;
  }




@Component({
    selector: 'app-crea',
    templateUrl: './crea.component.html',
    styleUrls: ['./crea.component.css'],
    providers: [{
            provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
        }],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})


export class CreaComponent implements OnInit {

  bonusbg = 0 ;    //bonus bg da lds
  mingregge = 0;
  minseguaci = 0;
  bgldsOK =false ;


  ldsOK = false ;
  listalds: Array<Lds> = [ 
    {idlds:0, idclan:0, nomelds: '', fondatorelds: '', mentorelds: '', pregiolds: '', difettolds: '' }
  ];
  myLDS: Array<Lds> = [ 
    {idlds:0, idclan:0, nomelds: '', fondatorelds: '', mentorelds: '', pregiolds: '', difettolds: '' }
  ];
  lds = 0;

  cronacaPG = 1;   /* 1 = Lazio , 2 = xxx */
  listacronache: Array<Cronaca> = [];

  focusOK= false;
  cronacaOK = false;

  listapregi: Array<Pregio> = [];
  listadifetti: Array<Pregio> = [];
  new_d = 0 ; //difetto
  new_p = 0 ; //pregio
  valorePregioDifetto = 0;

  listaDisciplineVie: ListaDisciplineVie[] = [];
  selectedFocusIndex = -1;

  isLinear = false;  // FALSE SOLO PER TEST !!!!!

  clan: Array<Clan> = [];
  status: Array<Status> = [];
  bg: Array<Background> = [];

  generazionePG = 13;     /* Generazione PG */
  puntiFerita = 8;
  is14 = false;

  bgOK = false;
  sommaBG = 0;
  maxBG = 6;            /* Numer BG disponibili */

  cont: Array<Contatti> = [];
  alleati: Array<Alleati> = [];

  sommaCont = 0 ;
  maxCont = 0 ;
  sommaAlleati = 0 ;
  maxAlleati = 0 ;

  creaForm = new UntypedFormGroup ({
    nomepersonaggio: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/.*[^ ].*/),
    ]),
    nomeplayer: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/.*[^ ].*/),
    ]),
    clanPG: new UntypedFormControl('', [
      Validators.required,
    ]),
    statusPG: new UntypedFormControl('', [
      Validators.required,
    ]),
    rifugio: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/.*[^ ].*/),
    ]),
    zona: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/.*[^ ].*/),
    ]),
  });


  attributi: Array<Attributo> = [];

  attr0 = 5;              /* 5-4-2   e' la distrubuzione base  */
  attr1 = 4;
  attr2 = 2;
  maxAttr = 11;           /* 5+4+2 = 11  somam della distribuzione  */
  sommaAttr = 0;
  attrCorrente = [ 0 , 0 , 0 ];
  attrCorrenteSort = [ 0 , 0 , 0 ];
  attrOK = false;


  discipline: Array<Disciplina> = [];
  taumaturgie: Array<Taumaturgia> = [];
  listaTaum: Array<Taumaturgia> = [];

  necromanzie: Array<Necromanzia> = [];
  listaNecro: Array<Necromanzia> = [];


  disciplinevili: Array<Disciplina> = [];

  sommaDisc = 0 ;
  numDisc = 5 ;             /* punti disciplina  */
  maxDisc = 3 ;             /* max livello disciplina  */

  bp = 1;                    /* blood potency / controllo del sangue */
  
  discOK = false;



  matriceMaxDisc: number[][] = [
    [ 2, 3, 3, 4, 4, 5, 5 ],
    [ 3, 3, 4, 4, 5, 5, 5 ],
    [ 3, 4, 5, 5, 5, 5, 5 ],
    [ 4, 5, 5, 5, 5, 5, 5 ],
    [ 4, 5, 5, 5, 5, 5, 5 ],
    [ 5, 5, 5, 5, 5, 5, 5 ]
  ];

  matriceNumSkill: number[][] = [
    [ 20, 20, 17, 15, 13, 10, 5 ],
    [ 33, 30, 27, 25, 20, 15, 10 ],
    [ 35, 35, 33, 30, 25, 20, 15 ],
    [ 45, 45, 43, 40, 35, 30, 20 ],
    [ 55, 55, 53, 50, 45, 40, 30 ],
    [ 95, 95, 93, 90, 80, 70, 50 ]
  ];


  skillOK = false;
  sommaSkill = 0;
  numSkill = 30;

  attitudiniOK = false;
  sommaAttitudini = 0 ;
  numAttitudini = 4 ;           /* punti Attitudini  */
  maxAttitudini = 1;

  skill: Array<Skill> = [];
  skillother: Array<Skill> = [];
  attitudini: Array<Skill> = [];


  sentieri: Array<Sentiero> = [];
  baseFDVmax = 2;           /* Calcolare */


  baseumanita = 6;          /* Punteggio base */


  


  sentieroPG = '1';       /* umanità */

 



  constructor(private schedaservice: SchedaService , private router: Router, private adminservice: AdminService) { }


  ngOnInit(): void {

    if ( sessionStorage.getItem('NotturnaUser1') == '1' ) {
      this.router.navigate(['/main']);
    }

    this.schedaservice.getregistra()
    .subscribe(
      (data: any) => {
        this.clan = data.clan;
        this.status = data.statuscama;
        this.creaForm.patchValue({
          statusPG: '1'});
        this.bg = data.background;
        this.listaTaum = data.taumaturgie;
        this.listaNecro = data.necromanzie;
        this.disciplinevili = data.disciplinevili;
        this.skill = data.skill;

        //console.log('skill: ' + JSON.stringify(this.skill));
        this.skillother = data.skillother;
        this.attitudini = data.attitudini;

        this.sentieri = data.sentieri;

        this.listalds = data.listalds;
        this.lds = 0;


        for (let j = 0 ; j < this.bg.length ; j++) {    // Rifugio minimo a 1
            this.bg[j].livello = this.bg[j].MinIniziale;
            this.bg[j].MinIniziale = Number (data.background[j].MinIniziale);
            this.bg[j].MaxIniziale = Number (data.background[j].MaxIniziale);
        }
      }
    );

    for ( let j = 0 ; j <3 ; j++) {               // Inizializzo i contatti
      this.cont[j] = new Contatti();
    }

    for ( let j = 0 ; j <3 ; j++) {               // Inizializzo gli alleati
      this.alleati[j] = new Alleati();
    }

    this.attributi[0] = new Attributo ( 0, 'Forza'        , 'F' , 1 ,1);
    this.attributi[1] = new Attributo ( 1, 'Carisma'      , 'S' , 1 , 1);
    this.attributi[2] = new Attributo ( 2, 'Percezione'   , 'M' , 1 ,1);
    this.attributi[3] = new Attributo ( 3, 'Destrezza'    , 'F' , 1 ,1);
    this.attributi[4] = new Attributo ( 4, 'Persuasione'  , 'S' , 1 ,1);
    this.attributi[5] = new Attributo ( 5, 'Intelligenza' , 'M' , 1 ,1);
    this.attributi[6] = new Attributo ( 6, 'Attutimento'  , 'F' , 1 ,1);
    this.attributi[7] = new Attributo ( 7, 'Saggezza'     , 'S' , 1 ,1);
    this.attributi[8] = new Attributo ( 8, 'Prontezza'    , 'M' , 1 ,1);

    this.discipline[0] = new Disciplina();
    this.discipline[1] = new Disciplina();
    this.discipline[2] = new Disciplina();

    this.taumaturgie[0] = new Taumaturgia();
    this.taumaturgie[1] = new Taumaturgia();
    this.taumaturgie[2] = new Taumaturgia();

    this.necromanzie[0] = new Necromanzia();
    this.necromanzie[1] = new Necromanzia();
    this.necromanzie[2] = new Necromanzia();

    // pregi 
    this.schedaservice.getpregidifetti(-1)
    .subscribe(
      (data: any) => {
        this.listapregi = data.pregi_f.concat(data.pregi_m).concat(data.pregi_s).concat(data.pregi_x);
        this.listadifetti = data.difetti_f.concat(data.difetti_m).concat(data.difetti_s).concat(data.difetti_x);
        this.updateValoreSelections();
      }
    );

    this.adminservice.getlistcronache().subscribe(
      (data: any) => {
        this.listacronache = data;
      }
    );

    //

  }

  get nomepersonaggio() {
      return this.creaForm.get('nomepersonaggio');
  }
  get nomeplayer() {
      return this.creaForm.get('nomeplayer');
  }
  get clanPG() {
      return this.creaForm.get('clanPG');
  }
  get statusPG() {
      return this.creaForm.get('statusPG');
  }
  get rifugio() {
      return this.creaForm.get('rifugio');
  }
  get zona() {
      return this.creaForm.get('zona');
  }

  changestatus() {
    switch (this.statusPG!.value) {
      case '0':
        this.maxBG = 5;
        this.numDisc = 4;
        break;
      case '1':
        this.maxBG = 6;
        this.numDisc = 5;
        break;
      case '2':
        this.maxBG = 8;
        this.numDisc = 6;
        break;
      case '3':
        this.maxBG = 10;
        this.numDisc = 7;
        break;
      case '4':
        this.maxBG = 15;
        this.numDisc = 10;
        break;
      case '5':
        this.maxBG = 25;
        this.numDisc = 15;
        break;
      default:
        this.maxBG = 6;
        this.numDisc = 5;
        break;

    }
    this.changeMaxDisc();
    this.changeNumSkill();
    this.checkbg () ;
    this.fixattr();

  }

  addbg(bg: number){
    this.bgOK = false ;
    for (let j = 0; j < this.bg.length; j++ ) {
      if ( this.bg[j].idback === bg) {
        this.bg[j].livello++;
        if ( bg == 5 ) {     /* generazione */
          this.changeGen(this.bg[j].livello);
        }
        this.sommaBG++;
      }
    }
    if ( bg == 77 ) {     /* contatti */
      this.maxCont++;
    }
    if ( bg == 88 ) {     /* alleati */
      this.maxAlleati++;
      console.log('maxAlleati: ' + this.maxAlleati);
    }

    this.checkbg () ;

  }

  minbg(bg: number){
    this.bgOK = false ;
    for (let item of this.bg ) {
      if ( item.idback === bg) {
        item.livello--;
        this.sommaBG--;
        if ( bg == 5 ) {     /* generazione */
          this.changeGen(item.livello);
        }
      }
    }
    if ( bg == 77 ) {    /* contatti */
      this.maxCont--;
    }
    if ( bg == 88 ) {    /* alleati */
      this.maxAlleati--;
    }

    this.checkbg () ;

  }


  addcont(cc: number){
    this.cont[cc].livello++;
    this.sommaCont++;
    this.bgOK = false ;
    this.checkbg () ;
  }
  addalleato(cc: number){
    this.alleati[cc].livello++;
    this.sommaAlleati++;
    this.bgOK = false ;
    this.checkbg () ;
  }

  mincont(cc: number){
    this.cont[cc].livello--;
    if (this.cont[cc].livello == 0) {
      this.cont[cc].nomecontatto = '';
    }
    this.sommaCont--;
    this.bgOK = false ;
    this.checkbg () ;
  }

  minalleato(cc: number){
    this.alleati[cc].livello--;
    if (this.alleati[cc].livello == 0) {
      this.alleati[cc].nomealleato = '';
    }
    this.sommaAlleati--;
    this.bgOK = false ;
    this.checkbg () ;
  }



  checkbg () {
    let ok = false;

    if ( (this.sommaBG === this.maxBG+this.bonusbg) && ((this.sommaCont === this.maxCont) || this.maxCont === 0 )) {
      ok = true;
    }
    if (this.maxCont > 0) {

      if (this.cont[0].livello > 0 && this.cont[0].nomecontatto == '') {
        ok = false;
      }
      if (this.cont[1].livello > 0 && this.cont[1].nomecontatto == '') {
        ok = false;
      }
      if (this.cont[2].livello > 0 && this.cont[2].nomecontatto == '') {
        ok = false;
      }
    }
    if (this.maxAlleati > 0) {

      if (this.alleati[0].livello > 0 && this.alleati[0].nomealleato == '') {
        ok = false;
      }
      if (this.alleati[1].livello > 0 && this.alleati[1].nomealleato == '') {
        ok = false;
      }
      if (this.alleati[2].livello > 0 && this.alleati[2].nomealleato == '') {
        ok = false;
      }
    }
    this.bgOK = ok;
    this.fixattr();
  }

  changeGen(bggen: number) {
    this.generazionePG = 13 - bggen;

    switch (this.generazionePG ) {
      case 14:
        this.attr0 = 4;
        this.attr1 = 3;
        this.attr2 = 2;
        this.maxAttr = 9;
        this.numAttitudini = 4;
        this.bp = 1;
        break;
      case 13:
        this.attr0 = 5;
        this.attr1 = 4;
        this.attr2 = 2;
        this.maxAttr = 11;
        this.numAttitudini = 4;
        this.bp = 1;
        break;
      case 12:
        this.attr0 = 6;
        this.attr1 = 4;
        this.attr2 = 2;
        this.maxAttr = 12;
        this.numAttitudini = 4;
        this.bp = 1;
        break;
      case 11:
        this.attr0 = 6;
        this.attr1 = 5;
        this.attr2 = 2;
        this.maxAttr = 13;
        this.numAttitudini = 4;
        this.bp = 1;
        break;
      case 10:
        this.attr0 = 7;
        this.attr1 = 5;
        this.attr2 = 3;
        this.maxAttr = 15;
        this.numAttitudini = 5;
        this.bp = 1;
        break;
      case 9:
        this.attr0 = 7;
        this.attr1 = 6;
        this.attr2 = 4;
        this.maxAttr = 17;
        this.numAttitudini = 7;
        this.bp = 2;
        break;
      case 8:
        this.attr0 = 8;
        this.attr1 = 6;
        this.attr2 = 4;
        this.maxAttr = 18;
        this.numAttitudini = 8;
        this.bp = 2;
        break;
      default:
        this.attr0 = 5;
        this.attr1 = 4;
        this.attr2 = 2;
        this.maxAttr = 11;
        this.numAttitudini = 4;
        this.bp = 1;
        break;
    }
    this.changeMaxDisc();
    this.changeNumSkill();
    this.checkattr();



  }

  minattr(id: number) {
    this.attributi[id].Livello--;

    this.attrCorrente[0] = this.attributi[0].Livello + this.attributi[3].Livello  + this.attributi[6].Livello 
                        - this.attributi[0].Iniziale - this.attributi[3].Iniziale - this.attributi[6].Iniziale;
    this.attrCorrente[1] = this.attributi[1].Livello + this.attributi[4].Livello  + this.attributi[7].Livello
                        - this.attributi[1].Iniziale - this.attributi[4].Iniziale - this.attributi[7].Iniziale;
    this.attrCorrente[2] = this.attributi[2].Livello + this.attributi[5].Livello  + this.attributi[8].Livello
                        - this.attributi[2].Iniziale - this.attributi[5].Iniziale - this.attributi[8].Iniziale;

    this.attrCorrenteSort = this.attrCorrente.slice().sort((n1,n2) => n1 - n2);

    this.sommaAttr--;

    this.checkattr();
  }
  addattr(id: number) {
    this.attributi[id].Livello++;

        this.attrCorrente[0] = this.attributi[0].Livello + this.attributi[3].Livello  + this.attributi[6].Livello 
                        - this.attributi[0].Iniziale - this.attributi[3].Iniziale - this.attributi[6].Iniziale;
    this.attrCorrente[1] = this.attributi[1].Livello + this.attributi[4].Livello  + this.attributi[7].Livello
                        - this.attributi[1].Iniziale - this.attributi[4].Iniziale - this.attributi[7].Iniziale;
    this.attrCorrente[2] = this.attributi[2].Livello + this.attributi[5].Livello  + this.attributi[8].Livello
                        - this.attributi[2].Iniziale - this.attributi[5].Iniziale - this.attributi[8].Iniziale;

    this.attrCorrenteSort = this.attrCorrente.slice().sort((n1,n2) => n1 - n2);

    this.sommaAttr++;

    this.checkattr();
  }

  checkattr() {
    this.attrOK = false;
    if ( this.attr2  == this.attrCorrenteSort[0] &&
         this.attr1  == this.attrCorrenteSort[1] &&
         this.attr0  == this.attrCorrenteSort[2] ) {
      this.attrOK = true;
    }

    console.log ("saggezza: " + this.attributi[7].Livello + " prontezza: " + this.attributi[8].Livello);
    this.baseFDVmax = Math.ceil((this.attributi[7].Livello + this.attributi[8].Livello)/2);

    this.maxAttitudini = this.attributi[3].Livello;  /* DESTREZZA */

    this.fixattr();

  }

  changeclan(){
    switch (this.clanPG!.value) {
      case '1':   //  Toreador
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 3;          // Auspex
        this.discipline[2].iddisciplina = 15;         // Velocità
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Auspex';
        this.discipline[2].nomedisc = 'Velocità';
      break;
      case '2':   //  Ventrue
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 6;          // Dominazione
        this.discipline[2].iddisciplina = 12;         // Robustezza
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Dominazione';
        this.discipline[2].nomedisc = 'Robustezza';
      break;
      case '3':		// Nosferatu
        this.discipline[0].iddisciplina = 1;          // Animalità
        this.discipline[1].iddisciplina = 8;          // Oscurazione
        this.discipline[2].iddisciplina = 17;         // Potenza
        this.discipline[0].nomedisc = 'Animalità';
        this.discipline[1].nomedisc = 'Oscurazione';
        this.discipline[2].nomedisc = 'Potenza';
      break;
      case '4':		// Brujah
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 17;         // Potenza
        this.discipline[2].iddisciplina = 15;         // Velocità
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Potenza';
        this.discipline[2].nomedisc = 'Velocità';
      break;
      case '5':		// Gangrel
        this.discipline[0].iddisciplina = 1;          // Animalità
        this.discipline[1].iddisciplina = 10;         // Proteide
        this.discipline[2].iddisciplina = 12;         // Robustezza
        this.discipline[0].nomedisc = 'Animalità';
        this.discipline[1].nomedisc = 'Proteide';
        this.discipline[2].nomedisc = 'Robustezza';
      break;
      case '6':		// Malkavian
        this.discipline[0].iddisciplina = 3;          // Auspex
        this.discipline[1].iddisciplina = 5;          // Demenza
        this.discipline[2].iddisciplina = 8;          // Oscurazione
        this.discipline[0].nomedisc = 'Auspex';
        this.discipline[1].nomedisc = 'Demenza';
        this.discipline[2].nomedisc = 'Oscurazione';
      break;
      case '7':		// Tremere
        this.discipline[0].iddisciplina = 3;          // Auspex
        this.discipline[1].iddisciplina = 6;          // Dominazione
        this.discipline[2].iddisciplina = 98;         // Taumaturgia
        this.discipline[0].nomedisc = 'Auspex';
        this.discipline[1].nomedisc = 'Dominazione';
        this.discipline[2].nomedisc = 'Taumaturgia';
      break;
      case '8':		// Lasombra
        this.discipline[0].iddisciplina = 6;          // Dominazione
        this.discipline[1].iddisciplina = 17;         // Potenza
        this.discipline[2].iddisciplina = 9;          // Ottenebramento
        this.discipline[0].nomedisc = 'Dominazione';
        this.discipline[1].nomedisc = 'Potenza';
        this.discipline[2].nomedisc = 'Ottenebramento';
      break;
      case '9':		// Tzimisce
        this.discipline[0].iddisciplina = 1;          // Animalità
        this.discipline[1].iddisciplina = 3;          // Auspex
        this.discipline[2].iddisciplina = 16;         // Vicissitudine
        this.discipline[0].nomedisc = 'Animalità';
        this.discipline[1].nomedisc = 'Auspex';
        this.discipline[2].nomedisc = 'Vicissitudine';
      break;
      case '10':	// Assamiti
        this.discipline[0].iddisciplina = 8;          // Oscurazione
        this.discipline[1].iddisciplina = 11;         // Quietus
        this.discipline[2].iddisciplina = 15;         // Velocità
        this.discipline[0].nomedisc = 'Oscurazione';
        this.discipline[1].nomedisc = 'Quietus';
        this.discipline[2].nomedisc = 'Velocità';
      break;
      case '11':	// Giovanni
        this.discipline[0].iddisciplina = 6;          // Dominazione
        this.discipline[1].iddisciplina = 99;         // Necromanzia
        this.discipline[2].iddisciplina = 17;         // Potenza
        this.discipline[0].nomedisc = 'Dominazione';
        this.discipline[1].nomedisc = 'Necromanzia';
        this.discipline[2].nomedisc = 'Potenza';
      break;
      case '12':	// Ravnos
        this.discipline[0].iddisciplina = 1;          // Animalità
        this.discipline[1].iddisciplina = 4;          // Chimerismo
        this.discipline[2].iddisciplina = 12;         // Robustezza
        this.discipline[0].nomedisc = 'Animalità';
        this.discipline[1].nomedisc = 'Chimerismo';
        this.discipline[2].nomedisc = 'Robustezza';
      break;
      case '13':	// Setiti
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 8;          // Oscurazione
        this.discipline[2].iddisciplina = 13;         // Serpentis
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Oscurazione';
        this.discipline[2].nomedisc = 'Serpentis';
      break;
      case '14':	// Cappadoci
        this.discipline[0].iddisciplina = 3;          // Auspex
        this.discipline[1].iddisciplina = 99;         // Necromanzia
        this.discipline[2].iddisciplina = 12;         // Robustezza
        this.discipline[0].nomedisc = 'Auspex';
        this.discipline[1].nomedisc = 'Necromanzia';
        this.discipline[2].nomedisc = 'Robustezza';
      break;
      case '15':	// Baali
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 19;         // Daimonion
        this.discipline[2].iddisciplina = 8;          // Oscurazione
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Daimonion';
        this.discipline[2].nomedisc = 'Oscurazione';
      break;
      case '20':	// Vili
        this.discipline[0].iddisciplina = 0;
        this.discipline[1].iddisciplina = 0;
        this.discipline[2].iddisciplina = 0;
        this.discipline[0].nomedisc = '';
        this.discipline[1].nomedisc = '';
        this.discipline[2].nomedisc = '';
      break;
      case '21':   //  City Gangrel
        this.discipline[0].iddisciplina = 8;          // Oscurazione  
        this.discipline[1].iddisciplina = 10;         // Proteide      
        this.discipline[2].iddisciplina = 15;         // Velocità
        this.discipline[0].nomedisc = 'Oscurazione';
        this.discipline[1].nomedisc = 'Proteide';
        this.discipline[2].nomedisc = 'Velocità';
      break;
    }

    // RESET Discipline pr evitare problemi

    for ( let j = 0; j < 3 ; j++) {
      this.discipline[j].livello = 0;

      this.taumaturgie[j].livello = 0;
      this.taumaturgie[j].idtaum = 0;

      this.necromanzie[j].livello = 0;
      this.necromanzie[j].idnecro = 0;
    }
    this.sommaDisc = 0 ;
    this.discOK = false;



    this.lds=0;
    this.bonusbg = 0 ;
    this.myLDS = this.listalds.filter((unit) => unit.idclan == this.clanPG?.value);
    this.ldsOK=false;
      const cc = this.bg.find( x =>  x.idback == 11);
      if (cc) { cc.MinIniziale = 0 ; }
      const cc1 = this.bg.find( x =>  x.idback == 3);
      if (cc1) { cc1.MinIniziale = 0 ;}


  }

  mindisc(dd: number) {
    for (let j = 0 ; j < 3 ; j++ ) {
      if ( this.discipline[j].iddisciplina === dd) {
        this.discipline[j].livello--;
      }
    }
    this.sommaDisc--;
    this.checkDisc();
  }

  adddisc(dd: number) {
    for (let j = 0 ; j < 3 ; j++ ) {
      if ( this.discipline[j].iddisciplina === dd) {
        this.discipline[j].livello++;
      }
    }
    this.sommaDisc++;
    this.checkDisc();
  }

  changeMaxDisc () {
    let indexGen = 14 - this.generazionePG;
    let indexStat = this.statusPG!.value;

    this.maxDisc = this.matriceMaxDisc [indexStat][indexGen];

    let xmaxDisc = 3;

    if ( this.statusPG!.value > 1 ) {
      this.bp=4;
    }

    switch( this.bp){
      case 0:
      case 1:
        xmaxDisc = 3;
        break;
      case 2:
        xmaxDisc = 4;
        break;
      case 3:
      case 4:
        xmaxDisc = 5;
        break;
      case 5:
        xmaxDisc = 6;
        break;
      case 6:
        xmaxDisc = 7;
        break;
      case 7:
        xmaxDisc = 8;
        break;
      case 8:
      case 9:
        xmaxDisc = 9;
        break;
      case 10:
        xmaxDisc = 10;
        break; 
      default:
        xmaxDisc = 3;
        break;  
    }

    if ( this.maxDisc > xmaxDisc ) {
      this.maxDisc = xmaxDisc;
    }

    this.checkDisc();
  }

  checkDisc() {

    this.listaDisciplineVie = [];

    

    for ( let j = 0 ; j < 3 ; j++) {
      if (this.discipline[j].livello > 0 && this.discipline[j].iddisciplina != 98 && this.discipline[j].iddisciplina != 99 ) {
        const disc: ListaDisciplineVie = { disc_vie: 'D', id: this.discipline[j].iddisciplina, nome: this.discipline[j].nomedisc, focus: 0  };
        this.listaDisciplineVie.push(disc);
      }
    }
    for ( let j = 0 ; j < this.necromanzie.length ; j++) {
      if (this.necromanzie[j].livello > 0  ) {
        const disc: ListaDisciplineVie = { disc_vie: 'N', id: Number(this.listaNecro[j].idnecro), nome: this.listaNecro[j].nomenecro, focus: 0  };
        this.listaDisciplineVie.push(disc);
      }
    }
    for ( let j = 0 ; j < this.taumaturgie.length ; j++) {
      if (this.taumaturgie[j].livello > 0  ) {
        const disc: ListaDisciplineVie = { disc_vie: 'T', id: Number(this.listaTaum[j].idtaum), nome: this.listaTaum[j].nometaum, focus: 0  };
        this.listaDisciplineVie.push(disc);
      }
    }

    if (this.clanPG!.value == 20) {

        //console.log ("listaDisciplineVie ", this.listaDisciplineVie );
        //console.log ("disciplinevili ", this.disciplinevili );


      this.listaDisciplineVie.forEach(element => {
        
        //console.log ("element ", element );


        const trova = this.disciplinevili.find ( (d) => d.iddisciplina == element.id);

        //console.log ("trova ", trova );
        element.nome = trova?.nomedisc||'';
        //console.log ("element ", element );


      });
    }







    this.discOK = false;
    if ( this.sommaDisc === this.numDisc ) {
      this.discOK = true;
    }
    for ( let j = 0 ; j < 3 ; j++) {
      if (this.discipline[j].livello > this.maxDisc ) {
        this.discOK = false;
      }
    }
  }

  mintaum(tt: number){
    this.taumaturgie[tt].livello--;
    if (tt == 0){
      for ( let j = 0; j < 3 ; j++){
        if (this.discipline[j].iddisciplina == 98 ) {
          this.discipline[j].livello--;
        }
      }
    }
    this.sommaDisc--;
    this.checkDisc();
  }
  addtaum(tt: number){
    this.taumaturgie[tt].livello++;
    if (tt == 0){
      for ( let j = 0; j < 3 ; j++){
        if (this.discipline[j].iddisciplina == 98 ) {
          this.discipline[j].livello++;
        }
      }
    }
    this.sommaDisc++;
    this.checkDisc();
  }

  minnecro(tt: number){
    this.necromanzie[tt].livello--;
    if (tt == 0){
      for ( let j = 0; j < 3 ; j++){
        if (this.discipline[j].iddisciplina == 99 ) {
          this.discipline[j].livello--;
        }
      }
    }
    this.sommaDisc--;
    this.checkDisc();
  }
  addnecro(tt: number){
    this.necromanzie[tt].livello++;
    if (tt == 0){
      for ( let j = 0; j < 3 ; j++){
        if (this.discipline[j].iddisciplina == 99 ) {
          this.discipline[j].livello++;
        }
      }
    }
    this.sommaDisc++;
    this.checkDisc();
  }

  setFocusItem(index: number) {
    this.selectedFocusIndex = index;
    this.listaDisciplineVie.forEach((item, idx) => {
      item.focus = idx === index ? 1 : 0;
    });
    this.focusOK = true;
  }

  setLDSItem(index: number) {
    this.lds = index;

    console.log ( "lds ", this.lds);

    this.ldsOK = true;
    this.bonusbg=0;
    console.log ( "bonusbg ", this.bonusbg);


      const cc = this.bg.find( (x) =>  x.idback == 11);
      if (cc) { cc.MinIniziale = 0 ;}
      const cc1 = this.bg.find( (x) =>  x.idback == 3);
      if (cc1) { cc1.MinIniziale = 0 ;}
      const cc2 = this.bg.find( (x) =>  x.idback == 6);
      if (cc2) { cc2.MinIniziale = 0 ;}
      const cc3 = this.bg.find( (x) =>  x.idback == 2);
      if (cc3) { cc3.MinIniziale = 0 ;}
      this.bg.forEach(element => {
        element.livello = element.MinIniziale;
      });
      this.cont.forEach(element => {
        element.livello=0;
        element.nomecontatto='';
      });
      this.sommaCont = 0;
      this.maxCont = 0 ;
       this.alleati.forEach(element => {
        element.livello=0;
        element.nomealleato='';
      });
      this.sommaAlleati = 0;
      this.maxAlleati = 0 ;
      this.sommaBG=0;
      this.resetdiscipline();
      this.attributi[0].Iniziale = 1;
      this.attributi[0].Livello = 1;
      this.attributi[3].Iniziale = 1;
      this.attributi[3].Livello = 1;
      this.discipline.forEach(element => {
        element.iniziale = 0 ;
        element.livello = 0;
      });



    if ( this.lds== 13 || this.lds == 23 ||  this.lds==7|| this.lds==28){
      this.bonusbg=2;
      console.log("bonusbg ", this.bonusbg);
    }
    if ( this.lds== 19||this.lds==26 ){
      this.bonusbg=-2;
      console.log("bonusbg ", this.bonusbg);
    }
    if (this.lds==30) {
      const cc = this.bg.find( (x) =>  x.idback == 11);
      if (cc) { cc.MinIniziale = 1 ; cc.livello = 1;}
      const cc1 = this.bg.find( (x) =>  x.idback == 3);
      if (cc1) { cc1.MinIniziale = 1 ; cc1.livello =1 ;}
    } 
    if (this.lds==19||this.lds == 26) {
      const cc = this.bg.find( (x) =>  x.idback == 6);
      if (cc) { cc.MinIniziale = 2 ; cc.livello = 2;}
    } 
        if (this.lds == 28) {
      const cc = this.bg.find( (x) =>  x.idback == 2);
      if (cc) { cc.MinIniziale = 2 ; cc.livello = 2;}
    } 

    if (this.lds == 3 ){
      this.discipline[1].iddisciplina = 12;          // Robustezza
      this.discipline[1].nomedisc = "Robustezza";
    }
    if (this.lds == 12 ){
      this.discipline[2].iddisciplina = 3;          // Auspex
      this.discipline[2].nomedisc = "Auspex";
    }
    if (this.lds == 14 ){
      this.discipline[0].iddisciplina = 8;          // Oscurazione
      this.discipline[0].nomedisc = "Oscurazione";
    }
    if (this.lds == 15 ){
      this.discipline[2].iddisciplina = 21;          // Dur-An-Ki
      this.discipline[2].nomedisc = "Dur-An-Ki";
    }
    if (this.lds == 16 ){
      this.discipline[1].iddisciplina = 6;          // Dominazione
      this.discipline[1].nomedisc = "Dominazione";
    }
    if (this.lds == 18 ){
      this.discipline[0].iddisciplina = 2;          // Ascendente
      this.discipline[0].nomedisc = "Ascendente";
    }
    if (this.lds == 22 ){
      this.discipline[1].iddisciplina = 23;          // Misticismo Abissale
      this.discipline[1].nomedisc = "Misticismo Abissale";
    }
    if (this.lds == 26 ){
      this.discipline[0].iddisciplina = 21;          // Dur-An-Ki
      this.discipline[0].nomedisc = "Dur-An-Ki";
    }
    if (this.lds == 32 ){
      this.discipline[0].iddisciplina = 3;          // Auspex
      this.discipline[0].nomedisc = "Auspex";
    }
    if (this.lds == 33 ){
      this.discipline[0].iddisciplina = 22;          // Anku
      this.discipline[0].nomedisc = "Anku";
    }

     if (this.lds == 4 ){
      this.attributi[0].Iniziale = 2;          // Forza
      this.attributi[0].Livello = 2;
    }
    if (this.lds == 8 ){
      this.attributi[3].Iniziale = 2;          // Destrezza
      this.attributi[3].Livello = 2;
    }
  
    if (this.lds == 9 ){
      this.discipline[1].iniziale = 1;    // OSCURAZIONE - NOSFE          
      this.discipline[1].livello = 1;
    }
    if (this.lds == 17 ){
      this.discipline[0].iniziale = 1;    // auspex - MALK          
      this.discipline[0].livello = 1;
    }
    if (this.lds == 24 ){
      this.discipline[2].iniziale = 1;    // vicissitudine - TZIM          
      this.discipline[2].livello = 1;
    }
    if (this.lds == 31 ){
      this.discipline[1].iniziale = 1;    // chmierismo - RAVNOS          
      this.discipline[1].livello = 1;
    }

  }


 onCronacaChange(val: number) {
    this.cronacaPG = val;
    this.cronacaOK = true;
  }


  onPregioChange(val: number) {
    this.new_p = val;
    this.updateValoreSelections();
  }

  onDifettoChange(val: number) {
    this.new_d = val;
    this.updateValoreSelections();
  }

  updateValoreSelections() {
    let pVal = 0;
    let dVal = 0;
    if (this.listapregi && this.new_p) {
      const p = this.listapregi.find(x => x.idpregio === this.new_p);
      if (p) { pVal = Number(p.valore) || 0; }
    }
    if (this.listadifetti && this.new_d) {
      const d = this.listadifetti.find(x => x.idpregio === this.new_d);
      if (d) { dVal = Number(d.valore) || 0; }
    }
    this.valorePregioDifetto = pVal + dVal;
  }

  gen14() {
    this.is14 = (this.is14 ? false : true );

    this.creaForm.patchValue({
      statusPG: '1' ,
      clanPG: '20'});

    if ( this.is14 )  {
      this.generazionePG = 14 ;
      for (let j = 0; j < this.bg.length; j++ ) {
        if ( this.bg[j].idback == 5) { /* generazione */
          this.sommaBG = this.sommaBG - this.bg[j].livello;
          this.bg[j].livello = 0;
        }
      }
      this.changeclan() ;
      this.changestatus();
      this.changeGen(-1);
    } else {
      this.generazionePG = 13 ;
      this.changeGen(0);
    }
  }

    // SKILL con SUBSKILL
  addsk(sk: number) {
    for (let j = 0 ; j < this.skill.length ; j++ ) {
      if ( this.skill[j].idskill === sk) {
        this.skill[j].livello++;

        for (let k = 0 ; k < this.skill[j].subskill2.length ; k++ ) {
          this.skill[j].subskill2[k].max = this.skill[j].livello;
        }

      }
    }
    this.sommaSkill++;
    this.checkSkill();
  }
  minsk(sk:number) {
    for (let j = 0 ; j < this.skill.length ; j++ ) {
      if ( this.skill[j].idskill === sk) {
        this.skill[j].livello--;

        for (let k = 0 ; k < this.skill[j].subskill2.length ; k++ ) {
          this.skill[j].subskill2[k].max = this.skill[j].livello;
          if (this.skill[j].subskill2[k].livello > this.skill[j].subskill2[k].max) {  
            this.skill[j].subskill2[k].livello = this.skill[j].subskill2[k].max;
            this.sommaSkill--;
          }
        }
      }
    }
    this.sommaSkill--;
    this.checkSkill();
  }


  // ATTITUDINI

  addsk2(sk: number) {
    for (let j = 0 ; j < this.attitudini.length ; j++ ) {
      if ( this.attitudini[j].idskill === sk) {
        this.attitudini[j].livello++;
      }
    }
    this.sommaAttitudini++;
    this.checkSkill();
  }
  minsk2(sk: number) {
    for (let j = 0 ; j < this.attitudini.length ; j++ ) {
      if ( this.attitudini[j].idskill === sk) {
        this.attitudini[j].livello--;
      }
    }
    this.sommaAttitudini--;
    this.checkSkill();
  }

// SUBSKILL

  addsk3(sk: number, ssk: number){
    //console.log('addsk3: ' + sk + ' - ' + ssk);
    for (let j = 0 ; j < this.skill.length ; j++ ) {
      if ( this.skill[j].idskill === sk) {
        for (let k = 0 ; k < this.skill[j].subskill2.length ; k++ ) {
          if (this.skill[j].subskill2[k].idskill === ssk) {
            this.skill[j].subskill2[k].livello++;

              this.sommaSkill++;
              this.checkSkill();
          }
        }
      }
    }
  }
  minsk3(sk: number, ssk: number){
    //console.log('minsk3: ' + sk + ' - ' + ssk);
    for (let j = 0 ; j < this.skill.length ; j++ ) {
      if ( this.skill[j].idskill === sk) {
        for (let k = 0 ; k < this.skill[j].subskill2.length ; k++ ) {
          if (this.skill[j].subskill2[k].idskill === ssk) {
            this.skill[j].subskill2[k].livello--;

              this.sommaSkill--;
              this.checkSkill();
          }
        }
      }
    }
  }

// OTHERSKILL
  addsk4(sk: number){
    //console.log('addsk4: ' + sk);
    for (let j = 0 ; j < this.skillother.length ; j++ ) {
      if ( this.skillother[j].idskill === sk) {
        this.skillother[j].livello++;
      }
    }
    this.sommaSkill++;
    this.checkSkill();
  }
  minsk4(sk: number){
    //console.log('minsk4: ' + sk);
        for (let j = 0 ; j < this.skillother.length ; j++ ) {
      if ( this.skillother[j].idskill === sk) {
        this.skillother[j].livello--;
      }
    }
    this.sommaSkill--;
    this.checkSkill();
  }



  checkSkill() {
    this.skillOK = false;
    this.attitudiniOK = false;

    if ( this.sommaSkill == this.numSkill) this.skillOK = true;
    if ( this.sommaAttitudini == this.numAttitudini) this.attitudiniOK = true;
    for ( let j = 0 ; j < this.attitudini.length ; j++ ) {
      if (this.attitudini[j].livello > this.maxAttitudini) this.attitudiniOK = false;
    }
  }


  changeNumSkill() {
    let indexGen = 14 - this.generazionePG;
    let indexStat = this.statusPG!.value;

    this.numSkill = this.matriceNumSkill [indexStat][indexGen];

    this.checkSkill();
  }

  /*
  addfdv() {
    this.FDVadd++;
    this.freepoint--;
    this.checkFree();
  }
  minfdv() {
    this.FDVadd--;
    this.freepoint++;
    if (this.baseFDVmax + this.FDVadd < 4) {
      this.sentieroPG = '1';
    }
    this.checkFree();
  }
  adduma() {
    this.umanitaadd++;
    this.freepoint--;
    this.checkFree();
  }
  minuma() {
    this.umanitaadd--;
    this.freepoint++;
    this.checkFree();
  }
  checkFree() {
    this.freeOK = false;
    if (this.freepoint == 0) {
      this.freeOK = true;
    }
  }
  */

  salvascheda() {
    let aPG = new Basicpg();

    aPG.nomeplayer = this.nomeplayer!.value ;
    aPG.nomepg = this.nomepersonaggio!.value ;
    aPG.idclan = this.clanPG!.value ;
    aPG.generazione = this.generazionePG ;

    aPG.forza = this.attributi[0].Livello ;
    aPG.carisma = this.attributi[1].Livello ;
    aPG.percezione = this.attributi[2].Livello ;
    aPG.destrezza = this.attributi[3].Livello ;
    aPG.persuasione = this.attributi[4].Livello ;
    aPG.intelligenza = this.attributi[5].Livello ;
    aPG.attutimento = this.attributi[6].Livello ;
    aPG.saggezza = this.attributi[7].Livello ;
    aPG.prontezza = this.attributi[8].Livello ;

    aPG.fdv = Math.ceil((this.attributi[7].Livello + this.attributi[8].Livello)/2);
    aPG.idstatus = this.statusPG!.value ;

    aPG.idsentiero = Number(this.sentieroPG) ;
    aPG.valsentiero = this.baseumanita  ;

    aPG.rifugio = this.rifugio!.value;
    aPG.zona = this.zona!.value;

    aPG.IDcronaca = this.cronacaPG;  

    this.schedaservice.putregistra( aPG , this.bg , this.cont , this.alleati, this.discipline , this.taumaturgie , this.necromanzie , 
      this.attitudini, this.skill , this.skillother , this.new_p, this.new_d , this.bp, this.listaDisciplineVie)
      .subscribe(
        data => {
          //  OK!
          sessionStorage.setItem('NotturnaUser1', '1' );
          this.router.navigate(['/main']);
        },
        error => {
          // KO !
          console.log('ko');
        }
      );

  }


  fixattr() {
    //console.log('fixattr');
    this.changeNumSkill();
    //console.log('old NS', this.numSkill);
    this.numAttitudini = 4;
    if ( this.generazionePG == 10 ) {
      this.numAttitudini = 5;
    } else if ( this.generazionePG == 9 ) {
      this.numAttitudini = 7;
    } else if ( this.generazionePG == 8 ) {
      this.numAttitudini = 8;
    }
    if ( this.attributi[3].Livello == 1 ) {
      //console.log('dex 1 ');
      if (this.generazionePG == 9){
        this.numAttitudini = 6;
        this.numSkill = this.numSkill + 1;       
        //console.log('new NS', this.numSkill);
      }
      if (this.generazionePG == 8){
        this.numAttitudini = 6;
        this.numSkill = this.numSkill + 2;       
        //console.log('new NS', this.numSkill);
      }

    }
  }

  /*
  addinfl(infl: number){
    this.influOK = false ;
    for (let j = 0; j < this.influenze.length; j++ ) {
      if ( this.influenze[j].idinfluenza === infl) {
        this.influenze[j].livello++;
        this.sommaInfluenze++;
      }
    }
    if (this.sommaInfluenze == this.maxInfluenze) {
      this.influOK = true;
    }
  }
    */

  /*
  mininfl(infl: number){
    this.influOK = false ;
    for (let item of this.influenze ) {
      if ( item.idinfluenza === infl) {
        item.livello--;
        this.sommaInfluenze--;

      }
    }

    if (this.sommaInfluenze == this.maxInfluenze) {
      this.influOK = true;
    }
  }
  */

  resetdiscipline(){
    switch (this.clanPG!.value) {
      case '1':   //  Toreador
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 3;          // Auspex
        this.discipline[2].iddisciplina = 15;         // Velocità
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Auspex';
        this.discipline[2].nomedisc = 'Velocità';
      break;
      case '2':   //  Ventrue
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 6;          // Dominazione
        this.discipline[2].iddisciplina = 12;         // Robustezza
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Dominazione';
        this.discipline[2].nomedisc = 'Robustezza';
      break;
      case '3':		// Nosferatu
        this.discipline[0].iddisciplina = 1;          // Animalità
        this.discipline[1].iddisciplina = 8;          // Oscurazione
        this.discipline[2].iddisciplina = 17;         // Potenza
        this.discipline[0].nomedisc = 'Animalità';
        this.discipline[1].nomedisc = 'Oscurazione';
        this.discipline[2].nomedisc = 'Potenza';
      break;
      case '4':		// Brujah
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 17;         // Potenza
        this.discipline[2].iddisciplina = 15;         // Velocità
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Potenza';
        this.discipline[2].nomedisc = 'Velocità';
      break;
      case '5':		// Gangrel
        this.discipline[0].iddisciplina = 1;          // Animalità
        this.discipline[1].iddisciplina = 10;         // Proteide
        this.discipline[2].iddisciplina = 12;         // Robustezza
        this.discipline[0].nomedisc = 'Animalità';
        this.discipline[1].nomedisc = 'Proteide';
        this.discipline[2].nomedisc = 'Robustezza';
      break;
      case '6':		// Malkavian
        this.discipline[0].iddisciplina = 3;          // Auspex
        this.discipline[1].iddisciplina = 5;          // Demenza
        this.discipline[2].iddisciplina = 8;          // Oscurazione
        this.discipline[0].nomedisc = 'Auspex';
        this.discipline[1].nomedisc = 'Demenza';
        this.discipline[2].nomedisc = 'Oscurazione';
      break;
      case '7':		// Tremere
        this.discipline[0].iddisciplina = 3;          // Auspex
        this.discipline[1].iddisciplina = 6;          // Dominazione
        this.discipline[2].iddisciplina = 98;         // Taumaturgia
        this.discipline[0].nomedisc = 'Auspex';
        this.discipline[1].nomedisc = 'Dominazione';
        this.discipline[2].nomedisc = 'Taumaturgia';
      break;
      case '8':		// Lasombra
        this.discipline[0].iddisciplina = 6;          // Dominazione
        this.discipline[1].iddisciplina = 17;         // Potenza
        this.discipline[2].iddisciplina = 9;          // Ottenebramento
        this.discipline[0].nomedisc = 'Dominazione';
        this.discipline[1].nomedisc = 'Potenza';
        this.discipline[2].nomedisc = 'Ottenebramento';
      break;
      case '9':		// Tzimisce
        this.discipline[0].iddisciplina = 1;          // Animalità
        this.discipline[1].iddisciplina = 3;          // Auspex
        this.discipline[2].iddisciplina = 16;         // Vicissitudine
        this.discipline[0].nomedisc = 'Animalità';
        this.discipline[1].nomedisc = 'Auspex';
        this.discipline[2].nomedisc = 'Vicissitudine';
      break;
      case '10':	// Assamiti
        this.discipline[0].iddisciplina = 8;          // Oscurazione
        this.discipline[1].iddisciplina = 11;         // Quietus
        this.discipline[2].iddisciplina = 15;         // Velocità
        this.discipline[0].nomedisc = 'Oscurazione';
        this.discipline[1].nomedisc = 'Quietus';
        this.discipline[2].nomedisc = 'Velocità';
      break;
      case '11':	// Giovanni
        this.discipline[0].iddisciplina = 6;          // Dominazione
        this.discipline[1].iddisciplina = 99;         // Necromanzia
        this.discipline[2].iddisciplina = 17;         // Potenza
        this.discipline[0].nomedisc = 'Dominazione';
        this.discipline[1].nomedisc = 'Necromanzia';
        this.discipline[2].nomedisc = 'Potenza';
      break;
      case '12':	// Ravnos
        this.discipline[0].iddisciplina = 1;          // Animalità
        this.discipline[1].iddisciplina = 4;          // Chimerismo
        this.discipline[2].iddisciplina = 12;         // Robustezza
        this.discipline[0].nomedisc = 'Animalità';
        this.discipline[1].nomedisc = 'Chimerismo';
        this.discipline[2].nomedisc = 'Robustezza';
      break;
      case '13':	// Setiti
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 8;          // Oscurazione
        this.discipline[2].iddisciplina = 13;         // Serpentis
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Oscurazione';
        this.discipline[2].nomedisc = 'Serpentis';
      break;
      case '14':	// Cappadoci
        this.discipline[0].iddisciplina = 3;          // Auspex
        this.discipline[1].iddisciplina = 99;         // Necromanzia
        this.discipline[2].iddisciplina = 12;         // Robustezza
        this.discipline[0].nomedisc = 'Auspex';
        this.discipline[1].nomedisc = 'Necromanzia';
        this.discipline[2].nomedisc = 'Robustezza';
      break;
      case '15':	// Baali
        this.discipline[0].iddisciplina = 2;          // Ascendente
        this.discipline[1].iddisciplina = 19;         // Daimonion
        this.discipline[2].iddisciplina = 8;          // Oscurazione
        this.discipline[0].nomedisc = 'Ascendente';
        this.discipline[1].nomedisc = 'Daimonion';
        this.discipline[2].nomedisc = 'Oscurazione';
      break;
      case '20':	// Vili
        this.discipline[0].iddisciplina = 0;
        this.discipline[1].iddisciplina = 0;
        this.discipline[2].iddisciplina = 0;
        this.discipline[0].nomedisc = '';
        this.discipline[1].nomedisc = '';
        this.discipline[2].nomedisc = '';
      break;
      case '21':   //  City Gangrel
        this.discipline[0].iddisciplina = 8;          // Oscurazione  
        this.discipline[1].iddisciplina = 10;         // Proteide      
        this.discipline[2].iddisciplina = 15;         // Velocità
        this.discipline[0].nomedisc = 'Oscurazione';
        this.discipline[1].nomedisc = 'Proteide';
        this.discipline[2].nomedisc = 'Velocità';
      break;
    }

    // RESET Discipline pr evitare problemi

    for ( let j = 0; j < 3 ; j++) {
      this.discipline[j].livello = 0;

      this.taumaturgie[j].livello = 0;
      this.taumaturgie[j].idtaum = 0;

      this.necromanzie[j].livello = 0;
      this.necromanzie[j].idnecro = 0;
    }
    this.sommaDisc = 0 ;
    this.discOK = false;


  }



}
