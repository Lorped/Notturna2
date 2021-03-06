import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../_services/index';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
