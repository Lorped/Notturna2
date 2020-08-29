import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../_services/index';
import { Basicpg, FullDisciplina, FullTaumaturgia, FullNecromanzia, Skill, Background, Contatti, Pregio, Rituale } from '../global';

@Component({
  selector: 'app-scheda',
  templateUrl: './scheda.component.html',
  styleUrls: ['./scheda.component.css']
})
export class SchedaComponent implements OnInit {

  idutente = 0 ;
  scheda: Basicpg = new Basicpg();
  pf = 0 ;
  rp = 0 ;
  rd = 0 ;
  psvuoti = 0 ;

  discipline: Array<FullDisciplina> = [] ;
  necromanzie: Array<FullNecromanzia> = [] ;
  taumaturgie: Array<FullTaumaturgia> = [] ;

  background: Array<Background> = [] ;
  contatti: Array<Contatti> = [];
  maxcontatti = 0;

  skills: Array<Skill> = [];
  attitudini: Array<Skill> = [];

  pregi: Array<Pregio> = [];
  rituali: Array<Rituale> = [];

  constructor(private schedaservice: SchedaService) { }

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getscheda(this.idutente).
    subscribe (
      (data: any) => {
        this.scheda = data.user ;
        this.pf = data.pf ;
        this.rp = data.rp ;
        this.rd = Math.floor(
                            ( Number(this.scheda['carisma'])
                            + Number(this.scheda['intelligenza'])
                            + Number(this.scheda['prontezza'])
                            + Number(this.scheda['percezione'])
                            + Number(this.scheda['fdv']) )
                            / 5 );

        this.scheda['forza'] = Number(this.scheda['forza']);
        this.scheda['destrezza'] = Number(this.scheda['destrezza']);
        this.scheda['attutimento'] = Number(this.scheda['attutimento']);
        this.scheda['carisma'] = Number(this.scheda['carisma']);
        this.scheda['persuasione'] = Number(this.scheda['persuasione']);
        this.scheda['saggezza'] = Number(this.scheda['saggezza']);
        this.scheda['prontezza'] = Number(this.scheda['prontezza']);
        this.scheda['intelligenza'] = Number(this.scheda['intelligenza']);
        this.scheda['percezione'] = Number(this.scheda['percezione']);

        this.scheda['fdv'] = Number(this.scheda['fdv']);

        this.scheda['sete'] = Number(this.scheda['sete']);
        this.scheda['addsete'] = Number(this.scheda['addsete']);
        this.scheda['PScorrenti'] = Number(this.scheda['PScorrenti']);
        this.psvuoti = this.scheda['sete'] + this.scheda['addsete'] - this.scheda['PScorrenti'];

        this.scheda['fama1'] = Number(this.scheda['fama1']);
        this.scheda['fama2'] = Number(this.scheda['fama2']);
        this.scheda['fama3'] = Number(this.scheda['fama3']);

        this.discipline = data.discipline ;
        this.taumaturgie = data.taumaturgie ;
        this.necromanzie = data.necromanzie ;

        this.skills = data.skill ;
        this.attitudini = data.attitudini ;
        this.background = data.background ;
        this.contatti = data.contatti;

        this.maxcontatti = 0;
        for ( let item of this.contatti) {
          this.maxcontatti += Number(item.livello);
        }

        this.pregi = data.pregidifetti;
        this.rituali = data.rituali;

      }
    );
  }

  stampascheda(){
      window.open( 'https://www.roma-by-night.it/notturna/scheda3.php?idutente='+this.idutente, '_blank');
  }

}
