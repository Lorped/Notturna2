import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { SchedaService } from '../_services/index';
import { Background, Contatti, Alleati, Skill, Sentiero } from '../global';
import { UntypedFormControl, Validators } from '@angular/forms';
import { GetSentiero } from '../_services/scheda.service';

@Component({
    selector: 'app-background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BackgroundComponent implements OnInit {

  idutente = 0 ;

  fama1 = 0 ;
  fama2 = 0 ;
  fama3 = 0 ;


  listabg: Background[] = [];
  listaContatti: Contatti[] = [];
  sommacontatti = 0;

  listaAlleati: Alleati[] = [];
  sommaalleati = 0;
  maxalleati = 0;

  myContatto = new UntypedFormControl ( '', [
    Validators.required,
    Validators.pattern(/.*[^ ].*/),
  ]);

  idstatus_old = 0 ;
  status_old = '';
  fdv_old = 0 ;    // aumenterà conme fdvbase
  bloodp_old = 0 ; // aumenterà come addbp
  sete_old = 0 ;
  attivazione_old = 0 ;
  addbp_old = 0 ;
  fdvbase_old = 0 ;
  bgbase_old = 0 ;

  conoscenze_old = 0 ;


  idstatus_new = 0 ;
  status_new = '';
  attivazione_new = 0 ;
  sete_new = 0 ;
  addbp_new = 0 ;
  fdvbase_new = 0 ;
  bgbase_new = 0 ;

  bloodp_new = 0 ; // calcolato in funzione dei limiti generazionali
  fdv_new = 0 ;    // calcolato in funzione dei limiti

  conoscenze_new = 0 ;

  bloodpmax = 0 ;
  generazione = 0 ;

  matriceNumSkill: number[][] = [
    [ 20, 20, 17, 15, 13, 10, 5 ],
    [ 33, 30, 27, 25, 20, 15, 10 ],
    [ 35, 35, 33, 30, 25, 20, 15 ],
    [ 45, 45, 43, 40, 35, 30, 20 ],
    [ 55, 55, 53, 50, 45, 40, 30 ],
    [ 95, 95, 93, 90, 80, 70, 50 ]
  ];

  listaskill: Skill[] = [];
  listanew: Skill[] = [];

  listasentieri: Sentiero[] = [];
  sentieroPG = 0;
  oldsentieroPG = 0;
  valsentiero = 0 ;
  fdv = 0;

  puntidisponibili = 0;

  private schedaservice = inject(SchedaService);

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getfama(this.idutente).subscribe();

  



 

    this.schedaservice.getsentiero <GetSentiero>(this.idutente).subscribe(
      (data: GetSentiero) => {
        this.listasentieri = data.sentieri;
        this.fdv = data.fdvmax;
        this.valsentiero = data.valsentiero;
        this.sentieroPG = data.idsentiero;
        this.oldsentieroPG = data.idsentiero;
      }
    );



  }

  addfama(ix: number) {
    switch (ix) {
      case 1:
        this.fama1++;
        break;
      case 2:
        this.fama2++;
        break;
      case 3:
        this.fama3++;
        break;
    }

    this.schedaservice.putfama ( this.idutente, this.fama1, this.fama2, this.fama3, 'U')
    .subscribe();
  }
  minfama(ix: number) {
    switch (ix) {
      case 1:
        this.fama1--;
        break;
      case 2:
        this.fama2--;
        break;
      case 3:
        this.fama3--;
        break;
    }

    this.schedaservice.putfama ( this.idutente, this.fama1, this.fama2, this.fama3 , 'U')
    .subscribe();
  }




/*

  cambiastatus() {
    this.schedaservice.cambiastatus(this.idutente, this.listanew).subscribe(
      () => {
        //done
      }
    );
  }

*/


  minsentiero(){
    this.valsentiero--;
    this.schedaservice.putfdvsentiero(this.idutente, -1, this.valsentiero , 'U').subscribe(
      () => {
        /* do stuff */
      }
    );
  }
  addsentiero(){
    this.valsentiero++;
    this.schedaservice.putfdvsentiero(this.idutente, -1, this.valsentiero , 'U').subscribe(
      () => {
        /* do stuff */
      }
    );
  }
  changesentiero(){
    this.oldsentieroPG = this.sentieroPG;
    this.schedaservice.newsentiero(this.idutente, this.sentieroPG , 'U').subscribe(
      () => {
        /* do stuff */
      }
    );
  }

 


 

}
