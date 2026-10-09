import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { SchedaService } from '../_services/index';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MainComponent implements OnInit {

  idutente = 0 ;
  mybadge = 0 ;
  mybadge2 = 0 ;

  private schedaservice = inject(SchedaService);



  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.checkpoteri(this.idutente).
    subscribe ( (data) => {
        this.mybadge = Number(data);
      }
    );
    this.schedaservice.checkavanzamenti(this.idutente).
    subscribe ( (data) => {
        this.mybadge2 = Number(data);
      }
    );

  }

}
