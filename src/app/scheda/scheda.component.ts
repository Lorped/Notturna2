import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../services/index';
import { Basicpg } from '../global';

@Component({
  selector: 'app-scheda',
  templateUrl: './scheda.component.html',
  styleUrls: ['./scheda.component.css']
})
export class SchedaComponent implements OnInit {

  idutente: number = 0 ;
  scheda: Basicpg = new Basicpg();

  constructor(private schedaservice: SchedaService) { }

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );
    console.log(this.idutente);
    this.schedaservice.getscheda(this.idutente).
    subscribe (
      (data: any) => {
        console.log(data);
        this.scheda = data.user ;
        console.log(this.scheda);
      }
    );
  }

}
