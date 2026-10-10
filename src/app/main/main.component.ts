import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { SchedaService } from '../_services/index';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    imports: [MatToolbarModule, MatCardModule, MatBadgeModule, RouterLink],
})
export class MainComponent implements OnInit {

  idutente = 0 ;
  mybadge = 0 ;
  mybadge2 = 0 ;

  private schedaservice = inject(SchedaService);
  private cdr = inject(ChangeDetectorRef);



  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.checkpoteri(this.idutente).
    subscribe ( (data) => {
        this.mybadge = Number(data);
        this.cdr.markForCheck();
      }
    );
    this.schedaservice.checkavanzamenti(this.idutente).
    subscribe ( (data) => {
        this.mybadge2 = Number(data);
        this.cdr.markForCheck();
      }
    );

  }

}
