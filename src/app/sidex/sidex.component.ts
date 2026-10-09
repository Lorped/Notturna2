import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { SchedaService } from '../_services/index';

@Component({
    selector: 'app-sidex',
    templateUrl: './sidex.component.html',
    styleUrls: ['./sidex.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SidexComponent implements OnInit {

  idutente = 0 ;
  mybadge = 0 ;
  mybadge2 = 0 ;
  ingate = true ;
  private schedaservice = inject(SchedaService);



  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    if ( sessionStorage.getItem('NotturnaUser1') != '0'  ) {
      this.ingate = false ;
    }

    this.schedaservice.checkpoteri(this.idutente).
    subscribe (
      data => {
        this.mybadge = data;
      }
    );
    this.schedaservice.checkavanzamenti(this.idutente).
    subscribe (
      data => {
        this.mybadge2 = data;
      }
    );
  }

}
