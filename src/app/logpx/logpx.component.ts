import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { SchedaService } from '../_services/index';


export interface LogPx {
  Azione: string;
  px: number;
  data: string;
}

export interface Eventi {
  eventi: number;
  eventodata: string;
}

@Component({
    selector: 'app-logpx',
    templateUrl: './logpx.component.html',
    styleUrls: ['./logpx.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LogpxComponent implements OnInit {

  logpx: LogPx[] = [];
  idutente = 0;
  myeventi = 0;
  eventodata = '';

  private schedaservice = inject(SchedaService);

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getlogpx<LogPx[]>(this.idutente)
    .subscribe(
      (data: LogPx[]) => {
        this.logpx = data;
      }
    );
    this.schedaservice.geteventi<Eventi>(this.idutente)
    .subscribe(
      (data: Eventi) => {
        this.myeventi = data.eventi;
        this.eventodata = data.eventodata;
        //console.log(this.myeventi);
        //console.log(this.eventodata);
      }
    );

  }

}
