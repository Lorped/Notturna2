import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaService } from '../_services/index';
import { GlobalStatus, Basicpg, FullDisciplina, FullTaumaturgia, FullNecromanzia, Disciplina, Skill, Background, Contatti, Pregio, Rituale, Amalgama } from '../global';


@Component({
  selector: 'app-personaggio',
  templateUrl: './personaggio.component.html',
  styleUrls: ['./personaggio.component.css']
})
export class PersonaggioComponent implements OnInit {

  otherdisc: Array<Disciplina> = [];
  idnewdisc = '';


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

  amalgame: Array<Amalgama> = [];

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

        this.scheda['contanti'] = Number(this.scheda['contanti']);

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

        this.schedaservice.getamalgame(idutente).subscribe(
          (data: any) => {
            this.amalgame = data.amalgame;
            //console.log (this.amalgame);
          }
        );
        this.schedaservice.getotherdisc(idutente)
        .subscribe(
          (data: any) => {
            this.otherdisc = data.otherdisc;
            // console.log (this.otherdisc);
          }
        );
      }
    );
  }


  // DISCIPLINE

  rdx (id: number) {

    this.schedaservice.changedisc_master(this.globalstatus.lastpg, id, -1).subscribe(
      (data:any) => {
        const disciplina = this.discipline.find(d => d.disciplina.iddisciplina === id);
        if (disciplina) {
          disciplina.disciplina.livello--;
          // console.log ( "riduco", disciplina.disciplina.nomedisc);
        }
      }
    );
  }

  adx (id: number) {

    this.schedaservice.changedisc_master(this.globalstatus.lastpg, id, 1).subscribe(
      (data:any) => {
        const disciplina = this.discipline.find(d => d.disciplina.iddisciplina === id);
        if (disciplina) {
          disciplina.disciplina.livello++;
          // console.log ( "aumento", disciplina.disciplina.nomedisc);
        }
      }
    );
  }

    






  // STAT BASE

  rda (stat: string) {    
    
    this.schedaservice.changeattr_master(this.globalstatus.lastpg, stat, -1).subscribe(
      (data:any) => {
        (this.scheda as any) [stat] --;
        // console.log ( "riduco", stat);
        
      }
    );
  }


  ada (stat: string) {    

    this.schedaservice.changeattr_master(this.globalstatus.lastpg, stat, 1).subscribe(
      (data:any) => {
        (this.scheda as any) [stat] ++;
        // console.log ( "aumento", stat);
      }
    );
  } 

  // SKILL
  
  rds (idskill: number) {
    this.schedaservice.changeskill_master(this.globalstatus.lastpg, idskill, -1).subscribe(
      (data:any) => {
        const skill = this.skills.find (s => s.idskill === idskill);
        if (skill) {
          skill.livello--;
          // console.log ( "riduco", skill.nomeskill);
        }
      }
    );
  }
  ads (idskill: number) {
    this.schedaservice.changeskill_master(this.globalstatus.lastpg, idskill, 1).subscribe(
      (data:any) => {
        const skill = this.skills.find (s => s.idskill === idskill);
        if (skill) {
          skill.livello++;
          // console.log ( "aumento", skill.nomeskill);
        }
      }
    );
  }

  //SKILL - ATTITUDINI

  rdsx (idskill: number) {
    this.schedaservice.changeskill_master(this.globalstatus.lastpg, idskill, -1).subscribe(
      (data:any) => {
        const skill = this.attitudini.find (s => s.idskill === idskill);
        if (skill) {
          skill.livello--;
          // console.log ( "riduco", skill.nomeskill);
        }
      }
    );
  }
  adsx (idskill: number) {
    this.schedaservice.changeskill_master(this.globalstatus.lastpg, idskill, 1).subscribe(
      (data:any) => {
        const skill = this.attitudini.find (s => s.idskill === idskill);
        if (skill) {
          skill.livello++;
          // console.log ( "aumento", skill.nomeskill);
        }
      }
    );
  }

  newdisc() {
    this.schedaservice.adddisciplina_master(this.globalstatus.lastpg, this.idnewdisc).subscribe(
      (data:any) => {
        // console.log ( "aggiunta", this.idnewdisc);
        this.schedaservice.getscheda(this.globalstatus.lastpg)
          .subscribe (
            (data: any) => {
              this.discipline = data.discipline ;

              this.schedaservice.getotherdisc(this.globalstatus.lastpg).subscribe(
                (data: any) => {
                  this.otherdisc = data.otherdisc;
                  // console.log (this.otherdisc);
                }
              );
              
            }
          );
      } 
    );
    
  }

  disclan(iddisciplina: number){
    this.schedaservice.diclan_master(this.globalstatus.lastpg, iddisciplina).subscribe(
      (data:any) => {
        // console.log( "diclan", iddisciplina);
        var disc = this.discipline.find(d => d.disciplina.iddisciplina === iddisciplina);
        if ( disc) {
          disc.disciplina.DiClan == "S" ? disc.disciplina.DiClan = "N" : disc.disciplina.DiClan = "S";
        }
      }
    );
  }


  cancdisciplina(iddisciplina: number){
    this.schedaservice.cancdisciplina_master(this.globalstatus.lastpg, iddisciplina).subscribe(
      (data:any) => {
        // console.log( "cancdisciplina", iddisciplina);
        var disc = this.discipline.find(d => d.disciplina.iddisciplina === iddisciplina);
        if ( disc) {
          this.discipline.splice(this.discipline.indexOf(disc), 1);
        }
        this.schedaservice.getotherdisc(this.globalstatus.lastpg).subscribe(
          (data: any) => {
            this.otherdisc = data.otherdisc;
            // console.log (this.otherdisc);
          }
        );
      }
    );
  }

}
