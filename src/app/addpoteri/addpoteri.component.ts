import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SidexComponent } from '../sidex/sidex.component';
import { SchedaService } from '../_services/index';
import { inject } from '@angular/core';
import { FullDisciplina } from '../global';




@Component({
    selector: 'app-addpoteri',
    templateUrl: './addpoteri.component.html',
    styleUrls: ['./addpoteri.component.css'],
    imports: [MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule, SidexComponent],
})
export class AddpoteriComponent implements OnInit {

  idutente = 0;
  discipline: FullDisciplina[] = [];
  newpotere: number[] = [] ;

  public schedaservice = inject(SchedaService);
  private cdr = inject(ChangeDetectorRef);



  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getpoteri<FullDisciplina[]>( this.idutente )
    .subscribe (
      (data: FullDisciplina[] ) => {
        this.discipline = data;

        for ( let j = 0 ; j < this.discipline.length ; j++ ){
          this.newpotere[j] = 0 ;
        }
        this.cdr.markForCheck();

      }
    );
  }

  addpotere(ix: number) {
    this.schedaservice.addpotere( this.idutente, this.newpotere[ix])
    .subscribe( () => {
        this.schedaservice.getpoteri<FullDisciplina[]>( this.idutente )
        .subscribe (
          (data2: FullDisciplina[] ) => {
            this.discipline = data2;
            this.newpotere[ix] = 0;
            this.cdr.markForCheck();
          }
        );
      }
    );
  }
}
