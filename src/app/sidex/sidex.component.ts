import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../services/index';

@Component({
  selector: 'app-sidex',
  templateUrl: './sidex.component.html',
  styleUrls: ['./sidex.component.css']
})
export class SidexComponent implements OnInit {

  idutente = 0 ;
  mybadge = '' ;

  constructor(private schedaservice: SchedaService) { }

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.checkpoteri(this.idutente).
    subscribe (
      data => {
        this.mybadge = String(data);
      }
    );
  }

}
