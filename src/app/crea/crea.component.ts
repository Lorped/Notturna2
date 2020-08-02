import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../services/index';
import { Clan, Status, Background } from '../global';

@Component({
  selector: 'app-crea',
  templateUrl: './crea.component.html',
  styleUrls: ['./crea.component.css']
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

  backgroundForm = new FormGroup ({

  });


  constructor(private schedaservice: SchedaService) { }

  ngOnInit(): void {

    this.schedaservice.getregistra()
      .subscribe(
        (data: any) => {
          console.log(data);
          this.clan = data.clan;
          this.status = data.statuscama;
          this.creaForm.patchValue({
            statusPG: "1"});
          this.bg = data.background;
          console.log(this.bg);
        });
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

    console.log("here");
    console.log(this.statusPG!.value);

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
    if (this.sommaBG === this.maxBG ) {
      this.bgOK = true ;
    }
    console.log("new MaxBG");
    console.log(this.maxBG);
    console.log(this.bgOK);
  }

  addbg(bg: number){
    this.bgOK = false ;
    for (let j = 0; j < this.bg.length; j++ ) {
      if ( this.bg[j].idback === bg) {
        this.bg[j].livello++;
        this.sommaBG++;
      }
    }
    if (this.sommaBG === this.maxBG ) {
      this.bgOK = true ;
    }
  }
  minbg(bg: number){
    this.bgOK = false ;
    for (let j = 0; j < this.bg.length; j++ ) {
      if ( this.bg[j].idback === bg) {
        this.bg[j].livello--;
        this.sommaBG--;
      }
    }
    if (this.sommaBG === this.maxBG ) {
      this.bgOK = true ;
    }
  }


  doCrea() {}

}
