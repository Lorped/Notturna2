import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../_services/index';


export interface LogPx {
  Azione: string;
  px: number;
  data: string;
}

@Component({
  selector: 'app-logpx',
  templateUrl: './logpx.component.html',
  styleUrls: ['./logpx.component.css']
})
export class LogpxComponent implements OnInit {

  logpx: Array<LogPx> = [];
  idutente = 0;

  constructor( private schedaservice: SchedaService) { }

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getlogpx(this.idutente)
    .subscribe(
      (data: any) => {
        this.logpx = data;
      }
    );

  }

}
