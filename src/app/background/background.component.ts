import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidexComponent } from '../sidex/sidex.component';
import { TimesPipe } from '../times.pipe';
import { SchedaService } from '../_services/index';
import { Background, Contatti, Alleati, Skill, Sentiero } from '../global';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { GetSentiero, GetFama } from '../_services/scheda.service';

@Component({
    selector: 'app-background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.css'],
    imports: [
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule,
        ReactiveFormsModule,
        SidexComponent,
        TimesPipe,
    ],
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
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getfama<GetFama>(this.idutente).subscribe(
      (data: GetFama) => {
        this.fama1 = data.fama1;
        this.fama2 = data.fama2;
        this.fama3 = data.fama3;
        this.cdr.markForCheck();
      }
    );

  



 

    this.schedaservice.getsentiero <GetSentiero>(this.idutente).subscribe(
      (data: GetSentiero) => {
        this.listasentieri = data.sentieri;
        this.fdv = data.fdvmax;
        this.valsentiero = data.valsentiero;
        this.sentieroPG = data.idsentiero;
        this.oldsentieroPG = data.idsentiero;
        this.cdr.markForCheck();
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
