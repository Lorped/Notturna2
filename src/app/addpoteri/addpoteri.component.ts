import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../services/index';
import { FullDisciplina } from '../global';



@Component({
  selector: 'app-addpoteri',
  templateUrl: './addpoteri.component.html',
  styleUrls: ['./addpoteri.component.css']
})
export class AddpoteriComponent implements OnInit {

  idutente = 0;
  discipline: Array <FullDisciplina> = [];
  newpotere: Array<string> = [] ;

  constructor( public schedaservice: SchedaService) { }

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getpoteri( this.idutente )
    .subscribe (
      (data: any ) => {
        console.log(data);
        this.discipline = data;

        for ( let j = 0 ; j < this.discipline.length ; j++ ){
          this.newpotere[j] = "0" ;
        }

      }
    );
  }

  addpotere (ix: number) {
    console.log(ix);
    console.log (this.discipline[ix].disciplina.nomedisc );
    console.log (this.newpotere[ix] );

    this.schedaservice.addpotere( this.idutente, this.newpotere[ix])
    .subscribe(
      data => {
        this.schedaservice.getpoteri( this.idutente )
        .subscribe (
          (data: any ) => {
            console.log(data);
            this.discipline = data;
            this.newpotere[ix] = "0";
          }
        );
      }
    );
  }
}
