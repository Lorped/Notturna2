import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../_services/index';
import { Clan, Status, Background, Contatti, Attributo, Disciplina, Taumaturgia, Necromanzia, Skill, Sentiero, Basicpg} from '../global';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crea',
  templateUrl: './crea.component.html',
  styleUrls: ['./crea.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreaComponent implements OnInit {

  isLinear = true;  // FALSE SOLO PER TEST !!!!!

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

  sommaCont = 0 ;
  maxCont = 0 ;

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
  attrCorrente = [ 3 , 3 , 3 ];
  attrCorrenteSort = [ 3 , 3 , 3 ];
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
  attitudini: Array<Skill> = [];


  sentieri: Array<Sentiero> = [];
  baseFDVmax = 2;           /* Dipende da Status */
  FDVadd = 0;

  baseumanita = 5;          /* Punteggio base */
  umanitaadd = 0;

  freepoint = 2;        /* da spendere su FdV o umanità */
  freeOK = false;

  sentieroPG = '1';       /* umanità */


  constructor(private schedaservice: SchedaService , private router: Router) { }


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
        this.attitudini = data.attitudini;
        this.sentieri = data.sentieri;

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

    this.attributi[0] = new Attributo ( 0, 'Forza'        , 'F' , 1 );
    this.attributi[1] = new Attributo ( 1, 'Carisma'      , 'S' , 1 );
    this.attributi[2] = new Attributo ( 2, 'Percezione'   , 'M' , 1 );
    this.attributi[3] = new Attributo ( 3, 'Destrezza'    , 'F' , 1 );
    this.attributi[4] = new Attributo ( 4, 'Persuasione'  , 'S' , 1 );
    this.attributi[5] = new Attributo ( 5, 'Intelligenza' , 'M' , 1 );
    this.attributi[6] = new Attributo ( 6, 'Attutimento'  , 'F' , 1 );
    this.attributi[7] = new Attributo ( 7, 'Saggezza'     , 'S' , 1 );
    this.attributi[8] = new Attributo ( 8, 'Prontezza'    , 'M' , 1 );

    this.discipline[0] = new Disciplina();
    this.discipline[1] = new Disciplina();
    this.discipline[2] = new Disciplina();

    this.taumaturgie[0] = new Taumaturgia();
    this.taumaturgie[1] = new Taumaturgia();
    this.taumaturgie[2] = new Taumaturgia();

    this.necromanzie[0] = new Necromanzia();
    this.necromanzie[1] = new Necromanzia();
    this.necromanzie[2] = new Necromanzia();

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
        this.baseFDVmax = 1;
        break;
      case '1':
        this.maxBG = 6;
        this.numDisc = 5;
        this.baseFDVmax = 2;
        break;
      case '2':
        this.maxBG = 8;
        this.numDisc = 6;
        this.baseFDVmax = 3;
        break;
      case '3':
        this.maxBG = 10;
        this.numDisc = 7;
        this.baseFDVmax = 4;
        break;
      case '4':
        this.maxBG = 15;
        this.numDisc = 10;
        this.baseFDVmax = 5;
        break;
      case '5':
        this.maxBG = 25;
        this.numDisc = 15;
        this.baseFDVmax = 7;
        break;
      default:
        this.maxBG = 6;
        this.numDisc = 5;
        this.baseFDVmax = 2;
        break;
    }
    this.changeMaxDisc();
    this.changeNumSkill();
    this.checkbg () ;
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

    this.checkbg () ;
  }


  addcont(cc: number){
    this.cont[cc].livello++;
    this.sommaCont++;
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

  checkbg () {
    let ok = false;
    if ( (this.sommaBG === this.maxBG) && ((this.sommaCont === this.maxCont) || this.maxCont === 0 )) {
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
    this.bgOK = ok;
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
        break;
      case 13:
        this.attr0 = 5;
        this.attr1 = 4;
        this.attr2 = 2;
        this.maxAttr = 11;
        this.numAttitudini = 4;
        break;
      case 12:
        this.attr0 = 6;
        this.attr1 = 4;
        this.attr2 = 2;
        this.maxAttr = 12;
        this.numAttitudini = 4;
        break;
      case 11:
        this.attr0 = 6;
        this.attr1 = 5;
        this.attr2 = 2;
        this.maxAttr = 13;
        this.numAttitudini = 4;
        break;
      case 10:
        this.attr0 = 7;
        this.attr1 = 5;
        this.attr2 = 3;
        this.maxAttr = 15;
        this.numAttitudini = 5;
        break;
      case 9:
        this.attr0 = 7;
        this.attr1 = 6;
        this.attr2 = 4;
        this.maxAttr = 17;
        this.numAttitudini = 7;
        break;
      case 8:
        this.attr0 = 8;
        this.attr1 = 6;
        this.attr2 = 4;
        this.maxAttr = 18;
        this.numAttitudini = 8;
        break;
      default:
        this.attr0 = 5;
        this.attr1 = 4;
        this.attr2 = 2;
        this.maxAttr = 11;
        this.numAttitudini = 4;
        break;
    }
    this.changeMaxDisc();
    this.changeNumSkill();
    this.checkattr();
  }

  minattr(id: number) {
    this.attributi[id].Livello--;

    this.attrCorrente[0] = this.attributi[0].Livello + this.attributi[3].Livello + this.attributi[6].Livello;
    this.attrCorrente[1] = this.attributi[1].Livello + this.attributi[4].Livello + this.attributi[7].Livello;
    this.attrCorrente[2] = this.attributi[2].Livello + this.attributi[5].Livello + this.attributi[8].Livello;

    this.attrCorrenteSort = this.attrCorrente.slice().sort((n1,n2) => n1 - n2);

    this.sommaAttr--;

    this.checkattr();
  }
  addattr(id: number) {
    this.attributi[id].Livello++;

    this.attrCorrente[0] = this.attributi[0].Livello + this.attributi[3].Livello + this.attributi[6].Livello;
    this.attrCorrente[1] = this.attributi[1].Livello + this.attributi[4].Livello + this.attributi[7].Livello;
    this.attrCorrente[2] = this.attributi[2].Livello + this.attributi[5].Livello + this.attributi[8].Livello;

    this.attrCorrenteSort = this.attrCorrente.slice().sort((n1,n2) => n1 - n2);

    this.sommaAttr++;

    this.checkattr();
  }

  checkattr() {
    this.attrOK = false;
    if ( this.attr2 + 3 == this.attrCorrenteSort[0] &&
         this.attr1 + 3 == this.attrCorrenteSort[1] &&
         this.attr0 + 3 == this.attrCorrenteSort[2] ) {
      this.attrOK = true;
    }

    this.maxAttitudini = this.attributi[3].Livello;  /* DESTREZZA */

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

    this.checkDisc();
  }

  checkDisc() {
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

  addsk(sk: number) {
    for (let j = 0 ; j < this.skill.length ; j++ ) {
      if ( this.skill[j].idskill === sk) {
        this.skill[j].livello++;
      }
    }
    this.sommaSkill++;
    this.checkSkill();
  }
  minsk(sk:number) {
    for (let j = 0 ; j < this.skill.length ; j++ ) {
      if ( this.skill[j].idskill === sk) {
        this.skill[j].livello--;
      }
    }
    this.sommaSkill--;
    this.checkSkill();
  }
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

    aPG.fdv = this.baseFDVmax + this.FDVadd ;
    aPG.idstatus = this.statusPG!.value ;

    aPG.idsentiero = Number(this.sentieroPG) ;
    aPG.valsentiero = this.baseumanita + this.umanitaadd ;

    aPG.rifugio = this.rifugio!.value;
    aPG.zona = this.zona!.value;

    this.schedaservice.putregistra( aPG , this.bg , this.cont , this.discipline , this.taumaturgie , this.necromanzie , this.attitudini, this.skill )
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

}
