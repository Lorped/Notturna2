import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SidexComponent } from '../sidex/sidex.component';
import { UntypedFormControl } from '@angular/forms';
import { SchedaService, BioData } from '../_services/index';


@Component({
    selector: 'app-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css'],
    imports: [MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, SidexComponent],
})
export class BioComponent implements OnInit {


  bio =  new UntypedFormControl('', [] ) ;
  annotazioni = new UntypedFormControl('', [] ) ;
  // urlDT = new UntypedFormControl('', [] ) ;

  rifugio = new UntypedFormControl('', [] ) ;
  zona = new UntypedFormControl('', [] ) ;

  aggiungiRifugio() {
        this.schedaservice.putrifugio ( this.idutente , this.rifugio.value , this.zona.value, 'U' )
    .subscribe(
      () => {
        this.rifugio!.markAsPristine();
        this.zona!.markAsPristine();
        this.rifugio!.markAsUntouched();
        this.zona!.markAsUntouched();
        this.cdr.markForCheck();
      }
    );
  }

  idutente = 0;

  private schedaservice = inject(SchedaService);
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {

    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getbio<BioData>(this.idutente).subscribe(
      (data: BioData) => {
        this.bio.setValue( data.bio );
        this.annotazioni.setValue( data.note );
        this.rifugio.setValue( data.rifugio );
        this.zona.setValue( data.zona );
        this.cdr.markForCheck();
      }
    );

  }

  aggiornaBio() {

    this.schedaservice.putbio ( this.idutente , this.bio.value , this.annotazioni.value )
    .subscribe(
      () => {
        this.bio!.markAsPristine();
        this.annotazioni!.markAsPristine();
        this.bio!.markAsUntouched();
        this.annotazioni!.markAsUntouched();
        this.cdr.markForCheck();
      }
    );

  }
}
