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
  idnewtaum: string = '';
  statusPG: number = 1;

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

        this.scheda.xp = Number (this.scheda.xp);
        this.scheda['fdv']=Number(this.scheda['fdv']);
        this.scheda['valsentiero']=Number(this.scheda['valsentiero']);

        this.statusPG = Number(this.scheda.idstatus);
        console.log ('status '+this.statusPG);

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

  addtaum( iddtaum: number ) {
    /* Do something */
    console.log("add taum "+iddtaum);
  }

  newtaum ( lvl: number ) {
    /* Do something */
    console.log("new taum "+this.idnewtaum + ' ' + lvl);
  }
}
