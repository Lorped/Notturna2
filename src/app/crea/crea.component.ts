import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../services/index';
import { Clan, Status, Background, Contatti} from '../global';
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

    this.bgOK = false ;
    if ( (this.sommaBG === this.maxBG) && (this.sommaCont === this.maxCont) ) {
      this.bgOK = true ;
    }

  }

  addbg(bg: number){
    this.bgOK = false ;
    for (let j = 0; j < this.bg.length; j++ ) {
      if ( this.bg[j].idback === bg) {
        this.bg[j].livello++;
        this.sommaBG++;

      }
    }

    if ( bg == 77 ) {
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
      }
    }
    if ( bg == 77 ) {
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
    if ( (this.sommaBG === this.maxBG) && (this.sommaCont === this.maxCont) ) {
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
    return ok ;
  }

  doCrea() {}

}
