import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SchedaService } from '../_services/index';

@Component({
    selector: 'app-cancella',
    templateUrl: './cancella.component.html',
    styleUrls: ['./cancella.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
