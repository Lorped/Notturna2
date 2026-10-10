import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { SchedaService } from '../_services/index';

@Component({
    selector: 'app-sidex',
    templateUrl: './sidex.component.html',
    styleUrls: ['./sidex.component.css'],
    standalone: false
})
export class SidexComponent implements OnInit {

  idutente = 0 ;
  mybadge = 0 ;
  mybadge2 = 0 ;
  ingate = true ;
  private schedaservice = inject(SchedaService);
  private cdr = inject(ChangeDetectorRef);



  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    if ( sessionStorage.getItem('NotturnaUser1') != '0'  ) {
      this.ingate = false ;
    }

    this.schedaservice.checkpoteri(this.idutente).
    subscribe (
      data => {
        this.mybadge = data;
        this.cdr.markForCheck();
      }
    );
    this.schedaservice.checkavanzamenti(this.idutente).
    subscribe (
      data => {
        this.mybadge2 = data;
        this.cdr.markForCheck();
      }
    );
  }

}
