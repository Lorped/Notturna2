import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SchedaService } from '../_services/index';
import { inject } from '@angular/core';
import { FullDisciplina } from '../global';




@Component({
    selector: 'app-addpoteri',
    templateUrl: './addpoteri.component.html',
    styleUrls: ['./addpoteri.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AddpoteriComponent implements OnInit {

  idutente = 0;
  discipline: FullDisciplina[] = [];
  newpotere: string[] = [] ;

  public schedaservice = inject(SchedaService);



  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getpoteri<FullDisciplina[]>( this.idutente )
    .subscribe (
      (data: FullDisciplina[] ) => {
        this.discipline = data;

        for ( let j = 0 ; j < this.discipline.length ; j++ ){
          this.newpotere[j] = '0' ;
        }

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
            this.newpotere[ix] = '0';
          }
        );
      }
    );
  }
}
