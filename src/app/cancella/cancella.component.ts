import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SidexComponent } from '../sidex/sidex.component';
import { Router } from '@angular/router';
import { SchedaService } from '../_services/index';

@Component({
    selector: 'app-cancella',
    templateUrl: './cancella.component.html',
    styleUrls: ['./cancella.component.css'],
    imports: [MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatCheckboxModule, MatButtonModule, SidexComponent],
})
export class CancellaComponent  {

  private schedaservice = inject(SchedaService);
  private router = inject(Router);

  imfine = false ;



  ok() {
    this.imfine = !this.imfine;
  }

  cancella() {
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.cancellascheda(idutente).subscribe(
      () => {
        sessionStorage.setItem('NotturnaUser1', '0' );
        this.router.navigate(['/gate']);
      }
    );

  }

}
