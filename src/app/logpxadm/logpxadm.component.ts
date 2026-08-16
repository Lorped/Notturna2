import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaService } from '../_services/index';
import { GlobalStatus } from '../global';


export interface LogPx {
  Azione: string;
  px: number;
  data: string;
}

export interface Eventi {
  eventi: string;
  eventodata: string;
}

@Component({
  selector: 'logpxadm',
  templateUrl: './logpxadm.component.html',
  styleUrl: './logpxadm.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class LogpxadmComponent implements OnInit {
  idutente = 0;
  myeventi = 0;
  eventodata = '';
  logpx: Array<LogPx> = [];

  constructor( private schedaservice: SchedaService, private globalstatus: GlobalStatus, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idutente = Number ( this.route.snapshot.paramMap.get('id') );
    this.globalstatus.lastpg = this.idutente;
        this.schedaservice.getlogpx(this.idutente)
    .subscribe(
      (data: any) => {
        this.logpx = data;
      }
    );
    this.schedaservice.geteventi(this.idutente)
    .subscribe(
      (data: any) => {
        this.myeventi = data.eventi;
        this.eventodata = data.eventodata;
        //console.log(this.myeventi);
        //console.log(this.eventodata);
      }
    );
  }

}
