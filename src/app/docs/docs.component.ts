import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { SidexComponent } from '../sidex/sidex.component';
import { SchedaService } from '../_services/index';

interface BGClan {
  linkurl: string;
}

@Component({
    selector: 'app-docs',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.css'],
    imports: [MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatDividerModule, SidexComponent],
})
export class DocsComponent implements OnInit {

  idclan = 0;

  link = '/docs/#';
  linkT = '/docs/#';
  linkN = '/docs/#';
  linkV = '/docs/#';

  disC = false ;

  trem = false;
  giova = false;

  private schedaservice = inject(SchedaService);
  private cdr = inject(ChangeDetectorRef);



  ngOnInit(): void {
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getBGClan<BGClan>(idutente).subscribe(
      (data: BGClan) => {
        this.link = data.linkurl;
        this.cdr.markForCheck();
      }
    );
    this.schedaservice.getclan<number>(idutente).subscribe(
      (data: number) => {
        this.idclan = data;
        this.trem = (this.idclan === 7);
        this.giova = (this.idclan === 11);
        this.cdr.markForCheck();
      }
    );



  }

}
