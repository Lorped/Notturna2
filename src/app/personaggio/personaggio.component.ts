import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaService } from '../_services/index';
import { Necromanzia, Taumaturgia, GlobalStatus, Basicpg, BasicpgStat, FullDisciplina, FullTaumaturgia, FullNecromanzia, Disciplina, Skill, Background, Contatti, Pregio, Rituale,  Alleati } from '../global';
import { GetScheda } from '../_services/scheda.service';



interface GetOtherdisc {
    otherdisc: Disciplina[],
    othernecro: Necromanzia[],
    othertaum: Taumaturgia[]
}

@Component({
    selector: 'app-personaggio',
    templateUrl: './personaggio.component.html',
    styleUrls: ['./personaggio.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PersonaggioComponent implements OnInit {

  otherdisc: Disciplina[] = [];
  othernecro: Necromanzia[] = [];
  othertaum: Taumaturgia[] = [];
  idnewdisc = '';
  idnewnecro = '';
  idnewtaum = '';


  scheda: Basicpg = new Basicpg();
  pf = 0 ;
  rp = 0 ;
  rd = 0 ;
  psvuoti = 0 ;

  discipline: FullDisciplina[] = [] ;
  necromanzie: FullNecromanzia[] = [] ;
  taumaturgie: FullTaumaturgia[] = [] ;

  background: Background[] = [] ;
  contatti: Contatti[] = [] ;
  alleati: Alleati[] = [] ;
  maxcontatti = 0;
  maxalleati = 0;

  skills: Skill[] = [];
  otherskill: Skill[] = [];
  attitudini: Skill[] = [];

  pregi: Pregio[] = [];
  rituali: Rituale[] = [];

  isTaumaturgo = false;
  isNecromante = false;

  private globalstatus = inject(GlobalStatus);
  private route = inject(ActivatedRoute);
  private schedaservice = inject(SchedaService);



  ngOnInit(): void {
    const idutente = Number ( this.route.snapshot.paramMap.get('id') );
    this.globalstatus.lastpg = idutente;

    this.schedaservice.getscheda<GetScheda>(idutente)
    .subscribe (
      (data: GetScheda) => {
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

        /*
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
        */
        //this.scheda['sete'] = Number(this.scheda['sete']);
        //this.scheda['addsete'] = Number(this.scheda['addsete']);
        // this.scheda['PScorrenti'] = Number(this.scheda['PScorrenti']);
        /*
        this.scheda['fama1'] = Number(this.scheda['fama1']);
        this.scheda['fama2'] = Number(this.scheda['fama2']);
        this.scheda['fama3'] = Number(this.scheda['fama3']);

        this.scheda['bane'] = Number(this.scheda['bane']);

        this.scheda['contanti'] = Number(this.scheda['contanti']);
        */

        this.psvuoti = this.scheda['maxps'] - this.scheda['PScorrenti'];


        this.discipline = data.discipline ;
        this.taumaturgie = data.taumaturgie ;
        this.necromanzie = data.necromanzie ;

        this.skills = data.skill ;
        this.otherskill = data.otherskill ;
        this.attitudini = data.attitudini ;
        this.background = data.background ;
        this.contatti = data.contatti;
        this.alleati = data.alleati;
       
        this.maxalleati = 0;
        for ( const item of this.alleati) {
          this.maxalleati += item.livello;
        }

        this.maxcontatti = 0;
        for ( const item of this.contatti) {
          this.maxcontatti += item.livello;
        }

        this.pregi = data.pregidifetti;
        this.rituali = data.rituali;

        if (this.scheda.bio == '' || this.scheda.bio == null ) { this.scheda.bio = '- Non presente -';}
        if (this.scheda.note == '' || this.scheda.note == null ) { this.scheda.note = '- Nessuna -';}


        const taum = this.discipline.find(t => t.disciplina.iddisciplina == 98);
        if (taum) { this.isTaumaturgo = true; }

        const necro = this.discipline.find(n => n.disciplina.iddisciplina == 99);
        if (necro) { this.isNecromante = true; }

        //console.log (this.scheda);


        this.schedaservice.getotherdisc<GetOtherdisc>(idutente)
        .subscribe(
          (data: GetOtherdisc) => {
            this.otherdisc = data.otherdisc;
            this.othernecro = data.othernecro;
            this.othertaum = data.othertaum;
            // console.log (this.otherdisc);
          }
        );
      }
    );
  }


  // DISCIPLINE

  rdx (id: number) {

    this.schedaservice.changedisc_master(this.globalstatus.lastpg, id, -1).subscribe(
      () => {
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
      () => {
        const disciplina = this.discipline.find(d => d.disciplina.iddisciplina === id);
        if (disciplina) {
          disciplina.disciplina.livello++;
          // console.log ( "aumento", disciplina.disciplina.nomedisc);
        }
      }
    );
  }

    






  // STAT BASE

  rda (stat: BasicpgStat) {
    
    this.schedaservice.changeattr_master(this.globalstatus.lastpg, stat, -1).subscribe(
      () => {
        this.scheda[stat]--;
        // console.log ( "riduco", stat);
        
      }
    );
  }


  ada (stat: BasicpgStat) {

    this.schedaservice.changeattr_master(this.globalstatus.lastpg, stat, 1).subscribe(
      () => {
        this.scheda[stat]++;
        // console.log ( "aumento", stat);
      }
    );
  } 

 // OTHER SKILL
  
  rdos (idskill: number) {
    this.schedaservice.changeskill_master(this.globalstatus.lastpg, idskill, -1).subscribe(
      () => {
        const skill = this.otherskill.find (s => s.idskill === idskill);
        if (skill) {
          skill.livello--;
          // console.log ( "riduco", skill.nomeskill);
        }
      }
    );
  }
  ados (idskill: number) {
    this.schedaservice.changeskill_master(this.globalstatus.lastpg, idskill, 1).subscribe(
      () => {
        const skill = this.otherskill.find (s => s.idskill === idskill);
        if (skill) {
          skill.livello++;
          // console.log ( "aumento", skill.nomeskill);
        }
      }
    );
  }


  // SKILL
  
  rds (idskill: number) {
    this.schedaservice.changeskill_master(this.globalstatus.lastpg, idskill, -1).subscribe(
      () => {
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
      () => {
        const skill = this.skills.find (s => s.idskill === idskill);
        if (skill) {
          skill.livello++;
          // console.log ( "aumento", skill.nomeskill);
        }
      }
    );
  }

   // sub SKILL

  rdss (idskill: number, xidskill: number) {
    for (const skill of this.skills) {
      if (skill.idskill == xidskill){
        for (const subskill of skill.subskill2){
          if (subskill.idskill == idskill){
            subskill.livello -- ;
          }
        }
      }
    }

    this.schedaservice.changeskill_master(this.globalstatus.lastpg, idskill, -1).subscribe(
      () => {
        const skill = this.skills.find (s => s.idskill === idskill);
        if (skill) {
          skill.livello--;
          // console.log ( "riduco", skill.nomeskill);
        }
      }
    );
  }

  adss (idskill: number, xidskill: number) {
    for (const skill of this.skills) {
      if (skill.idskill == xidskill){
        for (const subskill of skill.subskill2){
          if (subskill.idskill == idskill){
            subskill.livello ++ ;
          }
        }
      }
    }

    this.schedaservice.changeskill_master(this.globalstatus.lastpg, idskill, 1).subscribe(
      () => {
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
      () => {
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
      () => {
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
      () => {
        // console.log ( "aggiunta", this.idnewdisc);
        this.schedaservice.getscheda<GetScheda>(this.globalstatus.lastpg)
          .subscribe (
            (data: GetScheda) => {
              this.discipline = data.discipline ;

              this.schedaservice.getotherdisc<GetOtherdisc>(this.globalstatus.lastpg).subscribe(
                (data: GetOtherdisc) => {
                  this.otherdisc = data.otherdisc;
                  // console.log (this.otherdisc);

                  this.idnewdisc = '';

                  this.isTaumaturgo = false;
                  this.isNecromante = false;
                  const taum = this.discipline.find(t => t.disciplina.iddisciplina == 98);
                  if (taum) { this.isTaumaturgo = true; }
                  const necro = this.discipline.find(n => n.disciplina.iddisciplina == 99);
                  if (necro) { this.isNecromante = true; }


                }
              );
              
            }
          );
      } 
    );
    
  }

  disclan(iddisciplina: number){
    this.schedaservice.diclan_master(this.globalstatus.lastpg, iddisciplina).subscribe(
      () => {
        // console.log( "diclan", iddisciplina);
        const disc = this.discipline.find(d => d.disciplina.iddisciplina === iddisciplina);
        if ( disc) {
          disc.disciplina.DiClan = disc.disciplina.DiClan === 'S' ? 'N' : 'S';
        }
      }
    );
  }


  cancdisciplina(iddisciplina: number){
    this.schedaservice.cancdisciplina_master(this.globalstatus.lastpg, iddisciplina).subscribe(
      () => {
        // console.log( "cancdisciplina", iddisciplina);
        const disc = this.discipline.find(d => d.disciplina.iddisciplina === iddisciplina);
        if ( disc) {
          this.discipline.splice(this.discipline.indexOf(disc), 1);
        }
        this.schedaservice.getotherdisc<GetOtherdisc>(this.globalstatus.lastpg).subscribe(
          (data: GetOtherdisc) => {
            this.otherdisc = data.otherdisc;

            this.isTaumaturgo = false;
            this.isNecromante = false;
            const taum = this.discipline.find(t => t.disciplina.iddisciplina == 98);
            if (taum) { this.isTaumaturgo = true; }
            const necro = this.discipline.find(n => n.disciplina.iddisciplina == 99);
            if (necro) { this.isNecromante = true; }
            // console.log (this.otherdisc);
          }
        );
      }
    );
  }

  newtaum(idtaum: string) {
    this.schedaservice.addnecrotaum_master(this.globalstatus.lastpg, "T", Number(idtaum)).subscribe(()=>{
      const xx = new FullTaumaturgia();
      xx.taumaturgia.idtaum = Number(idtaum);
      xx.taumaturgia.nometaum = this.othertaum.find(t => t.idtaum == Number(idtaum))?.nometaum || '';
      const prim = this.taumaturgie.find(t => t.taumaturgia.principale == 1);
      if (prim) {
        const sec = this.taumaturgie.find(t => t.taumaturgia.principale == 2);
        if (sec) {
          xx.taumaturgia.principale = 3;
        } else {
          xx.taumaturgia.principale = 2;
        } 
      } else {
        xx.taumaturgia.principale = 1;
      }
      this.othertaum = this.othertaum.filter(t => Number(t.idtaum) !== Number(idtaum));
      this.taumaturgie.push(xx);
      this.idnewtaum = '';
    });
  }
  newnecro(idnecro: string) {
    this.schedaservice.addnecrotaum_master(this.globalstatus.lastpg, "N", Number(idnecro)).subscribe(()=>{
      const xx = new FullNecromanzia();
      xx.necromanzia.idnecro = Number(idnecro);
      xx.necromanzia.nomenecro = this.othernecro.find(n => n.idnecro == Number(idnecro))?.nomenecro || '';
      const prim = this.necromanzie.find(n => n.necromanzia.principale == 1);
      if (prim) {
        const sec = this.necromanzie.find(n => n.necromanzia.principale == 2);
        xx.necromanzia.principale = sec ? 3 : 2;
      } else {
        xx.necromanzia.principale = 1;
      }
      this.othernecro = this.othernecro.filter(n => Number(n.idnecro) !== Number(idnecro));
      this.necromanzie.push(xx);
      this.idnewnecro = '';
    });  
  }

  cancellavia(iddisciplina: number, necrotaum: string) {
    this.schedaservice.cancellavia_master(this.globalstatus.lastpg, necrotaum, iddisciplina).subscribe(() => {
      if (necrotaum == 'T') {
        const taum = this.taumaturgie.find(t => t.taumaturgia.idtaum === iddisciplina);
        if (taum) {
          this.taumaturgie = this.taumaturgie.filter(t => t !== taum);
          this.othertaum.push(taum.taumaturgia);
        }
      } else {
        const necro = this.necromanzie.find(n => n.necromanzia.idnecro === iddisciplina);
        if (necro) {
          this.necromanzie = this.necromanzie.filter(n => n !== necro);
          this.othernecro.push(necro.necromanzia);
        }
      }
    });
  }

  riducivia(idtaum: number) {
    console.log("riducivia", idtaum);
    const taum = this.taumaturgie.find(t => t.taumaturgia.idtaum === idtaum);
    if (taum && taum.taumaturgia.livello > 0) {
      this.schedaservice.changenecrotaum_master(this.globalstatus.lastpg, idtaum, -1,"T").subscribe(() => {
        taum.taumaturgia.livello--;
        if (taum.taumaturgia.principale == 1){
          this.discipline.find(d => d.disciplina.iddisciplina == 98)!.disciplina.livello = taum.taumaturgia.livello;
          const sec = this.taumaturgie.find(t => t.taumaturgia.principale == 2);
          if (sec) {
            if (sec.taumaturgia.livello >= taum.taumaturgia.livello) {
              sec.taumaturgia.livello --;
              const ter = this.taumaturgie.find(t => t.taumaturgia.principale == 3);
              if (ter) {
                if (ter.taumaturgia.livello >= sec.taumaturgia.livello) {
                  ter.taumaturgia.livello = sec.taumaturgia.livello - 1;
                }
              }
            }
          }
        } else if (taum.taumaturgia.principale == 2){
          const ter = this.taumaturgie.find(t => t.taumaturgia.principale == 3);
          if (ter) {
            if (ter.taumaturgia.livello >= taum.taumaturgia.livello) {
              ter.taumaturgia.livello = taum.taumaturgia.livello - 1;
            }
          }
        // console.log("riducivia", idtaum);
        }
      });
    }
  }

  puoAumentareVia(taum: FullTaumaturgia): boolean {
    const livelloSuccessivo = Number(taum.taumaturgia.livello) + 1;
    if (livelloSuccessivo > 5) {
      return false;
    }
    if (taum.taumaturgia.principale == 2) {
      const primaria = this.taumaturgie.find(t => t.taumaturgia.principale == 1);
      return !primaria || livelloSuccessivo < primaria.taumaturgia.livello ||
        (livelloSuccessivo == primaria.taumaturgia.livello && primaria.taumaturgia.livello == 5);
    }
    if (taum.taumaturgia.principale == 3) {
      const secondaria = this.taumaturgie.find(t => t.taumaturgia.principale == 2);
      return !secondaria || livelloSuccessivo < secondaria.taumaturgia.livello ||
        (livelloSuccessivo == secondaria.taumaturgia.livello && secondaria.taumaturgia.livello == 5);
    }
    return true;
  }

  aumentavia(idtaum: number) {
    console.log("aumentavia", idtaum);
    const taum = this.taumaturgie.find(t => t.taumaturgia.idtaum === idtaum);
    if (taum && this.puoAumentareVia(taum)) {
      this.schedaservice.changenecrotaum_master(this.globalstatus.lastpg, idtaum, 1,"T").subscribe(
        () => {
          taum.taumaturgia.livello++;
          if (taum.taumaturgia.principale == 1){
            const tt = this.discipline.find(d => d.disciplina.iddisciplina == 98);
            if (tt) {
              tt.disciplina.livello ++; 
            }
          }
          // console.log("aumentavia", idtaum);
        }
      );
    }
  }

  riducivianecro(idnecro: number) {
    const necro = this.necromanzie.find(n => n.necromanzia.idnecro === idnecro);
    if (necro && necro.necromanzia.livello > 0) {
      this.schedaservice.changenecrotaum_master(this.globalstatus.lastpg, idnecro, -1, "N").subscribe(() => {
        necro.necromanzia.livello--;
        if (necro.necromanzia.principale == 1) {
          const disciplina = this.discipline.find(d => d.disciplina.iddisciplina == 99);
          if (disciplina) {
            disciplina.disciplina.livello = necro.necromanzia.livello;
          }
          const secondaria = this.necromanzie.find(n => n.necromanzia.principale == 2);
          if (secondaria && secondaria.necromanzia.livello >= necro.necromanzia.livello) {
            secondaria.necromanzia.livello = Number(necro.necromanzia.livello) - 1;
            const terziaria = this.necromanzie.find(n => n.necromanzia.principale == 3);
            if (terziaria && terziaria.necromanzia.livello >= secondaria.necromanzia.livello) {
              terziaria.necromanzia.livello = Number(secondaria.necromanzia.livello) - 1;
            }
          }
        } else if (necro.necromanzia.principale == 2) {
          const terziaria = this.necromanzie.find(n => n.necromanzia.principale == 3);
          if (terziaria && terziaria.necromanzia.livello >= necro.necromanzia.livello) {
            terziaria.necromanzia.livello = necro.necromanzia.livello - 1;
          }
        }
      });
    }
  }

  puoAumentareViaNecro(necro: FullNecromanzia): boolean {
    const livelloSuccessivo = Number(necro.necromanzia.livello) + 1;
    if (livelloSuccessivo > 5) {
      return false;
    }
    if (necro.necromanzia.principale == 2) {
      const primaria = this.necromanzie.find(n => n.necromanzia.principale == 1);
      return !primaria || livelloSuccessivo < primaria.necromanzia.livello ||
        (livelloSuccessivo == primaria.necromanzia.livello && primaria.necromanzia.livello == 5);
    }
    if (necro.necromanzia.principale == 3) {
      const secondaria = this.necromanzie.find(n => n.necromanzia.principale == 2);
      return !secondaria || livelloSuccessivo < secondaria.necromanzia.livello ||
        (livelloSuccessivo == secondaria.necromanzia.livello && secondaria.necromanzia.livello == 5);
    }
    return true;
  }

  aumentavianecro(idnecro: number) {
    const necro = this.necromanzie.find(n => n.necromanzia.idnecro === idnecro);
    if (necro && this.puoAumentareViaNecro(necro)) {
      this.schedaservice.changenecrotaum_master(this.globalstatus.lastpg, idnecro, 1, "N").subscribe(() => {
        necro.necromanzia.livello++;
        if (necro.necromanzia.principale == 1) {
          const disciplina = this.discipline.find(d => d.disciplina.iddisciplina == 99);
          if (disciplina) {
            disciplina.disciplina.livello++;
          }
        }
      });
    }
  }

}
