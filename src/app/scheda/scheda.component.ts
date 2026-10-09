import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { SchedaService } from '../_services/index';
import { Basicpg, FullDisciplina, FullTaumaturgia, FullNecromanzia, Skill, Background, Contatti, Pregio, Rituale,    Alleati} from '../global';
import { GetScheda, GetRisorse } from '../_services/scheda.service';

export class listaspese {
  public data = '' ;
  public spesa = 0 ;
  public cadenza = 30 ;
  public recuperati = 0 ;
};

@Component({
    selector: 'app-scheda',
    templateUrl: './scheda.component.html',
    styleUrls: ['./scheda.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SchedaComponent implements OnInit {

  idutente = 0 ;
  scheda: Basicpg = new Basicpg();
  pf = 0 ;
  rp = 0 ;
  rd = 0 ;
  psvuoti = 0 ;

  discipline: FullDisciplina[] = [] ;
  necromanzie: FullNecromanzia[] = [] ;
  taumaturgie: FullTaumaturgia[] = [] ;

  background: Background[] = [] ;
  contatti: Contatti[] = [];
  alleati: Alleati[] = [];
  maxcontatti = 0;
  maxalleati = 0;

  skills: Skill[] = [];
  otherskill: Skill[] = [];
  attitudini: Skill[] = [];

  pregi: Pregio[] = [];
  rituali: Rituale[] = [];



  listaarray: listaspese[] = [];

  risorse_base=0;
  saldo = 0 ;

  private schedaservice = inject(SchedaService);


  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getscheda<GetScheda>(this.idutente).
    subscribe (
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
        //this.scheda['PScorrenti'] = Number(this.scheda['PScorrenti']);


        /*
        this.scheda['fama1'] = Number(this.scheda['fama1']);
        this.scheda['fama2'] = Number(this.scheda['fama2']);
        this.scheda['fama3'] = Number(this.scheda['fama3']);

        this.scheda['bane'] = Number(this.scheda['bane']);
        */
        this.psvuoti = this.scheda['maxps']  - this.scheda['PScorrenti'];

        this.discipline = data.discipline ;
        this.taumaturgie = data.taumaturgie ;
        this.necromanzie = data.necromanzie ;

        this.skills = data.skill ;
        this.otherskill = data.otherskill ;
        this.attitudini = data.attitudini ;
        this.background = data.background ;
        this.contatti = data.contatti;
        this.alleati = data.alleati;

        this.maxcontatti = 0;
        for ( const item of this.contatti) {
          this.maxcontatti += item.livello;
        }
        this.maxalleati = 0;
        for ( const item of this.alleati) {
          this.maxalleati += item.livello;
        }

        this.pregi = data.pregidifetti;
        this.rituali = data.rituali;

        for ( const item of this.background) {
          if (item.idback == 2) {
            this.risorse_base = item.livello;
          }
        }


        this.schedaservice.getrisorse<GetRisorse>(this.idutente).subscribe(
          (data: GetRisorse) => {
            this.saldo = Number(data.saldo);
    
            this.listaarray = data.lista;
    
            //console.log(this.listaarray);
          }
        );

      }
    );
  }

  
  //stampascheda(){
  //    window.open( 'https://www.roma-by-night.it/notturna/scheda3.php?idutente='+this.idutente, '_blank');
  //}

}
