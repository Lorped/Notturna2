import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaService } from '../_services/index';
import { GlobalStatus } from '../global';


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
  selector: 'app-logpxadm',
  templateUrl: './logpxadm.component.html',
  styleUrl: './logpxadm.component.css',
  standalone: false
})
export class LogpxadmComponent implements OnInit {
  idutente = 0;
  myeventi = 0;
  eventodata = '';
  logpx: LogPx[] = [];

  private schedaservice = inject(SchedaService);
  private cdr = inject(ChangeDetectorRef);
  private globalstatus = inject(GlobalStatus);
  private route = inject(ActivatedRoute);



  ngOnInit(): void {
    this.idutente = Number ( this.route.snapshot.paramMap.get('id') );
    this.globalstatus.lastpg = this.idutente;
        this.schedaservice.getlogpx<LogPx[]>(this.idutente)
    .subscribe(
      (data: LogPx[]) => {
        this.logpx = data;
        this.cdr.markForCheck();
      }
    );
    this.schedaservice.geteventi<Eventi>(this.idutente)
    .subscribe(
      (data: Eventi) => {
        this.myeventi = data.eventi;
        this.eventodata = data.eventodata;
        this.cdr.markForCheck();
        //console.log(this.myeventi);
        //console.log(this.eventodata);
      }
    );
  }

}
