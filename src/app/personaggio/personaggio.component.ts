import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaService } from '../_services/index';
import { GlobalStatus, Basicpg, FullDisciplina, FullTaumaturgia, FullNecromanzia, Skill, Background, Contatti, Pregio, Rituale } from '../global';


@Component({
  selector: 'app-personaggio',
  templateUrl: './personaggio.component.html',
  styleUrls: ['./personaggio.component.css']
})
export class PersonaggioComponent implements OnInit {


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

  constructor( private globalstatus: GlobalStatus, private route: ActivatedRoute, private schedaservice: SchedaService ) { }

  ngOnInit(): void {
    const idutente = Number ( this.route.snapshot.paramMap.get('id') );
    this.globalstatus.lastpg = idutente;

    this.schedaservice.getscheda(idutente)
    .subscribe (
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

        if (this.scheda.bio == '' || this.scheda.bio == null ) { this.scheda.bio = '- Non presente -';}
        if (this.scheda.note == '' || this.scheda.note == null ) { this.scheda.note = '- Nessuna -';}
      }
    );
  }

}
