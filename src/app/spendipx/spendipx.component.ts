import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../services/index';
import { Basicpg, FullDisciplina, Taumaturgia, FullTaumaturgia, FullNecromanzia, Skill, Background, Contatti, Pregio, Rituale } from '../global';


@Component({
  selector: 'app-spendipx',
  templateUrl: './spendipx.component.html',
  styleUrls: ['./spendipx.component.css']
})
export class SpendipxComponent implements OnInit {

  idutente: number = 0 ;
  scheda: Basicpg = new Basicpg();


  discipline: Array<FullDisciplina> = [] ;

  costonewdisc: Array<number> = [];

  necromanzie: Array<FullNecromanzia> = [] ;
  taumaturgie: Array<FullTaumaturgia> = [] ;
  skills: Array<Skill> = [];
  attitudini: Array<Skill> = [];

  rituali: Array<Rituale> = [];

  newtaumaturgie: Array<Taumaturgia> = [] ;

  xpdisponibili = 0;


  livellitaum: Array<number> = [ 0 , 0 , 0 ];
  livellinecro: Array<number> = [ 0 , 0 , 0 ];


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

        this.scheda['fdv']=Number(this.scheda['fdv']);
        this.scheda['valsentiero']=Number(this.scheda['valsentiero']);

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

        for ( let j = 0 ; j < this.taumaturgie.length ; j++ ){
          this.taumaturgie[j].taumaturgia.livello = Number (this.taumaturgie[j].taumaturgia.livello);
          this.livellitaum [j] = Number ( this.taumaturgie[j].taumaturgia.livello );
        }



        this.necromanzie = data.necromanzie ;

        this.skills = data.skill ;
        this.attitudini = data.attitudini ;

        this.rituali = data.rituali;

        console.log(data);

        this.xpdisponibili = this.scheda.xp - this.scheda.xpspesi ;

        this.schedaservice.gettaum(this.idutente)
        .subscribe(
          (data: any) => {
            this.newtaumaturgie = data;
            console.log(this.newtaumaturgie);
          }
        );

      }
    );
  }

  addxp() {

    /* Do something */

    this.addXPform.patchValue({
      xptoadd: ""});

  }

  addattr(attr: string) {
    /* Do something */
  }

  adddisc ( iddisciplina: number ) {
      /* Do something */
      console.log("add disc "+iddisciplina);
  }

  addtaum( iddtaum: number ) {
    /* Do something */
    console.log("add taum "+iddtaum);
  }
}