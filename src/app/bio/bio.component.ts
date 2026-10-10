import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SchedaService } from '../_services/index';

interface BioData {
  bio: string;
  note: string;
  notemaster: string;
}

@Component({
    selector: 'app-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css'],
    standalone: false
})
export class BioComponent implements OnInit {


  bio =  new UntypedFormControl('', [] ) ;
  annotazioni = new UntypedFormControl('', [] ) ;
  // urlDT = new UntypedFormControl('', [] ) ;

  idutente = 0;

  private schedaservice = inject(SchedaService);
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {

    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getbio<BioData>(this.idutente).subscribe(
      (data: BioData) => {
        this.bio.setValue( data.bio );
        this.annotazioni.setValue( data.note );
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
