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

  constructor( public schedaservice: SchedaService) { }

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getpoteri( this.idutente )
    .subscribe (
      (data: any ) => {
          console.log(data);
          this.discipline = data;
      }
    );
  }

}
