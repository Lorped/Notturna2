import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../services/index';
import { Clan, Status, Background, Contatti, Attributo} from '../global';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-crea',
  templateUrl: './crea.component.html',
  styleUrls: ['./crea.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreaComponent implements OnInit {

  isLinear = true;

  clan: Array<Clan> = [];
  status: Array<Status> = [];
  bg: Array<Background> = [];

  generazionePG = 13;
  puntiFerita = 8;

  bgOK = false;
  sommaBG = 0;
  maxBG = 6;

  cont: Array<Contatti> = [];

  sommaCont = 0 ;
  maxCont = 0 ;

  creaForm = new FormGroup ({
    nomepersonaggio: new FormControl('', [
      Validators.required
    ]),
    nomeplayer: new FormControl('', [
      Validators.required
    ]),
    clanPG: new FormControl('', [
      Validators.required,
    ]),
    statusPG: new FormControl('', [
      Validators.required,
    ]),
    rifugio: new FormControl('', [
      Validators.required,
    ]),
    zona: new FormControl('', [
      Validators.required,
    ]),
  });


  attributi: Array<Attributo> = [];

  attr0 = 5;
  attr1 = 4;
  attr2 = 2;
  maxAttr = 11;
  sommaAttr = 0;
  attrCorrente = [ 3 , 3 , 3 ];
  attrCorrenteSort = [ 3 , 3 , 3 ];
  attrOK = false;


  constructor(private schedaservice: SchedaService) { }

  ngOnInit(): void {

    this.schedaservice.getregistra()
      .subscribe(
        (data: any) => {
          this.clan = data.clan;
          this.status = data.statuscama;
          this.creaForm.patchValue({
            statusPG: "1"});
          this.bg = data.background;

          for (let j = 0 ; j < this.bg.length ; j++) {    // Rifugio minimo a 1
              this.bg[j].livello = this.bg[j].MinIniziale;
              this.bg[j].MinIniziale = Number (data.background[j].MinIniziale);
              this.bg[j].MaxIniziale = Number (data.background[j].MaxIniziale);
          }
        });

      for ( let j = 0 ; j <3 ; j++) {               // Inizializzo i contatti
        this.cont[j] = new Contatti;
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

  changestatus () {
    switch (this.statusPG!.value) {
      case "0":
        this.maxBG = 5;
        break;
      case "1":
        this.maxBG = 6;
        break;
      case "2":
        this.maxBG = 8;
        break;
      case "3":
        this.maxBG = 10;
        break;
      case "4":
        this.maxBG = 15;
        break;
      case "5":
        this.maxBG = 25;
        break;
      default:
        this.maxBG = 6;
        break;
    }
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
    for (let j = 0; j < this.bg.length; j++ ) {
      if ( this.bg[j].idback === bg) {
        this.bg[j].livello--;
        this.sommaBG--;
        if ( bg == 5 ) {     /* generazione */
          this.changeGen(this.bg[j].livello);
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
    if (this.cont[cc].livello==0) {
      this.cont[cc].nomecontatto='';
    }
    this.sommaCont--;
    this.bgOK = false ;
    this.checkbg () ;
  }

  checkbg () {
    let ok = false;
    if ( (this.sommaBG === this.maxBG) && ((this.sommaCont === this.maxCont)||this.maxCont===0 )) {
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

  changeGen(bggen:number) {
    console.log("BG gen = "+bggen);
    this.generazionePG = 13 - bggen;

    console.log("generazionePG = "+this.generazionePG);

    switch (this.generazionePG ) {
      case 14:
        this.attr0 = 4;
        this.attr1 = 3;
        this.attr2 = 2;
        this.maxAttr = 9;
        break;
      case 13:
        this.attr0 = 5;
        this.attr1 = 4;
        this.attr2 = 2;
        this.maxAttr = 11;
        break;
      case 12:
        this.attr0 = 6;
        this.attr1 = 4;
        this.attr2 = 2;
        this.maxAttr = 12;
        break;
      case 11:
        this.attr0 = 6;
        this.attr1 = 5;
        this.attr2 = 2;
        this.maxAttr = 13;
        break;
      case 10:
        this.attr0 = 7;
        this.attr1 = 5;
        this.attr2 = 3;
        this.maxAttr = 15;
        break;
      case 9:
        this.attr0 = 7;
        this.attr1 = 6;
        this.attr2 = 4;
        this.maxAttr = 17;
        break;
      case 8:
        this.attr0 = 8;
        this.attr1 = 6;
        this.attr2 = 4;
        this.maxAttr = 18;
        break;
      default:
        this.attr0 = 5;
        this.attr1 = 4;
        this.attr2 = 2;
        this.maxAttr = 11;
        break;
    }
    this.checkattr();
  }

  minattr(id:number) {
    this.attributi[id].Livello--;

    this.attrCorrente[0] = this.attributi[0].Livello + this.attributi[3].Livello + this.attributi[6].Livello;
    this.attrCorrente[1] = this.attributi[1].Livello + this.attributi[4].Livello + this.attributi[7].Livello;
    this.attrCorrente[2] = this.attributi[2].Livello + this.attributi[5].Livello + this.attributi[8].Livello;

    this.attrCorrenteSort = this.attrCorrente.sort((n1,n2) => n1 - n2);

    this.sommaAttr--;

    //console.log ("sommaAttr "+this.sommaAttr+" maxAttr "+this.maxAttr);
    this.checkattr();

  }
  addattr(id:number) {
    this.attributi[id].Livello++;

    this.attrCorrente[0] = this.attributi[0].Livello + this.attributi[3].Livello + this.attributi[6].Livello;
    this.attrCorrente[1] = this.attributi[1].Livello + this.attributi[4].Livello + this.attributi[7].Livello;
    this.attrCorrente[2] = this.attributi[2].Livello + this.attributi[5].Livello + this.attributi[8].Livello;

    this.attrCorrenteSort = this.attrCorrente.sort((n1,n2) => n1 - n2);

    this.sommaAttr++;
    //console.log ("sommaAttr "+this.sommaAttr+" maxAttr "+this.maxAttr);
    this.checkattr();
  }

  checkattr () {
    this.attrOK = false;
    if ( this.attr2 + 3 == this.attrCorrenteSort[0] &&
         this.attr1 + 3 == this.attrCorrenteSort[1] &&
         this.attr0 + 3 == this.attrCorrenteSort[2] ) {
      this.attrOK = true;
    }
    console.log("attrOK "+this.attrOK );
    console.log(this.attr2+ " "+this.attr1+" " +this.attr0);
    console.log(this.attrCorrenteSort[0]+ " "+this.attrCorrenteSort[1]+" " +this.attrCorrenteSort[2]);
  }
}
